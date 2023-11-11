import { BottomNavigation, BottomNavigationItem, BottomNavigationLabel } from "chakra-ui-bottom-navigation";

import { Box, Heading, Text } from "@chakra-ui/react";

import ActivitiesView from "../activities/ActivitiesView.tsx";
import { useState } from "react";
import CreateView from "../activities/CreateView.tsx";
import ChallengesView from "../activities/ChallengesView.tsx";
import { AnimatePresence } from "framer-motion";

const HomeView = () => {
    const [tabIndex, setTabIndex] = useState<number | string>(1);

    return (
        <Box style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Box style={{ flex: 1, position: "relative" }}>
                <AnimatePresence>{tabIndex === 0 ? <ActivitiesView /> : tabIndex === 1 ? <CreateView /> : <ChallengesView />}</AnimatePresence>
            </Box>

            <BottomNavigation
                value={tabIndex}
                onChange={setTabIndex}
                colorScheme={"white"}
                variant={"flat"}
                showLabel={"always"}
                p={4}
                style={{ position: "relative" }}
                boxShadow="0 0 1rem rgba(0,0,0,0.2)">
                <BottomNavigationItem>
                    <BottomNavigationLabel fontSize={"24px"}>🚀</BottomNavigationLabel>
                </BottomNavigationItem>
                <BottomNavigationItem>
                    <BottomNavigationLabel fontSize={"24px"}>+</BottomNavigationLabel>
                </BottomNavigationItem>
                <BottomNavigationItem>
                    <BottomNavigationLabel fontSize={"24px"}>🏆</BottomNavigationLabel>
                </BottomNavigationItem>
            </BottomNavigation>
        </Box>
    );
};

export default HomeView;
