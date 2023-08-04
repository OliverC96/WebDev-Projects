import React, { useState, useEffect } from "react";
import { usePosition } from "use-position";
import Container from "./Container";

export default function App() {

    const [isLoading, setLoading] = useState(false);
    const [userLocation, setUserLocation] = useState({
        latitude: 50.90074,
        longitude: -114.027585
    });

    // Access the user's current position in geographical coordinates
    // const { latitude: lat, longitude: long, error: err } = usePosition();
    //
    // Update the user's location upon initial mounting of the App component
    // useEffect(() => {
    //     if (lat && long && !err) {
    //         setUserLocation({
    //             latitude: lat,
    //             longitude: long
    //         });
    //         setLoading(false);
    //     }
    // }, [err, lat, long]);

    return (
        // Delay mounting of the Container component until the current location has been successfully retrieved
        !isLoading &&
            <Container {...userLocation} />
    );

}