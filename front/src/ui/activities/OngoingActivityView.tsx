import { motion } from "framer-motion";
import Map, { Marker } from "react-map-gl";

import * as mapboxgl from "mapbox-gl";
import { useState } from "react";
import { Box, Card, CardBody } from "@chakra-ui/react";

import useAllUsersLocation from "../../controllers/location.ts";
import Avatar from "../account/Avatar.tsx";

import "./OngoingActivity.css";

const OngoingActivityView = () => {
    const [show, setShow] = useState(0);
    const locations = useAllUsersLocation();

    return (
        <Card style={{ height: "100%" }}>
            <CardBody style={{ height: "100%" }}>
                <Box style={{ height: "100%" }}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: show }} exit={{ opacity: 0 }} style={{ height: "100%" }}>
                        <Map
                            onLoad={() => setShow(1)}
                            mapLib={mapboxgl}
                            style={{ width: "100%", height: "100%" }}
                            initialViewState={{ longitude: 25, latitude: 60, zoom: 3.5 }}
                            mapboxAccessToken={"pk.eyJ1IjoidmVlZXRpIiwiYSI6ImNrMWdwandlODBkMHIzbmw4a241Y3hubWgifQ.4c85YNclymjgZ0Fw8pm4Ng"}
                            mapStyle={"mapbox://styles/veeeti/clotyihro00s701nzcxkx8mho"}>
                            {locations.map(user => {
                                return (
                                    <Marker key={user.id} longitude={user.location.longitude} latitude={user.location.latitude}>
                                        {/*<div style={{ width: 100, height: 100, background: "solid orange" }} />*/}
                                        <Avatar key={user.id} animal={user.avatar} small={true} />
                                    </Marker>
                                );
                            })}
                        </Map>
                    </motion.div>
                </Box>
            </CardBody>
        </Card>
    );
};

export default OngoingActivityView;
