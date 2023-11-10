import { Button } from "@chakra-ui/react";
import "./App.css";
import { useUser } from "./controllers/user.tsx";
import Register from "./ui/account/register.tsx";
import UserContext from "./usercontext.tsx";

const App = () => {
    //TODO: rekisteröintintisivu jos !userExists

    const { user, loading, userExists, register } = useUser();

    console.log("in app: ", user, userExists);

    if (loading) return <div>Loading</div>;

    if (!userExists) return <Register register={register} />;

    return (
        <UserContext.Provider value={user}>
            <div>
                Tästä tulee hyvä pöhinä Moi {user?.name}
                <Button colorScheme="blue">Button</Button>
            </div>
        </UserContext.Provider>
    );
};

export default App;
