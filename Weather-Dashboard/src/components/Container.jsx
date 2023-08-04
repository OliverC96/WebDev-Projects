import React, { useState, useEffect } from "react";
import "../index.css";
import testWeather from "../data/WeatherData";
import { convertToLocation, convertToCoordinates } from "../utils/GeocodingUtils";
import axios from "axios";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import Header from "./Header";

// Container/Wrapper hook which encloses the weather data components
export default function Container(props) {

    // Retrieving necessary information to interact with the OpenWeatherMap API service
    const WEATHER_ENDPOINT = process.env.REACT_APP_WEATHER_ENDPOINT + "/data/3.0/onecall";
    const API_KEY = process.env.REACT_APP_API_KEY;

    // Keeping track of the currently viewed location coordinates
    const [location, setLocation] = useState({
        latitude: props.latitude,
        longitude: props.longitude,
        name: "",
        country: ""
    });

    // Keeping track of the current weather data
    const [weather, setWeather] = useState({
        current: {},
        daily: [],
        hourly: []
    });

    const [isLoading, setLoading] = useState(true);

    // Queries for the current weather forecast, and projected future forecasts from OpenWeatherMap API
    function fetchWeather() {

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
            })
            .catch((err) => {
                console.log("Error - failed to retrieve weather data from OpenWeatherMap API:");
                console.log(err);
            });

    }

    // Retrieves the current location (city name and country) based on the current pair of coordinates
    function retrieveCurrentLocation() {
        convertToLocation(location.latitude, location.longitude)
            .then((res) => {
                setLocation((prev) => {
                    return {
                        ...prev,
                        name: res.data[0].name,
                        country: res.data[0].country
                    };
                });
            })
            .catch((err) => {
                console.log("Error - failed to retrieve current location from coordinates:");
                console.log(err);
            });
    }

    // Fetch weather data and retrieve the current location upon initial mounting of the Container component
    useEffect(() => {
        // fetchWeather();
        retrieveCurrentLocation();
        setLoading(false);
    }, []);

    return (
        // Delaying rendering of the app until the relevant information has been fetched from the API service
        !isLoading &&
            <div className="max-w p-16 flex flex-col bg-wrapper text-primary text-md font-medium">
                {/* Custom header component containing the title and location search bar */}
                <Header />
                {/* Component displaying the current weather conditions in a 3x3 grid */}
                <CurrentWeather
                    data={testWeather.current}
                    hourlyData={testWeather.hourly}
                    location={location}
                />
                {/* Component displaying an hourly forecast for the next 12 hours */}
                <Forecast
                    data={testWeather.hourly}
                    type="hourly"
                    sunrise={testWeather.current.sunrise}
                    sunset={testWeather.current.sunset}
                />
                {/* Component displaying a weekly forecast for the next 8 days */}
                <Forecast
                    data={testWeather.daily}
                    type="daily"
                />
            </div>
    );

}