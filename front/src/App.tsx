import "./App.css";
import { useUserFetching } from "./controllers/user.tsx";
import Register from "./ui/account/Register.tsx";
import UserContext from "./usercontext.tsx";
import ActivitiesView from "./ui/activities/ActivitiesView.tsx";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import SingleActivityView from "./ui/activities/SingleActivityView.tsx";
import IntroView from "./ui/intro/IntroView.tsx";
import { AnimatePresence } from "framer-motion";
import OngoingActivityView from "./ui/activities/OngoingActivityView.tsx";
import { Box } from "@chakra-ui/react";

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
    console.log(location.pathname);
    return (
        <AnimatePresence initial={false}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<IntroView />} key="/" />
                <Route path="/activities" element={<ActivitiesView />} key="/activities" />
                <Route path="/activities/:id" element={<SingleActivityView />} key="/activities/:id" />
                <Route path="/ongoing" element={<OngoingActivityView />} key="/ongoing" />
            </Routes>
        </AnimatePresence>
    );
};

export default App;
