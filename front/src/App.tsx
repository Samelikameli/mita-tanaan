import { Button } from "@chakra-ui/react";
import "./App.css";
import { useUserFetching } from "./controllers/user.tsx";
import Register from "./ui/account/register.tsx";
import UserContext from "./usercontext.tsx";
import ActivitiesView from "./ui/activities/activities-view.tsx";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SingleActivityView from "./ui/activities/single-activity-view.tsx";
import IntroView from "./ui/intro/intro-view.tsx";

type PageName = { name: "main" } | { name: "activities" } | { name: "singleActivity"; id: number };

const router = createBrowserRouter([
    {
        path: "/",
        element: <IntroView />,
        // errorElement: <div>Not found</div>,
    },
    {
        path: "/activities",
        element: <ActivitiesView />,
    },
    {
        path: "/activities/:id",
        element: <SingleActivityView />,
    },
]);

const App = () => {
    //TODO: rekisteröintintisivu jos !userExists
    const { user, loading, userExists, register } = useUserFetching();

    console.log("in app: ", user, userExists);

    if (loading) return <div>Loading</div>;

    if (!userExists) return <Register register={register} />;

    return (
        <UserContext.Provider value={user}>
            <RouterProvider router={router} />
        </UserContext.Provider>
    );
};

export default App;
