import { Box, Button, HStack, Heading, VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import ViewFadeWrapper from "../ViewFadeWrapper";
import { FormEvent, useState } from "react";
import { useGroups } from "../../controllers/groups";
import { modifyActivityGroups } from "../../controllers/activities";

const CreateActivityViewPage2 = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { data: groups } = useGroups();

    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    const onToggleGroup = (groupId: string) => {
        setSelectedGroups(selected => {
            if (selected.includes(groupId)) {
                return selected.filter(s => s != groupId);
            } else {
                return [...selected, groupId];
            }
        });
    };

    //const { register: registerInput, handleSubmit } = useForm<FormValues>();
    //const createActivity = useCreateActivity();
    // const onSubmit = handleSubmit((values: FormValues) => createActivity({ name: values.name, emoji, place: values.place, time: values.time }));
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        modifyActivityGroups(params.id!, selectedGroups).then(() => {
            navigate(`/activities/${params.id}`);
        });
    };

    //const groups = ["Class 2b", "Local skaters", "Football team", "Primary School"];
    const friends = ["Artur", "Essi", "Tuomas", "Tina", "Kaappo", "Peter", "Veeti", "Samu", "Petteri", "James"];

    return (
        <ViewFadeWrapper>
            <Box padding={4} background="white" height="100%">
                <form onSubmit={onSubmit}>
                    {/*<Button colorScheme="gray" size="sm" type="button">
                        Cancel
                    </Button>*/}

                    <Heading fontSize="lg" paddingTop="3" paddingBottom="2" textAlign="center">
                        Groups
                    </Heading>

                    <VStack alignItems="stretch">
                        {groups && groups.map(({ id, name }) => <DestinationButton text={name} key={id} onToggle={() => onToggleGroup(id)} />)}
                    </VStack>

                    <Heading fontSize="lg" paddingTop="3" paddingBottom="2" textAlign="center">
                        Friends
                    </Heading>

                    <HStack alignItems="start" flexWrap="wrap">
                        {friends.map(groupName => (
                            <DestinationButton text={groupName} width="calc(50% - 0.5rem)" key={groupName} />
                        ))}
                    </HStack>

                    <Button colorScheme="blue" type="submit" marginTop="2rem" width="100%" size="lg" borderRadius="xl" height="4rem">
                        Send {"  >"}
                    </Button>
                </form>
            </Box>
        </ViewFadeWrapper>
    );
};

const DestinationButton = (props: { text: string; width?: string; onToggle?: () => void }) => {
    const [sel, setSel] = useState(false);
    return (
        <Button
            variant={sel ? "solid" : "outline"}
            colorScheme={sel ? "blue" : "gray"}
            onClick={() => {
                setSel(b => !b);
                if (props.onToggle) props.onToggle();
            }}
            justifyContent="start"
            width={props.width}>
            <VStack background="#aaaaaa" width="1.5rem" height="1.5rem" justifyContent="center" marginRight="0.3rem" borderRadius="full"></VStack>
            {props.text}
        </Button>
    );
};

export default CreateActivityViewPage2;
