import { collection, doc, getFirestore, query, setDoc } from "@firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { firebaseApp } from "../main";
import UserContext from "../usercontext";
import { DocumentData, getDocs, onSnapshot, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import { User } from "./user.tsx";

export type VoteCount = {
    emoji: string;
    count: number;
};

export type Activity = {
    id: string;
    name: string;
    emoji: string;
    place: string;
    time: string;
    customTime: string | null;
    owner: string;
    votes: Array<VoteCount>;
    group: Array<string>;
    ongoing?: boolean;
};

/**
 * Fetch all activities currently in Firestore
 */
const fetchActivities = async (): Promise<Activity[]> => {
    const db = getFirestore(firebaseApp);
    const q = query(collection(db, "activities"));
    const activities: Activity[] = [];
    const snapshot = await getDocs(q);
    snapshot.forEach(x => {
        const a = {
            ...x.data(),
            id: x.id,
            votes: JSON.parse(x.data().votes),
        } as Activity;
        activities.push(a);
    });
    console.log(activities);
    return activities;
};

const useActivities = () => {
    const user = useContext(UserContext);

    const db = getFirestore(firebaseApp);

    const [allActivities, setAllActivities] = useState<User[]>([]);

    useEffect(() => {
        const q = query(collection(db, "activities"));

        const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
            const updatedActivities: Activity[] = [];
            snapshot.forEach((doc: QueryDocumentSnapshot<unknown>) => updatedActivities.push(doc.data() as Activity));

            setAllActivities(updatedActivities);
            console.log("Updated activities!");
        });
        return unsubscribe;
    }, [db]);

    return { data: allActivities, isLoading: false };

    // const queryKey: fetchActivitiesQueryKey = ["activities", user?.id];
    // return useQuery(queryKey, fetchActivities, { refetchInterval: 1000 });
};

/**
 * Write a new activity to Firestore
 * @returns The ID of the new activity
 */
const writeActivity = async (activity: Omit<Activity, "id" | "votes"> & { votes: string }): Promise<string> => {
    const db = getFirestore(firebaseApp);
    // Add a new document in collection "cities"
    const ref = doc(collection(db, "activities"));
    await setDoc(ref, activity);
    return ref.id;
};

const useCreateActivity = () => {
    const user = useContext(UserContext);
    if (!user) throw Error("User not defined in useCreateActivity");

    return async (activity: { name: string; emoji: string; place: string; time: string; customTime: string | undefined }): Promise<string> => {
        const id = await writeActivity({
            name: activity.name,
            emoji: activity.emoji,
            place: activity.place,
            time: activity.time,
            customTime: activity.customTime || null,
            votes: JSON.stringify([]),
            group: [],
            owner: user?.name,
        });
        return id;
    };
};

export { useActivities, useCreateActivity };
