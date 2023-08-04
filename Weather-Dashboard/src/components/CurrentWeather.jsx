import React from "react";
import WeatherSector from "./WeatherSector";
import { LuWind, LuThermometerSun, LuSun, LuEye } from "react-icons/lu";
import { FaCloudscale } from "react-icons/fa"
import { BsDropletHalf } from "react-icons/bs";
import { getUVSeverity, getVisibilitySeverity, convertToKmH, convertToKm } from "../utils/MeasurementUtils";
import { getExtrema } from "../utils/MeasurementUtils";

// Functional component which encapsulates the current weather section
export default function CurrentWeather(props) {

    return (
        <div className="w-full rounded-md bg-main p-8">
            <div className="flex justify-between">
                <h1 className="mb-6 text-xl"> Current Weather </h1>
                <h1 className="mb-6 text-xl"> {props.location.name}, {props.location.country} </h1>
            </div>
            <div className="grid grid-cols-3 gap-5 ">
                {/* Temperature section */}
                <WeatherSector
                    type="Temperature"
                    units="&deg;C"
                    value={props.data.feels_like}
                    icon={<LuSun className="w-8 h-8" />}
                    extrema={getExtrema("temp", props.hourlyData)}
                    status={props.data.weather[0].main}
                />
                {/* Wind section */}
                <WeatherSector
                    type="Wind"
                    units="km/h"
                    value={convertToKmH(props.data.wind_speed)}
                    icon={<LuWind className="w-8 h-8" />}
                    extrema={getExtrema("wind_speed", props.hourlyData)}
                    direction={props.data.wind_deg}
                />
                {/* Humidity section */}
                <WeatherSector
                    type="Humidity"
                    units="%"
                    value={props.data.humidity}
                    icon={<BsDropletHalf className="h-8 w-8" />}
                    extrema={getExtrema("humidity", props.hourlyData)}
                />
                {/* UVI section */}
                <WeatherSector
                    type="UV Index"
                    units={getUVSeverity(props.data.uvi * 10)}
                    value={props.data.uvi * 10}
                    icon={<LuThermometerSun className="w-8 h-8" />}
                    extrema={getExtrema("uvi", props.hourlyData)}
                />
                {/* Atmospheric pressure section */}
                <WeatherSector
                    type="Pressure"
                    units="hPa"
                    value={props.data.pressure}
                    icon={<FaCloudscale className="w-8 h-8" />}
                    extrema={getExtrema("pressure", props.hourlyData)}
                />
                {/* Surface visibility section */}
                <WeatherSector
                    type="Visibility"
                    units="km"
                    value={convertToKm(props.data.visibility)}
                    icon={<LuEye className="w-8 h-8" />}
                    extrema={getExtrema("visibility", props.hourlyData)}
                    status={getVisibilitySeverity(convertToKm(props.data.visibility))}
                />
            </div>
        </div>
    );

}