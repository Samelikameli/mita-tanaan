import "./App.css";

import type { FirebaseApp } from "firebase/app";

type Props = {
    app: FirebaseApp;
};

const App = ({ app }: Props) => {
    console.log(app);

    return <div>Tästä tulee hyvä pöhinä</div>;
};

export default App;
