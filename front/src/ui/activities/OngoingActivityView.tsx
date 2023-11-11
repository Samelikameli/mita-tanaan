import { motion } from "framer-motion";
import Map, { Marker } from "react-map-gl";

import * as mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import { Box, Card, CardBody, GridItem, Flex, Text, CardHeader } from "@chakra-ui/react";

import useAllUsersLocation from "../../controllers/location.ts";
import Avatar from "../account/Avatar.tsx";

import "./OngoingActivity.css";
import { useActivities } from "../../controllers/activities.ts";
import { timeModeToEmoji } from "../utils.tsx";
import { useNavigate } from "react-router-dom";

const OngoingActivityView = () => {
    const { data: activities, isLoading } = useActivities();

    const [show, setShow] = useState(0);
    const locations = useAllUsersLocation();
    const navigate = useNavigate();

    const activity = isLoading ? null : activities[0];
    const timeModeToEmoji1 = timeModeToEmoji(activity?.time || null);

    useEffect(() => {
        if (activity?.ongoing) {
            navigate("/silent");
        }
    }, [activity?.ongoing, navigate]);

    if (isLoading) {
        return <p>Loading</p>;
    }

    return (
        <Flex direction={"column"} style={{ height: "100%" }} gap={10}>
            <GridItem flex={"1"} mt={10} mx={4}>
                <Text style={{ fontWeight: "bold" }}>What are we doing today?</Text>
                <Text style={{ fontSize: "120%" }}>Class football match after school</Text>
                <br />
                <Text style={{ fontWeight: "900" }}>When?</Text>
                <Text style={{ fontSize: "120%" }}>
                    {timeModeToEmoji1.emoji} {activity.time === "custom" ? activity.customTime : timeModeToEmoji1.name}
                </Text>
                <br />
                <Text style={{ fontWeight: "900" }}>Who's coming?</Text>
                <Flex>
                    {["dog", "cat", "panda"].map(a => (
                        <Avatar animal={a} small={true} />
                    ))}
                </Flex>
            </GridItem>
            <GridItem flex={"1"} style={{ height: "100%" }}>
                <Card style={{ height: "100%" }}>
                    <CardHeader pb={2}>
                        <Text style={{ fontWeight: "900" }}>Your friends are coming!</Text>
                    </CardHeader>
                    <CardBody style={{ height: "100%" }} pt={0}>
                        <Box style={{ height: "100%" }}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: show }}
                                exit={{ opacity: 0 }}
                                style={{ height: "100%", overflow: "hidden", borderRadius: 10 }}>
                                <Map
                                    onLoad={() => setShow(1)}
                                    mapLib={mapboxgl}
                                    style={{ width: "100%", height: "100%" }}
                                    initialViewState={{ longitude: 25, latitude: 60, zoom: 3.5 }}
                                    mapboxAccessToken={"pk.eyJ1IjoidmVlZXRpIiwiYSI6ImNrMWdwandlODBkMHIzbmw4a241Y3hubWgifQ.4c85YNclymjgZ0Fw8pm4Ng"}
                                    mapStyle={"mapbox://styles/veeeti/clotyihro00s701nzcxkx8mho"}>
                                    {activity.location && (
                                        <Marker key={"location"} longitude={activity.location.longitude} latitude={activity.location.latitude} />
                                    )}
                                    {locations.map(user => (
                                        <Marker key={user.id} longitude={user.location.longitude} latitude={user.location.latitude}>
                                            <Avatar key={user.id} animal={user.avatar} small={true} />
                                        </Marker>
                                    ))}
                                </Map>
                            </motion.div>
                        </Box>
                    </CardBody>
                </Card>
            </GridItem>
        </Flex>
    );
};

export default OngoingActivityView;
