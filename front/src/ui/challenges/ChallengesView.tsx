import { Circle, HStack, Text, VStack } from "@chakra-ui/react";
import ViewFadeWrapper from "../ViewFadeWrapper.tsx";
import Avatar from "../account/Avatar.tsx";
import useChallenges from "../../controllers/challenges.ts";

const GroupIcon = () => (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", margin: 10 }}>
        <Circle size={"96px"} bg={"lightgray"}>
            <Avatar small={true} animal={"dog"}></Avatar>
        </Circle>
        <Text>Group 1</Text>
    </div>
);

const ChallengesView = () => {
    useChallenges();
    return (
        <ViewFadeWrapper styleAbsolutely={true}>
            <VStack flex="1" justifyContent="space-between" height="100%">
                <HStack>
                    <GroupIcon />
                    <GroupIcon />
                    <GroupIcon />
                </HStack>
                <VStack flex="1" justifyContent="center" padding="4">
                    <Text>The challenge feature is still under development - please check out our slide deck and video demo ✨✨✨</Text>
                </VStack>
            </VStack>
        </ViewFadeWrapper>
    );
};

export default ChallengesView;
