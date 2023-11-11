import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Container,
    Grid,
    GridItem,
    Heading,
    IconButton,
    ListItem,
    SlideFade,
    Text,
    UnorderedList,
} from "@chakra-ui/react";
import ViewFadeWrapper, { PAGE_CHANGE_ANIM } from "../ViewFadeWrapper.tsx";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const ChallengesView = () => {
    const navigate = useNavigate();
    return (
        <ViewFadeWrapper styleAbsolutely={false}>
            <SlideFade in={true} offsetX={100} offsetY={0} delay={PAGE_CHANGE_ANIM} style={{ height: "100%" }}>
                <Container></Container>
            </SlideFade>
        </ViewFadeWrapper>
    );
};

export default ChallengesView;
