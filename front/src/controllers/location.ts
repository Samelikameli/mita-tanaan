import { useEffect, useState } from "react";

import { query, collection, getFirestore, onSnapshot, QuerySnapshot, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

import { User } from "./user.tsx";
import { firebaseApp } from "../main.tsx";

const useAllUsersLocation = () => {
    const db = getFirestore(firebaseApp);

    const [allLocations, setAllLocations] = useState<User[]>([]);

    useEffect(() => {
        const q = query(collection(db, "users"));

        const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
            const updatedUsers: User[] = [];
            snapshot.forEach((doc: QueryDocumentSnapshot<unknown>) => updatedUsers.push(doc.data() as User));

            setAllLocations(updatedUsers);
            console.log("Updated users!");
        });
        return unsubscribe;
    }, [db]);

    return allLocations;
};

export default useAllUsersLocation;
