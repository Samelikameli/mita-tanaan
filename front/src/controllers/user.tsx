import type { FirebaseApp } from "firebase/app";
import type { GeoPoint } from "firebase/firestore";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";

export type User = {
    name: string;
    avatar: string;
    location: GeoPoint;
};

const useUser = (
    app: FirebaseApp,
): {
    user: User | null;
    loading: boolean;
    userExists: boolean;
} => {
    const userid = useMemo(() => localStorage.getItem("userid") ?? "", [localStorage]);
    const db = useMemo(() => getFirestore(app), [app]);

    const [user, setUser] = useState<User | null>(null);
    const [userExists, setUserExists] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            const usersRef = collection(db, "users");
            const snapshot = await getDoc(doc(usersRef, userid));

            if (snapshot.exists()) {
                setUser(snapshot.data() as User);
                //     console.log(snapshot.data());
            } else {
                setUserExists(false);
            }
            //     console.log("ei");
            // }
        })().catch(console.error);
    }, [db, userid]);

    return {
        user,
        loading: user == null,
        userExists,
    };
};

export default useUser;
