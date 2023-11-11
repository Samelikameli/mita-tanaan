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

const MyCard = ({ onClick, text }) => {
    return (
        <Card mx={4} h={"100%"}>
            <CardHeader>
                <Heading>{text}</Heading>
            </CardHeader>
            <CardBody>
                <Text>Favorites</Text>
                <UnorderedList>
                    <ListItem>Bsasketball</ListItem>
                    <ListItem>Bsasketball</ListItem>
                </UnorderedList>
            </CardBody>
            <CardFooter>
                <Container centerContent>
                    <IconButton size={"lg"} isRound={true} fontSize="20px" icon={<AddIcon />} aria-label={"create"} onClick={onClick}></IconButton>
                </Container>
            </CardFooter>
        </Card>
    );
};

const CreateView = () => {
    const navigate = useNavigate();
    return (
        <ViewFadeWrapper styleAbsolutely={false}>
            <SlideFade in={true} offsetX={100} offsetY={0} delay={PAGE_CHANGE_ANIM} style={{ height: "100%" }}>
                <Grid color={"white"} h={"100%"} gap={6}>
                    <GridItem>
                        <MyCard text={"Activities"} onClick={() => navigate("/activities/create")} />
                    </GridItem>
                    <GridItem>
                        <MyCard text={"Challenges"} />
                    </GridItem>
                </Grid>
            </SlideFade>
        </ViewFadeWrapper>
    );
};

export default CreateView;
