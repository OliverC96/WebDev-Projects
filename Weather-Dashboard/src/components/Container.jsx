import React, { useState, useEffect, useContext } from "react";
import { convertToLocation, convertToCoordinates, PROVINCE_CODES } from "../utils/GeocodingUtils";
import axios from "axios";
import CurrentWeather from "./CurrentWeather";
import { LoadingContext } from "./LoadingContext";
import Forecast from "./Forecast";
import Header from "./Header";
import Footer from "./Footer";
import "../index.css";

// Primary component which interacts with the API service, and updates subcomponents accordingly
export default function Container(props) {

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

    const { loading, setLoading } = useContext(LoadingContext);

    // Queries for the current weather forecast, and projected future forecasts from OpenWeatherMap API
    const fetchWeather = async () => {

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
                setTimeout(retrieveCurrentLocation, 1000);  // Artificially extend loading time for a smoother UI experience
            })
            .catch((err) => {
                console.log("Error - failed to retrieve weather data from OpenWeatherMap API:");
                console.log(err);
            });

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
                setLoading(false);
            })
            .catch((err) => {
                console.log("Error - failed to retrieve current location from coordinates:");
                console.log(err);
            });
    }

    // Processes the search bar input, and updates the location object accordingly
    const handleLocationChange = (newLocation) => {
        setLoading(true);
        convertToCoordinates(newLocation)
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data[0] : res.data;
                setLocation({
                    latitude: data.lat,
                    longitude: data.lon,
                    name: data.name,
                    province: PROVINCE_CODES[data.state]
                });
                setLoading(false);
            })
            .catch((err) => {
                console.log("Error - failed to convert input location to coordinates:");
                console.log(err);
            });
    }

    // Sets the initial/default location (user's device position) upon initial mounting of the component
    useEffect(() => {
        setLocation((prev) => {
            return {
                ...prev,
                latitude: props.latitude,
                longitude: props.longitude
            };
        });
    }, []);

    // Fetch weather data from the API whenever the location (latitude and longitude) changes
    useEffect(() => {
        fetchWeather();
    }, [location.latitude, location.longitude]);

    return (
        <div className="max-w p-16 flex flex-col bg-wrapper text-primary text-md font-medium items-center">
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
            {/* Dynamic footer component containing copyright statement */}
            <Footer
                author="Oliver Clennan"
            />
        </div>
    );

}