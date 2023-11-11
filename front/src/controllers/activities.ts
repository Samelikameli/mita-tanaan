import { useQuery } from "react-query";

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

const fetchActivities = async (): Promise<Activity[]> => {
    await sleep(200);
    return mockActivities;
};

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const useActivities = () => useQuery("activities", fetchActivities);

export { useActivities };
