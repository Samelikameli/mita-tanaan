import type { FirebaseApp } from "firebase/app";
import type { GeoPoint } from "firebase/firestore";
import { collection, doc, getDoc, setDoc, getFirestore, addDoc } from "firebase/firestore";
import { useContext, useEffect, useMemo, useState } from "react";
import AppContext from "../appcontext.tsx";

export type User = {
    name: string;
    avatar: string;
    location: GeoPoint;
};

const useUser = (): {
    user: User | null;
    loading: boolean;
    userExists: boolean;
} => {
    const app = useContext(AppContext);

    const userid = localStorage.getItem("userid");
    const db = useMemo(() => getFirestore(app), [app]);

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            const usersRef = collection(db, "users");
            if (userid != null) {
                const snapshot = await getDoc(doc(usersRef, userid ?? ""));

                if (snapshot.exists()) {
                    setUser(snapshot.data() as User);
                    //     console.log(snapshot.data());
                }
                setLoading(false);
            } else {
                setLoading(false);
            }
        })().catch(console.error);
    }, [db, userid]);

    return {
        user,
        loading,
        userExists: !loading && user != null,
    };
};

const useUserRegistration = (): { register: (user: User) => Promise<void> } => {
    const app = useContext(AppContext);

    const db = useMemo(() => getFirestore(app), [app]);

    const register = async (user: User) => {
        const usersRef = collection(db, "users");
        const newUser = await addDoc(usersRef, user);
        const newUserId = newUser.id;
        console.log("created user with id", newUserId);
        localStorage.setItem("userid", newUserId);
    };

    return { register };
};

export { useUser, useUserRegistration };
