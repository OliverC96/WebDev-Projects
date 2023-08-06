import React, { useContext } from "react";
import WeatherCard from "./WeatherCard";
import iconMappings from "../utils/IconUtils";
import { LoadingContext } from "./LoadingContext";
import Skeleton from "@mui/material/Skeleton";
import {
    formatHour,
    formatDay,
    isSunset,
    isSunrise,
    isNight
} from "../utils/DateUtils";
import {
    WiCloudyGusts,
    WiNightAltCloudyGusts,
    WiSunrise,
    WiSunset
} from "react-icons/wi";

// Functional component which represents a weather forecast container (either weekly or hourly)
export default function Forecast(props) {

    // Declaring relevant constants for the forecast component
    const sectionTitle = props.type === "hourly" ? "12-Hour Forecast" : "8-Day Forecast";
    const WIND_THRESHOLD = 35.00;

    const { loading } = useContext(LoadingContext);

    // Helper method which effectively extends the number of weather icons supported (outside the ones mapped from OpenWeatherMap icon codes)
    // Provides support for wind/gust icon (based on the pre-defined wind threshold), sunrise and sunset icons, and night-themed icons
    const fetchIcon = (defaultIcon, windSpeed, currTime) => {
        if (isSunrise(currTime, props.sunrise)) {
            return WiSunrise;
        }
        else if (isSunset(currTime, props.sunset)) {
            return WiSunset;
        }
        else if (windSpeed >= WIND_THRESHOLD) {
            return isNight(currTime, props.sunrise, props.sunset) ? WiNightAltCloudyGusts : WiCloudyGusts;
        }
        else {
            return iconMappings[defaultIcon];
        }
    }

    return (
        <div className="w-full rounded-md bg-main p-8 mt-4 flex flex-col">
            <h1 className="mb-6 text-xl"> {sectionTitle} </h1>
            <div className="flex justify-around">
                {loading
                    ?
                        // If the application is currently fetching data, render the simplified skeleton structure
                        <>
                            {Array.from({length: `${props.type === "hourly" ? 12 : 8}`}, (_, i) => i + 1).map((index) => (
                                <div key={index} className={`flex flex-col ${props.type === "hourly" ? "w-1/12" : "w-1/8"} items-center gap-2`}>
                                    <Skeleton sx={{ bgcolor: '#edf6f9' }} variant="text" width={40} height={30} />
                                    <Skeleton sx={{ bgcolor: '#edf6f9' }} variant="circular" width={45} height={45} />
                                    <Skeleton sx={{ bgcolor: '#edf6f9' }} variant="text" width={props.type === "hourly" ? 35 : 55} height={30} />
                                </div>
                            ))}
                        </>
                    :
                        // Otherwise, render the complete structure with the forecast data
                        <>
                            {props.data.slice(0, 12).map((element, index) => {
                                const currentWeather = element.weather[0];
                                const currentTime = new Date(element.dt * 1000);
                                const formattedTime = props.type === "hourly" ? formatHour(currentTime) : formatDay(currentTime);
                                const DefaultIcon = iconMappings[currentWeather.icon];
                                const AltIcon = fetchIcon(currentWeather.icon, element.wind_speed, element.dt);
                                return <WeatherCard
                                    key={index}
                                    id={index}
                                    type={props.type}
                                    wind={element.wind_speed}
                                    time={formattedTime}
                                    temps={props.type === "hourly" ? [Math.round(element.temp)] : [Math.round(element.temp.min), Math.round(element.temp.max)]}
                                    icon={props.type === "hourly" ? AltIcon : DefaultIcon}
                                    iconDesc={currentWeather.description}
                                    sunrise={isSunrise(element.dt, props.sunrise)}
                                    sunset={isSunset(element.dt, props.sunset)}
                                    night={isNight(element.dt, props.sunrise, props.sunset)}
                                />
                            })}
                        </>
                }
            </div>
        </div>
    )

}