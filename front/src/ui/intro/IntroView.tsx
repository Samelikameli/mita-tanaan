import { Button, VStack } from "@chakra-ui/react";
import UserContext from "../../usercontext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Avatar from "../account/Avatar";

const IntroView = () => {
    const user = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <VStack justifyContent="center" textAlign="center" height="100%" background="background.100">
            <Avatar animal={"dog"} />
            <h2 style={{ fontWeight: "bold" }}>What are we doing today, {user?.name}?</h2>
            <Button colorScheme="blue" onClick={() => navigate("/activities")}>
                Continue
            </Button>
        </VStack>
    );
};

export default IntroView;
