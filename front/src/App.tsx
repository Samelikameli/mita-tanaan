import { Button } from "@chakra-ui/react";
import "./App.css";

type Props = {
  moi: string;
};

const App = ({ moi }: Props) => {
  return (
    <div>
      Tästä tulee hyvä pöhinä
      <Button colorScheme="blue">Button</Button>
    </div>
  );
};

export default App;
