import { VStack, Card, Box, HStack, Button, Heading, Text, SlideFade } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import EmojiIcon from "../EmojiIcon";
import { Activity, VoteCount, useActivities } from "../../controllers/activities";
import { AnimatePresence, motion } from "framer-motion";
import ViewFadeWrapper, { PAGE_CHANGE_ANIM } from "../ViewFadeWrapper";
import { timeModeToEmoji } from "../utils";
import { useGroups } from "../../controllers/groups";
import React, { useState } from "react";

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
    const { data: activities, vote } = useActivities();
    const { data: groups } = useGroups();

    return (
        <ViewFadeWrapper styleAbsolutely={true}>
            <VStack height="100%" alignItems="stretch" spacing="0">
                <Box padding="4" flex="1" overflowY="auto">
                    <SlideFade in={true} offsetX={100} offsetY={0} delay={PAGE_CHANGE_ANIM}>
                        <Heading fontSize="xl" paddingTop="5">
                            What are we doing today?
                        </Heading>
                        <Text fontSize="m" paddingBottom="4">
                            Here are your friends' suggestions
                        </Text>
                    </SlideFade>
                    {/*isLoading && <Text>Loading...</Text>*/}
                    {activities && activities.length > 0 && groups && (
                        <motion.div variants={container} initial="hidden" animate="show">
                            <VStack spacing={4} align="stretch">
                                <AnimatePresence>
                                    {groups.map(g => {
                                        const activitiesInGroup = activities.filter(a => a.group.includes(g.id));
                                        return (
                                            <React.Fragment key={g.id}>
                                                <Heading
                                                    fontSize="sm"
                                                    borderBottom="1px solid #D3D3D3"
                                                    color="#727272"
                                                    paddingBottom="2"
                                                    paddingTop="2">
                                                    {g.name}
                                                </Heading>
                                                {activitiesInGroup.map(a => {
                                                    console.log("Activity", a);
                                                    return (
                                                        <motion.div key={a.id} variants={listItem}>
                                                            <Suggestion activity={a} vote={vote} />
                                                        </motion.div>
                                                    );
                                                })}
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
                {/*<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>*/}
                {/*    <Box background="white" padding="3" textAlign="center" boxShadow="0 0 1rem rgba(0,0,0,0.3)" z-index="100" position="relative">*/}
                {/*        <Button colorScheme="blue">Add new suggestion</Button>*/}
                {/*    </Box>*/}
                {/*</motion.div>*/}
            </VStack>
        </ViewFadeWrapper>
    );
};

const Suggestion = (props: { activity: Activity; vote: (activityId: string, emoji: string) => Promise<void> }) => {
    const { id, name, owner, votes, time } = props.activity;
    const { emoji: timeEmoji } = timeModeToEmoji(time);
    return (
        <Card padding={2}>
            <Link to={`/activities/${id}`}>
                <HStack>
                    <EmojiIcon>{props.activity.emoji}</EmojiIcon>
                    <VStack flex="1" alignItems="right" justifyContent="center" spacing={0}>
                        <Text fontSize="1rem">{name}</Text>
                        <Text fontSize="0.7rem" color="#555555">
                            {owner}
                        </Text>
                    </VStack>
                    <Text fontSize="0.8rem" color="#555555" alignSelf="start" padding={1}>
                        {timeEmoji}
                    </Text>
                </HStack>
            </Link>
            <HStack spacing={1} marginTop="1rem" flexWrap="wrap">
                {votes.map(v => (
                    <EmojiCount vote={v} key={v.emoji} onClick={() => props.vote(props.activity.id, v.emoji)} />
                ))}
                <Box flex="1"></Box>
                <Link to={`/activities/${id}`}>
                    <Button size="xs" colorScheme="blue">
                        Open
                    </Button>
                </Link>
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
