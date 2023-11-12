// @ts-nocheck
import { VStack, Card, Box, HStack, Button, Heading, Text, SlideFade, Modal } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import EmojiIcon from "../EmojiIcon";
import { Activity, VoteCount, useActivities } from "../../controllers/activities";
import { AnimatePresence, motion } from "framer-motion";
import ViewFadeWrapper, { PAGE_CHANGE_ANIM } from "../ViewFadeWrapper";
import { timeModeToEmoji } from "../utils";
import { useGroups } from "../../controllers/groups";
import React, { useContext, useState } from "react";

import Avatar from "../account/Avatar.tsx";
import ModalEmojiPicker from "../ModalEmojiPicker.tsx";
import UserContext from "../../usercontext.tsx";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        delay: PAGE_CHANGE_ANIM + 0.5,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const listItem = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
};

const ActivitiesView = () => {
    const user = useContext(UserContext);
    const { data: activities, vote } = useActivities();
    const { data: groups } = useGroups();

    return (
        <ViewFadeWrapper styleAbsolutely={true}>
            <SlideFade in={true} offsetX={100} offsetY={0} delay={PAGE_CHANGE_ANIM}>
                <Box px={4} pb={4} background={"white"} filter={"drop-shadow(10px, 10px, 2px, black);"}>
                    {/*<Avatar small={true} animal={user.avatar} />*/}
                    <Heading fontSize="xl" paddingTop="5" align={"center"} style={{ fontWeight: "bold" }}>
                        What to do today?
                    </Heading>

                    {/*<Text fontSize="m" paddingBottom="4">*/}
                    {/*    Here are your friends' suggestions*/}
                    {/*</Text>*/}
                </Box>
            </SlideFade>
            <VStack height="100%" alignItems="stretch" spacing="0">
                <Box padding="4" flex="1" overflowY="auto" paddingBottom="10rem">
                    {/*isLoading && <Text>Loading...</Text>*/}
                    {activities && activities.length > 0 && groups && (
                        <motion.div variants={container} initial="hidden" animate="show">
                            <VStack spacing={4} align="stretch">
                                <AnimatePresence>
                                    {groups
                                        .filter(g => g.name.toLowerCase().includes("care") || g.name.toLowerCase().includes("besti"))
                                        .map(g => {
                                            const activitiesInGroup = activities.filter(a => a.group.includes(g.id));
                                            return (
                                                <React.Fragment key={g.id}>
                                                    <Heading
                                                        fontSize="sm"
                                                        borderBottom="1px solid #D3D3D3"
                                                        color="#727272"
                                                        // paddingBottom="2"
                                                        // paddingTop="2"
                                                    >
                                                        {g.name}
                                                    </Heading>
                                                    {activitiesInGroup.map(a => (
                                                        <motion.div key={a.id} variants={listItem}>
                                                            <Suggestion activity={a} vote={vote} />
                                                        </motion.div>
                                                    ))}
                                                    {activitiesInGroup.length === 0 && (
                                                        <Text fontSize="sm" textAlign="center" fontWeight="bold" color="#888888">
                                                            No suggestions yet.
                                                            <br />
                                                            What would you like to do?
                                                        </Text>
                                                    )}
                                                </React.Fragment>
                                            );
                                        })}
                                </AnimatePresence>
                            </VStack>
                        </motion.div>
                    )}
                </Box>
                <Box padding="3" textAlign="center" z-index="100" position="absolute" bottom="0" width="100%">
                    <Link to="/activities/create">
                        <Button
                            style={{ fontWeight: "bolder" }}
                            isRound={true}
                            borderRadius={1000}
                            colorScheme="dark"
                            background={"linear-gradient(265deg, #E000F3 0.99%, #6B00F3 108.43%);"}
                            p={25}
                            boxShadow="0px 4px 3px 0px rgba(0, 0, 0, 0.15);">
                            <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_131_5448)">
                                    <path
                                        d="M5.3775 14.2833L4.35152 13.1367C4.06929 12.8212 3.96969 12.3648 4.09586 11.9417C4.19547 11.6115 4.32828 11.181 4.48765 10.6874H0.974764C0.689217 10.6874 0.423592 10.5167 0.280818 10.2384C0.138045 9.9601 0.141365 9.6187 0.287459 9.34409L2.03062 6.05991C2.46226 5.24721 3.24254 4.74995 4.0859 4.74995H6.81851C6.8982 4.60151 6.97789 4.46421 7.05758 4.33061C9.77691 -0.152201 13.8277 -0.300638 16.2449 0.196628C16.63 0.274557 16.9289 0.612253 17.0019 1.04272C17.4468 3.748 17.3107 8.27163 13.3031 11.3109C13.1869 11.3999 13.0607 11.489 12.9279 11.5781V14.6322C12.9279 15.5748 12.483 16.4505 11.7558 16.9292L8.81734 18.8775C8.57164 19.0408 8.26617 19.0445 8.01715 18.8849C7.76812 18.7253 7.61539 18.4322 7.61539 18.1093V14.1312C7.14722 14.313 6.73883 14.4615 6.43004 14.5728C6.05816 14.7064 5.65308 14.5914 5.37418 14.2833H5.3775ZM12.9279 6.23432C13.2801 6.23432 13.6179 6.07793 13.867 5.79956C14.1161 5.52119 14.256 5.14363 14.256 4.74995C14.256 4.35627 14.1161 3.97871 13.867 3.70034C13.6179 3.42196 13.2801 3.26557 12.9279 3.26557C12.5756 3.26557 12.2378 3.42196 11.9888 3.70034C11.7397 3.97871 11.5998 4.35627 11.5998 4.74995C11.5998 5.14363 11.7397 5.52119 11.9888 5.79956C12.2378 6.07793 12.5756 6.23432 12.9279 6.23432Z"
                                        fill="white"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_131_5448">
                                        <rect width="17" height="19" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            &nbsp; Create activity
                        </Button>
                    </Link>
                </Box>
            </VStack>
        </ViewFadeWrapper>
    );
};

const Suggestion = (props: { activity: Activity; vote: (activityId: string, emoji: string, vote?: boolean) => Promise<void> }) => {
    const { id, name, owner, votes, time } = props.activity;
    const { emoji: timeEmoji } = timeModeToEmoji(time);
    return (
        <Card padding={2} borderRadius={20} margin={0}>
            <HStack>
                <EmojiIcon>{props.activity.emoji}</EmojiIcon>
                <VStack alignItems={"flex-start"}>
                    <Link to={`/activities/${id}`}>
                        <HStack>
                            <VStack flex="1" alignItems="right" spacing={0}>
                                <Text fontSize="0.9rem" style={{ fontWeight: "bold" }}>
                                    {name}
                                </Text>
                                <Text fontSize="0.7rem" color="#555555">
                                    {owner}
                                </Text>
                            </VStack>
                            <Text fontSize="0.8rem" color="#555555" alignSelf="start" padding={1}>
                                {timeEmoji}
                            </Text>
                        </HStack>
                    </Link>
                    <HStack spacing={1} marginTop="-0.4rem" flexWrap="wrap">
                        {votes.map(v => (
                            <EmojiCount vote={v} key={v.emoji} onClick={() => props.vote(props.activity.id, v.emoji, !v?.haveIVoted)} />
                        ))}
                        <ModalEmojiPicker
                            size="xs"
                            onChoose={emoji => {
                                props.vote(props.activity.id, emoji, true);
                            }}
                            emoji="+"
                            fontSize="1em"
                            reaction={true}
                        />
                        <Box flex="1"></Box>
                    </HStack>
                </VStack>
            </HStack>
        </Card>
    );
};

const EmojiCount = (props: { vote: object; onClick: () => void }) => {
    const haveIVoted = props.vote.haveIVoted;
    return (
        <Button
            size="xs"
            variant="outline"
            colorScheme={haveIVoted ? "blue" : undefined}
            paddingRight={3}
            borderRadius="full"
            onClick={props.onClick}>
            {props.vote.emoji} {props.vote.count}
        </Button>
    );
};

export default ActivitiesView;
