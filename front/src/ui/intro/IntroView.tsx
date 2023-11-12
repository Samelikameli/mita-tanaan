import { Button, VStack } from "@chakra-ui/react";
import UserContext from "../../usercontext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { motion } from "framer-motion";
import ViewFadeWrapper from "../ViewFadeWrapper";

const IntroView = () => {
    const user = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <ViewFadeWrapper>
            <VStack justifyContent="center" textAlign="center" height="100%" background="background.100" padding="5">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>
                    <h2 style={{ fontWeight: "boldest", fontSize: "2.5rem", lineHeight: 1 }}>What are you going to do today?</h2>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}>
                    <Button colorScheme="blue" variant="outline" onClick={() => navigate("/home")} marginTop="5" size="sm">
                        Continue
                    </Button>
                </motion.div>
            </VStack>
        </ViewFadeWrapper>
    );
};

export default IntroView;
