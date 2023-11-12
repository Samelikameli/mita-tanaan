import { BottomNavigation, BottomNavigationItem, BottomNavigationLabel } from "chakra-ui-bottom-navigation";

import { Box, Text } from "@chakra-ui/react";

import ActivitiesView from "../activities/ActivitiesView.tsx";
import CreateView from "../activities/CreateView.tsx";
import ChallengesView from "../challenges/ChallengesView.tsx";
import { AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import waBG from "../../assets/wa.png";

const getTabIndex = (pathName: string) => {
    if (pathName == "/home/activities") return 0;
    if (pathName == "/home/create") return 1;
    if (pathName == "/home/challenges") return 2;
    return 0;
};

const HomeView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    //const [tabIndex, setTabIndex] = useState<number | string>(1);

    const changeTab = (newValue: string | number) => {
        navigate(["/home/activities", "/home/create", "/home/challenges"][newValue as number]);
    };

    const tabIndex = getTabIndex(location.pathname);

    return (
        <Box style={{ height: "100%", display: "flex", flexDirection: "column", background: `url(${waBG}) no-repeat fixed center`, backgroundSize:"500px"}}>
            <Box style={{ flex: 1, position: "relative", background: "rgba(200,200,200,0.7)"}}>
                <AnimatePresence>{tabIndex === 0 ? <ActivitiesView /> : tabIndex === 1 ? <CreateView /> : <ChallengesView />}</AnimatePresence>
            </Box>
            <div style={{background:"rgba(200,200,200,0.7)"}}>
            <BottomNavigation   
                value={tabIndex}
                onChange={changeTab}
                colorScheme={"white"}
                variant={"flat"}
                showLabel={"always"}
                p={4}
                style={{ position: "relative", opacity: 1, background: "white", borderRadius: "30px 30px 0 0" }}
                boxShadow="0 0 1rem rgba(0,0,0,0.2)">
                <BottomNavigationItem>
                    <BottomNavigationLabel fontSize={"16px"}>
                        <Text fontSize="24px">🚀</Text>
                        Activities
                    </BottomNavigationLabel>
                </BottomNavigationItem>
                <BottomNavigationItem>
                    <BottomNavigationLabel fontSize={"16px"}>
                        <Text fontSize="24px">+</Text>
                        Create
                    </BottomNavigationLabel>
                </BottomNavigationItem>
                <BottomNavigationItem>
                    <BottomNavigationLabel fontSize="16px">
                        <Text fontSize="24px">🏆</Text>
                        Challenges
                    </BottomNavigationLabel>
                </BottomNavigationItem>
            </BottomNavigation>
            </div>
        </Box>
    );
};

export default HomeView;
