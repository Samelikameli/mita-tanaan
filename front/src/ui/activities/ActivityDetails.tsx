import { Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Activity } from "../../controllers/activities";
import Avatar from "../account/Avatar";
import { timeModeToEmoji } from "../utils";
import EmojiIcon from "../EmojiIcon";

const ActivityDetails = (props: { activity: Activity }) => {
    const activity = props.activity;
    const timeModeToEmoji1 = timeModeToEmoji(activity?.time || null);
    return (
        <>
            <Text style={{ fontWeight: "bold" }}>What are we doing today?</Text>
            <HStack>
                <EmojiIcon>{activity.emoji}</EmojiIcon>
                <VStack alignItems="start">
                    <Text style={{ fontSize: "120%" }}>{activity.name}</Text>
                </VStack>
            </HStack>
            <br />
            <Text style={{ fontWeight: "900" }}>When?</Text>
            <Text style={{ fontSize: "120%" }}>
                {timeModeToEmoji1.emoji} {activity.time === "custom" ? activity.customTime : timeModeToEmoji1.name}
            </Text>
            <br />
            <Text style={{ fontWeight: "900" }}>Who's coming?</Text>
            <Flex>
                {["dog", "cat", "panda"].map(a => (
                    <Avatar animal={a} small={true} key={a} />
                ))}
            </Flex>
        </>
    );
};
export default ActivityDetails;
