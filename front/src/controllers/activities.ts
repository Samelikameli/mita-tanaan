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

const mockVotes = [
    { emoji: "🔥", count: 12 },
    { emoji: "👍", count: 5 },
];

const mockActivities: Activity[] = [
    {
        id: "0",
        emoji: "⚽",
        name: "Football after school?",
        owner: "Artur Skwarek",
        place: "Koulun piha",
        time: "after-school",
        customTime: null,
        votes: mockVotes,
    },
    {
        id: "1",
        emoji: "",
        name: "Ice hockey practice together",
        owner: "Artur Skwarek",
        place: "Rink at school",
        time: "after-school",
        customTime: null,
        votes: mockVotes,
    },
    {
        id: "2",
        emoji: "🛹",
        name: "Skateboarding at the mall",
        owner: "Veeti Roponen",
        place: "Shop Shop Mall",
        time: "custom",
        customTime: "16:00",
        votes: mockVotes,
    },
    { id: "3", emoji: "", name: "Hengailu", owner: "Artur Skwarek", place: "", time: "after-school", customTime: null, votes: mockVotes },
    { id: "4", emoji: "", name: "Hengailu", owner: "Artur Skwarek", place: "", time: "after-school", customTime: null, votes: mockVotes },
];

type fetchActivitiesQueryKey = ["activities", string | undefined];

const fetchActivities = async ({ queryKey }: { queryKey: fetchActivitiesQueryKey }): Promise<Activity[]> => {
    console.log(queryKey);
    const db = getFirestore(firebaseApp);
    const q = query(collection(db, "activities"));
    const activities: Activity[] = [];
    const snapshot = await getDocs(q);
    snapshot.forEach(x => {
        const paska = {
            id: x.id,
            ...x.data(),
        } as Activity;
        console.log(paska);
        activities.push(paska);
    });
    console.log(activities);
    //return activities;
    return mockActivities;
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
