import { VStack, Card, Box, HStack, Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const activities = [
    { id: 0, name: "Futis" },
    { id: 1, name: "Hengailu" },
    { id: 2, name: "Hengailu" },
];

const ActivitiesView = () => {
    return (
        <Box padding={4} background="orange.100" height="100%">
            <Heading fontSize="xl" paddingTop="5">
                Things to do
            </Heading>
            <Text fontSize="m" paddingBottom="4">
                Here are your friends' suggestions
            </Text>
            <VStack spacing={4} align="stretch">
                {activities.map(({ id, name }) => (
                    <Link to={`/activities/${id}`}>
                        <Card padding={2}>
                            {name}
                            <HStack spacing={1}>
                                <Button></Button>
                            </HStack>
                        </Card>
                    </Link>
                ))}
            </VStack>
        </Box>
    );
};

export default ActivitiesView;
