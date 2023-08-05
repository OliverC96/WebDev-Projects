import React, { useState, useEffect } from "react";
import { convertToLocation, convertToCoordinates, PROVINCE_CODES } from "../utils/GeocodingUtils";
import axios from "axios";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import Header from "./Header";
import Loader from "./Loader";
import "../index.css";

// Highest-level functional component which interacts with the API service, and updates subcomponents accordingly
export default function App() {

    // Retrieving necessary information to interact with the OpenWeatherMap API service
    const WEATHER_ENDPOINT = process.env.REACT_APP_WEATHER_ENDPOINT + "/data/3.0/onecall";
    const API_KEY = process.env.REACT_APP_API_KEY;

    // Keeping track of the currently viewed location coordinates
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        name: "",
        province: ""
    });

    // Keeping track of the current weather data
    const [weather, setWeather] = useState({
        current: {},
        daily: [],
        hourly: []
    });

    const [isLoading, setLoading] = useState(true);

    // Queries for the current weather forecast, and projected future forecasts from OpenWeatherMap API
    const fetchWeather = () => {

        if (!location.latitude || !location.longitude) {
            return;
        }
        setLoading(true);

        // Configuring the query parameters
        const params = {
            lat: location.latitude,
            lon: location.longitude,
            lang: "en",
            units: "metric",
            exclude: "minutely",
            appid: API_KEY
        }

        // Initiating the GET request to the weather endpoint
        axios.get(WEATHER_ENDPOINT, {params})
            .then((res) => {
                setWeather({
                    current: res.data.current,
                    daily: res.data.daily,
                    hourly: res.data.hourly
                });
                retrieveCurrentLocation();
                setLoading(false);
            })
            .catch((err) => {
                console.log("Error - failed to retrieve weather data from OpenWeatherMap API:");
                console.log(err);
            });

    }

    // Accessing the user's current position in geographical coordinates
    const setInitialCoordinates = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation((prev) => {
                    return {
                        ...prev,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                });
            });
        }
        else {
            console.log("Failed to fetch device geolocation.");
        }
    }

    // Retrieves the current location (city name and country) based on the current pair of coordinates
    const retrieveCurrentLocation = () => {
        convertToLocation(location.latitude, location.longitude)
            .then((res) => {
                setLocation((prev) => {
                    return {
                        ...prev,
                        name: res.data[0].name,
                        province: PROVINCE_CODES[res.data[0].state]
                    };
                });
            })
            .catch((err) => {
                console.log("Error - failed to retrieve current location from coordinates:");
                console.log(err);
            });
    }

    // Processes the search bar input, and updates the location object accordingly
    const handleLocationChange = (newLocation) => {
        convertToCoordinates(newLocation)
            .then((res) => {
                console.log(res);
                const data = Array.isArray(res.data) ? res.data[0] : res.data;
                setLocation({
                    latitude: data.lat,
                    longitude: data.lon,
                    name: data.name,
                    province: PROVINCE_CODES[data.state]
                });
            })
            .catch((err) => {
                console.log("Error - failed to convert input location to coordinates:");
                console.log(err);
            });
    }

    // Retrieve the user's current position upon initial loading of the application
    useEffect(() => {
        setInitialCoordinates();
    }, []);

    // Fetch weather data from the API whenever the location (latitude and longitude) changes
    useEffect(() => {
        fetchWeather();
    }, [location.latitude, location.longitude]);

    return (
        location.longitude && location.latitude
            ?
                // Delaying rendering of the app until the relevant information has been fetched from the API service
                !isLoading &&
                    <div className="max-w p-16 flex flex-col bg-wrapper text-primary text-md font-medium">
                        {/* Custom header component containing the title and location search bar */}
                        <Header
                            changeLocation={handleLocationChange}
                        />
                        {/* Component displaying the current weather conditions in a 3x3 grid */}
                        <CurrentWeather
                            data={weather.current}
                            hourlyData={weather.hourly}
                            location={location}
                        />
                        {/* Component displaying an hourly forecast for the next 12 hours */}
                        <Forecast
                            data={weather.hourly}
                            type="hourly"
                            sunrise={weather.current.sunrise}
                            sunset={weather.current.sunset}
                        />
                        {/* Component displaying a weekly forecast for the next 8 days */}
                        <Forecast
                            data={weather.daily}
                            type="daily"
                        />
                    </div>
            :
                // Display a loader component while the user's position is being fetched
                <Loader message="Fetching your location..." />
    );

}