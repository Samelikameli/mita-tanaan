import UserContext from "../usercontext.tsx";
import { useContext, useEffect, useState } from "react";

import { query, collection, getFirestore, onSnapshot, QuerySnapshot, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import AppContext from "../appcontext.tsx";

import { User } from "./user.tsx";

const useAllUsersLocation = () => {
    const user = useContext(UserContext);

    const app = useContext(AppContext);
    const db = getFirestore(app);

    const [allLocations, setAllLocations] = useState<User[]>([]);

    useEffect(() => {
        const q = query(collection(db, "users"));

        const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
            const updatedUsers: User[] = [];
            snapshot.forEach((doc: QueryDocumentSnapshot<T>) => updatedUsers.push(doc.data() as User));

            console.log(updatedUsers);
            setAllLocations(updatedUsers);
            console.log(updatedUsers);
        });
        return unsubscribe;
    }, [db]);

    return allLocations;
};

export default useAllUsersLocation;
