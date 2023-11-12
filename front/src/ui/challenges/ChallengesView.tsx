// @ts-nocheck
import { Circle, HStack, Text, VStack, Grid, GridItem } from "@chakra-ui/react";
import ViewFadeWrapper from "../ViewFadeWrapper.tsx";
import Avatar from "../account/Avatar.tsx";
import useChallenges from "../../controllers/challenges.ts";
import {useGroups}  from "../../controllers/groups";

// Add props to GroupIcon

type GroupIconProps = {
    name: string;
    users: string[];
};

const GroupIcon = (props: GroupIconProps) => (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", margin: 10 }}>
        <Circle size={"128px"} bg={"lightgray"} filter={"drop-shadow(2px 2px 5px gray)"}>
            <Grid templateColumns="repeat(2, 1fr)" gap={1}>
                { props.users.slice(0,4).map(user => {
                return <GridItem colSpan={1} rowSpan={1}>
                    <Avatar small={true} animal={`human${(user.charCodeAt(0) % 4) + 1}`} width="42px"></Avatar>
                </GridItem>
                })}
            </Grid>
        </Circle>
        <Text fontSize="0.8em" mt="3">{props.name}</Text>
    </div>
);

const ChallengesView = () => {
    useChallenges();
    const { data: groups } = useGroups();

    console.log(groups);
    return (
        <ViewFadeWrapper styleAbsolutely={true}>
            <VStack flex="1" justifyContent="space-between" height="100%" >
                <div style={{ display: "flex", alignItems: "top", justifyContent:"left", flexDirection: "row", margin: 1, overflow:"scroll", width:"100%"}}>
                    {groups?.map(g => {
                        return <GroupIcon key={g.id} name={g.name} users={g.users}/>
                    })}
                </div>
                <VStack flex="1" justifyContent="center" padding="4">
                    <Text>The challenge feature is still under development - please check out our slide deck and video demo ✨✨✨</Text>
                    <Text>The "Activities" tab works, try that instead!</Text>
                </VStack>
            </VStack>
        </ViewFadeWrapper>
    );
};

export default ChallengesView;
