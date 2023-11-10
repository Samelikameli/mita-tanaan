import type { GeoPoint } from "firebase/firestore";
import { addDoc, collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import AppContext from "../appcontext.tsx";

export type User = {
    name: string;
    avatar: string;
    location: GeoPoint;
};

const useUserFetching = (): {
    userExists: boolean;
    loading: boolean;
    user: User | null;
    register: (user: User) => Promise<void>;
} => {
    const app = useContext(AppContext);
    const db = getFirestore(app);

    const [userid, setUserid] = useState<string | null>(localStorage.getItem("userid"));
    useEffect(() => {
        if (userid != null) {
            localStorage.setItem("userid", userid);
        }
    }, [userid]);

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const usersRef = collection(db, "users");
        if (userid != null) {
            getDoc(doc(usersRef, userid ?? "")).then(snapshot => {
                if (snapshot.exists()) {
                    console.log("exists");
                    const data = snapshot.data();
                    console.log(data);
                    setUser(data as User);
                }
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [db, userid, setUser]);

    const register = async (user: User) => {
        const usersRef = collection(db, "users");
        const newUser = await addDoc(usersRef, user);
        const newUserId = newUser.id;
        console.log("created user with id", newUserId);
        setUserid(newUserId);
    };

    console.log("in user hook", user, loading);

    return {
        user,
        loading,
        userExists: !loading && user != null,
        register,
    };
};

export { useUserFetching };
