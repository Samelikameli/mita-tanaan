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

const ChallengesView = () => {
    const { data: challenges } = useActivities();

    return (
        <ViewFadeWrapper>
            <VStack background="orange.100" height="100%" alignItems="stretch" spacing="0">
                <Box padding="4" flex="1" overflowY="auto">
                    <SlideFade in={true} offsetX={100} offsetY={0} delay={PAGE_CHANGE_ANIM}>
                        <Heading fontSize="xl" paddingTop="5">
                            Can <b>you</b> do this?
                        </Heading>
                        <Text fontSize="m" paddingBottom="4">
                            Challenges sent by your friends
                        </Text>
                    </SlideFade>
                    {/*isLoading && <Text>Loading...</Text>*/}
                    {challenges && (
                        <motion.div variants={container} initial="hidden" animate="show">
                            <VStack spacing={4} align="stretch">
                                <AnimatePresence>
                                    {challenges.map(a => (
                                        <motion.div key={a.id} variants={listItem}>
                                            <ChallengeCard challenge={a} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </VStack>
                        </motion.div>
                    )}
                    <SlideFade in={true} offsetX={100} offsetY={0} delay={PAGE_CHANGE_ANIM}>
                        <Heading fontSize="xl" paddingTop="5">
                            Trending challenges
                        </Heading>
                        <Text fontSize="m" paddingBottom="4">
                            Find and respond to challenges sent to you
                        </Text>
                    </SlideFade>
                </Box>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Box background="white" padding="3" textAlign="center" boxShadow="0 0 1rem rgba(0,0,0,0.3)" z-index="100" position="relative">
                        <Link to="/challenges/record">
                            <Button colorScheme="blue">Create your own challenge</Button>
                        </Link>
                    </Box>
                </motion.div>
            </VStack>
        </ViewFadeWrapper>
    );
};

const ChallengeCard = (props: { challenge: Activity }) => {
    const { id, name, owner, votes } = props.challenge;
    return (
        <Card padding={2}>
            <Link to={`/challenges/${id}`}>
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
                <Link to={`/challenges/${id}`}>
                    <Button size="xs" colorScheme="blue">
                        Watch
                    </Button>
                </Link>
            </HStack>
        </Card>
    );
};

export default ChallengesView;
