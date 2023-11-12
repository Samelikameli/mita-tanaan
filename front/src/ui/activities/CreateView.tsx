import { Button, Card, HStack, Heading, SlideFade, Text, VStack } from "@chakra-ui/react";
import ViewFadeWrapper, { PAGE_CHANGE_ANIM } from "../ViewFadeWrapper.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const MyCard = ({ text, to, bg }: { text: string; to: string; bg: string }) => {
    return (
        <Link to={to}>
            <Card mx={4} p={4} background={bg} color="white" height="20vh" justifyContent="center" borderRadius="30">
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
                    <MyCard text={"What are we doing today?"} to="/home/activities" bg="var(--grad2, linear-gradient(180deg, #E000F3 0%, #6B00F3 100%));" />
                </SlideFade>
                <SlideFade in={true} offsetX={100} offsetY={0} delay={PAGE_CHANGE_ANIM + 0.4}>
                    <MyCard text={"Start a challenge"} to="/home/challenges" bg="var(--grad, linear-gradient(180deg, #00F3E4 0%, #3987FC 100%));" />
                </SlideFade>
                <span></span>
            </VStack>
        </ViewFadeWrapper>
    );
};

export default CreateView;
