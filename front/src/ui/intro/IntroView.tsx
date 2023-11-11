import { Button, VStack } from "@chakra-ui/react";
import UserContext from "../../usercontext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import Avatar from "../account/Avatar";
import { motion } from "framer-motion";

const IntroView = () => {
    const user = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <VStack justifyContent="center" textAlign="center" height="100%" background="background.100">
            <Avatar animal={"dog"} />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <h2 style={{ fontWeight: "bold" }}>What are we doing today, {user?.name}?</h2>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>
                <Button colorScheme="blue" onClick={() => navigate("/activities")}>
                    Continue
                </Button>
            </motion.div>
        </VStack>
    );
};

export default IntroView;
