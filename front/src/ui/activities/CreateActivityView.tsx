import { Box, Button, HStack, Heading, Input, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ViewFadeWrapper from "../ViewFadeWrapper";
import ModalEmojiPicker from "../ModalEmojiPicker";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateActivity } from "../../controllers/activities";

type FormValues = {
    name: string;
    place: string;
    time?: string;
};

const CreateActivityView = () => {
    const navigate = useNavigate();
    const [emoji, setEmoji] = useState("❓");
    const [time, setTime] = useState<string>("after-school");

    const { register: registerInput, handleSubmit } = useForm<FormValues>();
    const createActivity = useCreateActivity();

    const onSubmit = handleSubmit((values: FormValues) =>
        createActivity({ name: values.name, emoji, place: values.place, time, customTime: values.time }).then(activityId => {
            navigate(`/activities/create/${activityId}`);
        }),
    );

    const choose = (time: string) => () => {
        setTime(time);
    };

    return (
        <ViewFadeWrapper>
            <Box padding={4} background="white" height="100%">
                <form onSubmit={onSubmit}>
                    <Button colorScheme="gray" size="sm" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Heading fontSize="md" paddingTop="3" paddingBottom="2">
                        What are we doing today?
                    </Heading>
                    <Input placeholder="Tell people what we're doing today." {...registerInput("name", { required: true })} />

                    <Heading fontSize="md" paddingTop="3" paddingBottom="2">
                        Choose an icon?
                    </Heading>
                    <ModalEmojiPicker emoji={emoji} onChoose={e => setEmoji(e)} />

                    {/*<form
                        onSubmit={handleSubmit((values: FormValues) =>
                            register({ name: values.name, avatar: "panda,jpg", location: new GeoPoint(0, 0) }),
                        )}>
                        <input placeholder={"nimi"} type={"text"} {...registerInput("name", { required: true })} />
                        <button type={"submit"}>Submit</button>
                        </form>*/}

                    <Heading fontSize="md" paddingTop="5" paddingBottom="2">
                        When?
                    </Heading>
                    <VStack alignItems="flex-start">
                        <Button variant="ghost" onClick={choose("after-school")} justifyContent="start">
                            🏫 After school {time == "after-school" && "✔️"}
                        </Button>
                        <Button variant="ghost" onClick={choose("after-dinner")} justifyContent="start">
                            🍽️ After dinner {time == "after-dinner" && "✔️"}
                        </Button>
                        <Button variant="ghost" onClick={choose("custom")} justifyContent="start">
                            🕒 Add custom time {time == "custom" && "✔️"}
                        </Button>
                    </VStack>

                    {time == "custom" && <Input placeholder="HH:MM" {...registerInput("time", { required: true })} />}

                    <Heading fontSize="md" paddingTop="5" paddingBottom="2">
                        Where are we meeting up?
                    </Heading>
                    <HStack>
                        <Input placeholder="" {...registerInput("place", { required: true })} />
                    </HStack>

                    <Button colorScheme="blue" type="submit" marginTop="2rem" width="100%" size="lg" borderRadius="xl" height="4rem">
                        Send to {"  >"}
                    </Button>
                </form>
            </Box>
        </ViewFadeWrapper>
    );
};

export default CreateActivityView;
