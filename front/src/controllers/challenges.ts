import { useContext, useEffect } from "react";
import UserContext from "../usercontext.tsx";
import { User } from "./user.tsx";

import { collection, getDocs, getFirestore, query, where } from "@firebase/firestore";

import { firebaseApp } from "../main";

const fetchChallenges = async (user: User | null) => {
    const db = getFirestore(firebaseApp);
    const _public = getDocs(collection(db, "challenges"));

    // const sharedToUserId = getDocs(where(collection(db, "challenges")));
    // const sharedToUserId = await getDocs(query(collection(db, "challenges"), where("sharedToUserIds", "array-contains", user)));

    // console.log(sharedToUserId.docs.map(doc => doc.data()));

    // public = db.collection(u'challenges').where(u'visibility', u'==', u'public').get()
    //
    //     sharedToUserId = db.collection(u'challenges').where(u'sharedToUserIds', u'array_contains', user).get()
    //
    //     if "groups" in data:
    //     for group in data["groups"]:
    //     sharedToGroupId = db.collection(u'challenges').where(u'sharedToGroupIds', u'array_contains', group).get()
};

const useChallenges = () => {
    const user = useContext(UserContext);

    useEffect(() => {
        fetchChallenges(user);
    }, [user]);
};

export default useChallenges;
