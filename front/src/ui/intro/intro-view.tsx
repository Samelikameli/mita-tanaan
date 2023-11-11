import { Button, VStack } from "@chakra-ui/react";
import { useUser } from "../../usercontext";
import { useNavigate } from "react-router-dom";

const IntroView = () => {
    const user = useUser();
    const navigate = useNavigate();

    return (
        <VStack justifyContent="center" textAlign="center" height="100%" background="background.100">
            <h2 style={{ fontWeight: "bold" }}>What are we doing today, {user?.name}?</h2>
            <Button colorScheme="blue" onClick={() => navigate("/activities")}>
                Continue
            </Button>
        </VStack>
    );
};

export default IntroView;