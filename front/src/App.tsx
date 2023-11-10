import { Button } from "@chakra-ui/react";
import "./App.css";

import type { FirebaseApp } from "firebase/app";
import useUser from "./controllers/user.tsx";

type Props = {
    app: FirebaseApp;
};

const App = ({ app }: Props) => {
    console.log(app);
    //TODO: rekisteröintintisivu jos !userExists
    const { user, loading, userExists } = useUser(app);

    if (loading) return <div>Loading</div>;

    return <div>
        Tästä tulee hyvä pöhinä
        <Button colorScheme="blue">Button</Button>
    </div>;
};

export default App;
