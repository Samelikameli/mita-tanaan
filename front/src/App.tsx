import { Button } from "@chakra-ui/react";
import "./App.css";
import { useUser } from "./controllers/user.tsx";
import Register from "./ui/account/register.tsx";

const App = () => {
    //TODO: rekisteröintintisivu jos !userExists
    const { user, loading, userExists } = useUser();

    if (loading) return <div>Loading</div>;

    if (!userExists) return <Register />;

    return (
        <div>
            Tästä tulee hyvä pöhinä
            <Button colorScheme="blue">Button</Button>
        </div>
    );
};

export default App;
