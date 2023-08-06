import React, { useState, useEffect } from "react";
import Container from "./Container";
import { LoadingProvider } from "./LoadingContext";
import Loader from "./Loader";
import "../index.css";

// High-level wrapper component responsible for retrieving the user's location before rendering the remainder of the application
export default function App() {

    // Keeping track of the user's current position
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null
    });

    // Accessing the user's current position in geographical coordinates
    const setInitialCoordinates = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            });
        }
        else {
            console.log("Failed to fetch device geolocation.");
        }
    }

    // Retrieve the user's current position upon initial loading of the application
    useEffect(() => {
        setInitialCoordinates();
    }, []);

    return (
        location.longitude && location.latitude
            ?
                // Render the application
                <LoadingProvider>
                    <Container {...location} />
                </LoadingProvider>
            :
                // Display a loader component while the user's position is being fetched
                <Loader message="Fetching your location..." />
    );

}