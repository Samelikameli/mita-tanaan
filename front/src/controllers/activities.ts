import { collection, doc, getFirestore, query, setDoc } from "@firebase/firestore";
import { useContext } from "react";
import { useQuery } from "react-query";
import { firebaseApp } from "../main";
import UserContext from "../usercontext";
import { getDocs } from "firebase/firestore";

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
};

type fetchActivitiesQueryKey = ["activities", string | undefined];

const fetchActivities = async ({ queryKey }: { queryKey: fetchActivitiesQueryKey }): Promise<Activity[]> => {
    console.log(queryKey);
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
    const queryKey: fetchActivitiesQueryKey = ["activities", user?.id];
    return useQuery(queryKey, fetchActivities);
};

const writeActivity = async (activity: Omit<Activity, "id">): Promise<string> => {
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
            votes: [],
            owner: user?.name,
        });
        return id;
    };
};

export { useActivities, useCreateActivity };
