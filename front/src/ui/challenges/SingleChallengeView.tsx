import { Card, Box, Button, VStack, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ViewFadeWrapper from "../ViewFadeWrapper";

const SingleChallengeView = () => {
    const navigate = useNavigate();
    const name = "Football after school";
    return (
        <ViewFadeWrapper>
            <Box padding={4} background="orange.100" height="100%">
                <Button colorScheme="gray" size="sm" onClick={() => navigate(-1)}>
                    Back
                </Button>
                <Heading fontSize="xl" paddingTop="5">
                    {name}
                </Heading>
                <Text fontSize="m" paddingBottom="4">
                    VIDEO HERE
                </Text>

                <Card padding={2}>
                    <VStack spacing={2}>
                        <Button>Respond to this challenge</Button>
                    </VStack>
                </Card>
                <Card padding={2} marginTop={5}>
                    <Heading fontSize="l" paddingBottom="1">
                        Suggest "{name}" to your friends today
                    </Heading>
                    <Button>Suggest</Button>
                </Card>
            </Box>
        </ViewFadeWrapper>
    );
};

export default SingleChallengeView;
