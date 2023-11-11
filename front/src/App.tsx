import "./App.css";
import { useUserFetching } from "./controllers/user.tsx";
import Register from "./ui/account/Register.tsx";
import UserContext from "./usercontext.tsx";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import SingleActivityView from "./ui/activities/SingleActivityView.tsx";
import IntroView from "./ui/intro/IntroView.tsx";
import { AnimatePresence } from "framer-motion";
import OngoingActivityView from "./ui/activities/OngoingActivityView.tsx";
import { Box } from "@chakra-ui/react";
import CreateActivityView from "./ui/activities/CreateActivityView.tsx";
import HomeView from "./ui/home/HomeView.tsx";
import CreateActivityViewPage2 from "./ui/activities/CreateActivityViewPage2.tsx";
import SilentActivityView from "./ui/activities/SilentActivityView.tsx";

const App = () => {
    //TODO: rekisteröintintisivu jos !userExists
    const { user, loading, userExists, register } = useUserFetching();

    console.log("in app: ", user, userExists);

    if (loading) return <Box background="background.100" height="100%"></Box>;

    if (!userExists) return <Register register={register} />;

    return (
        <UserContext.Provider value={user}>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </UserContext.Provider>
    );
};

const AppRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence initial={false}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<IntroView />} />
                <Route path="/home/*" element={<HomeView />} />
                {/*<Route path="/activities" element={<ActivitiesView />} />*/}
                <Route path="/activities/:id" element={<SingleActivityView />} />
                <Route path="/activities/create" element={<CreateActivityView />} />
                <Route path="/activities/create/:id" element={<CreateActivityViewPage2 />} />
                <Route path="/ongoing" element={<OngoingActivityView />} />
                <Route path={"/silent"} element={<SilentActivityView />} />
                {/*<Route path="/challenges" element={<ChallengesView />} />*/}
            </Routes>
        </AnimatePresence>
    );
};

export default App;
