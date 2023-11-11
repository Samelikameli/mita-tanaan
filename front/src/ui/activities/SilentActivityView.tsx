import { Text } from "@chakra-ui/react";
import Avatar from "../account/Avatar.tsx";

const SilentActivityView = () => {
    return (
        <div
            style={{
                background: "darkgray",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}>
            <Avatar animal={"dog"}></Avatar>
            <Text style={{ fontWeight: "bold", fontSize: "90%", marginTop: "10px" }}>Have fun with your friends!</Text>
        </div>
    );
};

export default SilentActivityView;
