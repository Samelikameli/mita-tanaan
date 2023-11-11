import { Card, Box, Button, HStack, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SingleActivityView = () => {
    const navigate = useNavigate();
    return (
        <Box padding={4} background="orange.100" height="100%">
            <Button colorScheme="gray" size="sm" onClick={() => navigate(-1)}>
                Back
            </Button>
            <Heading fontSize="xl" paddingTop="5">
                Football after school
            </Heading>
            <Text fontSize="m" paddingBottom="4">
                Artur Skwarek
            </Text>
            <Card padding={2}>
                <HStack spacing={1}>
                    <Button></Button>
                </HStack>
            </Card>
        </Box>
    );
};

export default SingleActivityView;
