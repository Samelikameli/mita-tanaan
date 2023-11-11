import { BottomNavigation, BottomNavigationItem, BottomNavigationLabel } from "chakra-ui-bottom-navigation";

import { Box, Heading, Text } from "@chakra-ui/react";

import ActivitiesView from "../activities/ActivitiesView.tsx";
import { useState } from "react";
import CreateView from "../activities/CreateView.tsx";

const HomeView = () => {
    const [tabIndex, setTabIndex] = useState<number | string>(1);

    return (
        <Box style={{ height: "100%" }}>
            <Box style={{ height: "calc(100% - 64px)" }}>{tabIndex === 0 ? <ActivitiesView /> : tabIndex === 1 ? <CreateView /> : null}</Box>

            <BottomNavigation value={tabIndex} onChange={setTabIndex} colorScheme={"white"} variant={"flat"} showLabel={"always"}>
                <BottomNavigationItem>
                    <BottomNavigationLabel>Activities</BottomNavigationLabel>
                </BottomNavigationItem>
                <BottomNavigationItem>
                    <BottomNavigationLabel>Create</BottomNavigationLabel>
                </BottomNavigationItem>
                <BottomNavigationItem>
                    <BottomNavigationLabel>Challenges</BottomNavigationLabel>
                </BottomNavigationItem>
            </BottomNavigation>
        </Box>
    );
};

export default HomeView;
