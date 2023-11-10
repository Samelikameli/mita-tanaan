import { Button } from "@chakra-ui/react";
import "./App.css";

import type { FirebaseApp } from "firebase/app";

type Props = {
    app: FirebaseApp;
};

const App = ({ app }: Props) => {
    console.log(app);

    return <div>
        Tästä tulee hyvä pöhinä
        <Button colorScheme="blue">Button</Button>
    </div>;
};

export default App;
