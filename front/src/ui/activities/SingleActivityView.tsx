import { Card, Box, Button, HStack, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import ViewFadeWrapper from "../ViewFadeWrapper";
import { useActivities } from "../../controllers/activities";
import ActivityDetails from "./ActivityDetails";
import { useState } from "react";

const SingleActivityView = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { data: activities } = useActivities();

    const activity = activities.find(a => a.id === params.id);

    const [showHelp, setShowHelp] = useState(false);

    if (!activity) return <></>;

    return (
        <ViewFadeWrapper>
            <Box padding={4} background="#eeeeee" height="100%">
                <Button colorScheme="gray" size="sm" onClick={() => navigate("/home/activities")}>
                    Back
                </Button>
                <Card padding={2} marginTop="5">
                    <ActivityDetails activity={activity} />

                    <HStack spacing={1} marginTop="5">
                        <Button variant="outline" flex="1" borderRadius=".8rem" onClick={() => setShowHelp(true)}>
                            Not interested
                        </Button>
                        <Button colorScheme="blue" flex="1" borderRadius=".8rem" onClick={() => setShowHelp(true)}>
                            I'm in
                        </Button>
                    </HStack>
                    {showHelp && (
                        <Text fontSize="0.8rem" textAlign="center">
                            Sorry, this feature does not work yet.
                        </Text>
                    )}
                </Card>
            </Box>
        </ViewFadeWrapper>
    );
};

export default SingleActivityView;
