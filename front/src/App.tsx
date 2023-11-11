import "./App.css";
import { useUserFetching } from "./controllers/user.tsx";
import Register from "./ui/account/Register.tsx";
import UserContext from "./usercontext.tsx";
import ActivitiesView from "./ui/activities/ActivitiesView.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleActivityView from "./ui/activities/SingleActivityView.tsx";
import IntroView from "./ui/intro/IntroView.tsx";
import { AnimatePresence } from "framer-motion";
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
                <AnimatePresence>
                    <Routes>
                        <Route path="/" element={<IntroView />} />
                        <Route path="/activities" element={<ActivitiesView />} />
                        <Route path="/activities/:id" element={<SingleActivityView />} />
                    </Routes>
                </AnimatePresence>
            </BrowserRouter>
        </UserContext.Provider>
    );
};

export default App;
