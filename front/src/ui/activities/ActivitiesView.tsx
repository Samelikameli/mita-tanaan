import { VStack, Card, Box, HStack, Button, Heading, Text, SlideFade } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import EmojiIcon from "../EmojiIcon";
import { Activity, useActivities } from "../../controllers/activities";
import { AnimatePresence, motion } from "framer-motion";
import ViewFadeWrapper, { PAGE_CHANGE_ANIM } from "../ViewFadeWrapper";

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
    const { data: activities } = useActivities();

    return (
        <ViewFadeWrapper styleAbsolutely={false}>
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
                    {activities && (
                        <motion.div variants={container} initial="hidden" animate="show">
                            <VStack spacing={4} align="stretch">
                                <AnimatePresence>
                                    {activities.map(a => (
                                        <motion.div key={a.id} variants={listItem}>
                                            <Suggestion activity={a} />
                                        </motion.div>
                                    ))}
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

const Suggestion = (props: { activity: Activity }) => {
    const { id, name, owner, votes } = props.activity;
    return (
        <Card padding={2}>
            <Link to={`/activities/${id}`}>
                <HStack>
                    <EmojiIcon>⚽</EmojiIcon>
                    <VStack flex="1" alignItems="right" justifyContent="center" spacing={0}>
                        <Text fontSize="1rem">{name}</Text>
                        <Text fontSize="0.6rem" color="#555555">
                            {owner}
                        </Text>
                    </VStack>
                    <Text fontSize="0.6rem" color="#555555" alignSelf="start" padding={1}>
                        34 min ago
                    </Text>
                </HStack>
            </Link>
            <HStack spacing={1} marginTop="1rem" flexWrap="wrap">
                {votes.map(({ emoji, count }) => (
                    <Button size="xs" variant="outline" key={emoji} paddingRight={3} borderRadius="full" onClick={() => {}}>
                        {emoji} {count}
                    </Button>
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

export default ActivitiesView;
