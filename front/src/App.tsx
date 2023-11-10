import "./App.css";

type Props = {
    moi: string;
};

const App = ({ moi }: Props) => {
    console.log(moi);
    return <div>Tästä tulee hyvä pöhinä</div>;
};

export default App;
