import { collection, getFirestore, query } from "@firebase/firestore";
import { useQuery } from "react-query";
import { firebaseApp } from "../main";
import { getDocs } from "firebase/firestore";

/**
 * Group that users have formed
 */
export type Group = {
    id: string;
    name: string;
    /**
     * Name of the avatar picture for the group
     */
    avatar: string;
    /**
     * List of user ids that belong to the group
     */
    users: string;
};

const fetchGroups = async (): Promise<Group[]> => {
    const db = getFirestore(firebaseApp);
    const q = query(collection(db, "groups"));
    const groups: Group[] = [];
    const snapshot = await getDocs(q);
    snapshot.forEach(x => {
        const a = {
            ...x.data(),
            id: x.id,
        } as Group;
        groups.push(a);
    });

    return groups;
};

const useGroups = () => {
    return useQuery("groups", fetchGroups);
};

export { useGroups };
