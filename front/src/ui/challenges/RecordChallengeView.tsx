import { Card, Box, Button, HStack, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ViewFadeWrapper from "../ViewFadeWrapper";

const RecordChallengeView = () => {
    const navigate = useNavigate();
    return (
        <ViewFadeWrapper>
            <Box padding={4} background="orange.100" height="100%">
                <Button colorScheme="gray" size="sm" onClick={() => navigate(-1)}>
                    Back
                </Button>
                <Heading fontSize="xl" paddingTop="5">
                    VIDEO HERE
                </Heading>
                <Card padding={2}></Card>
                <Heading fontSize="xl" paddingTop="5">
                    Who to challenge?
                </Heading>
                <Card padding={2}></Card>
                <Card padding={2}>
                    <HStack spacing={1} justifyContent="end">
                        <Button colorScheme="blue">Send</Button>
                    </HStack>
                </Card>
            </Box>
        </ViewFadeWrapper>
    );
};

export default RecordChallengeView;
