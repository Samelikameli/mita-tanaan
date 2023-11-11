import {
    Box,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Circle,
    Container,
    Grid,
    GridItem,
    Heading,
    HStack,
    IconButton,
    ListItem,
    SlideFade,
    Text,
    UnorderedList,
} from "@chakra-ui/react";
import ViewFadeWrapper, { PAGE_CHANGE_ANIM } from "../ViewFadeWrapper.tsx";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Avatar from "../account/Avatar.tsx";
import useChallenges from "../../controllers/challenges.ts";

const GroupIcon = () => (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", margin: 10 }}>
        <Circle size={"96px"} bg={"lightgray"}>
            <Avatar small={true} animal={"dog"}></Avatar>
        </Circle>
        <Text>Pellet</Text>
    </div>
);

const ChallengesView = () => {
    const navigate = useNavigate();
    useChallenges();
    return (
        <ViewFadeWrapper styleAbsolutely={true}>
            <HStack>
                <GroupIcon />
                <GroupIcon />
                <GroupIcon />
            </HStack>
        </ViewFadeWrapper>
    );
};

export default ChallengesView;
