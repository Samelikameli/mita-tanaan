import "./App.css";
import { useUserFetching } from "./controllers/user.tsx";
import Register from "./ui/account/Register.tsx";
import UserContext from "./usercontext.tsx";
import ActivitiesView from "./ui/activities/ActivitiesView.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SingleActivityView from "./ui/activities/SingleActivityView.tsx";
import IntroView from "./ui/intro/IntroView.tsx";

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
