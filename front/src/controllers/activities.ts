import { collection, getFirestore, query } from "@firebase/firestore";
import { useContext } from "react";
import { useQuery } from "react-query";
import AppContext from "../appcontext";
import { firebaseApp } from "../main";
import UserContext from "../usercontext";

export type VoteCount = {
    emoji: string;
    count: number;
};

export type Activity = {
    id: string;
    name: string;
    owner: string;
    votes: Array<VoteCount>;
};

const mockVotes = [
    { emoji: "🔥", count: 12 },
    { emoji: "👍", count: 5 },
];

const mockActivities: Activity[] = [
    { id: "0", name: "Futis", owner: "Artur Skwarek", votes: mockVotes },
    { id: "1", name: "Hengailu", owner: "Artur Skwarek", votes: mockVotes },
    { id: "2", name: "Hengailu", owner: "Artur Skwarek", votes: mockVotes },
    { id: "3", name: "Hengailu", owner: "Artur Skwarek", votes: mockVotes },
    { id: "4", name: "Hengailu", owner: "Artur Skwarek", votes: mockVotes },
    { id: "5", name: "Hengailu", owner: "Artur Skwarek", votes: mockVotes },
    { id: "6", name: "Hengailu", owner: "Artur Skwarek", votes: mockVotes },
];

type fetchActivitiesQueryKey = ["activities", string | undefined];

const fetchActivities = async ({ queryKey }: { queryKey: fetchActivitiesQueryKey }): Promise<Activity[]> => {
    console.log(queryKey);
    const db = getFirestore(firebaseApp);
    const q = query(collection(db, "activities"));

    console.log(q);

    await sleep(200);
    return mockActivities;
};

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const useActivities = () => {
    const user = useContext(UserContext);
    const queryKey: fetchActivitiesQueryKey = ["activities", user?.id];
    return useQuery(queryKey, fetchActivities);
};

const createActivity = (activity: { name: string; emoji: string; place: string; time: string | undefined }) => {
    console.log(activity);
};

export { useActivities, createActivity };
