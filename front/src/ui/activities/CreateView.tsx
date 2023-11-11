import { Button, Card, HStack, Heading, SlideFade, Text, VStack } from "@chakra-ui/react";
import ViewFadeWrapper, { PAGE_CHANGE_ANIM } from "../ViewFadeWrapper.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const MyCard = ({ text, to }: { text: string; to: string }) => {
    return (
        <Link to={to}>
            <Card mx={4} p={4} background="linear-gradient(0deg, #0070F3, #3993FC)" color="white" height="20vh" justifyContent="center">
                <Heading fontSize="lg" textAlign="center">
                    {text}
                </Heading>
            </Card>
        </Link>
    );
};

const OngoingNotification = () => {
    const navigate = useNavigate();
    return (
        <HStack background="green.600" color="white" padding="2">
            <VStack alignItems="left" flex="1" spacing="0">
                <Text color="#ffffff" fontSize="sm" fontWeight="bold">
                    Ongoing activity
                </Text>
                <Text color="#ffffff" fontSize="lg" fontWeight="bold">
                    Football
                </Text>
            </VStack>
            <Button variant="outline" colorScheme="white" onClick={() => navigate("/ongoing")}>
                Open
            </Button>
        </HStack>
    );
};

const CreateView = () => {
    const [showOngoing, setShowOngoing] = useState(-1);
    return (
        <ViewFadeWrapper styleAbsolutely={true}>
            <VStack height="100%" alignItems="stretch" spacing="0" justifyContent="space-between" onDoubleClick={() => setShowOngoing(i => i + 1)}>
                {showOngoing > 0 ? <OngoingNotification /> : <span></span>}
                <SlideFade in={true} offsetX={100} offsetY={0} delay={PAGE_CHANGE_ANIM}>
                    <MyCard text={"What are we doing today?"} to="/activities/create" />
                </SlideFade>
                <SlideFade in={true} offsetX={100} offsetY={0} delay={PAGE_CHANGE_ANIM + 0.4}>
                    <MyCard text={"Start a challenge"} to="/home/challenges" />
                </SlideFade>
                <span></span>
            </VStack>
        </ViewFadeWrapper>
    );
};

export default CreateView;
