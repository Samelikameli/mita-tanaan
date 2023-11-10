import { VStack, Card, Box, Button, HStack, Heading, Link, Text } from "@chakra-ui/react";

const SingleActivityView = () => {
    return (
        <Box padding={4} background="orange.100" height="100%">
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
