import React, { useContext } from "react";
import WeatherSector from "./WeatherSector";
import SectorSkeleton from "./SectorSkeleton";
import {
    LuWind,
    LuThermometerSun,
    LuSun,
    LuEye
} from "react-icons/lu";
import { FaCloudscale } from "react-icons/fa"
import { BsDropletHalf } from "react-icons/bs";
import {
    getUVSeverity,
    getVisibilitySeverity,
    convertToKmH,
    convertToKm
} from "../utils/MeasurementUtils";
import { getExtrema } from "../utils/MeasurementUtils";
import Skeleton from "@mui/material/Skeleton";
import { LoadingContext } from "./LoadingContext";

// Functional component which encapsulates the current weather section
export default function CurrentWeather(props) {

    const { loading } = useContext(LoadingContext);

    return (
        <div className="w-full rounded-md bg-main p-8">
            <div className="flex justify-between">
                <h1 className="mb-6 text-xl"> Current Weather </h1>
                {loading
                    ?
                        <Skeleton sx={{ bgcolor: '#1D2936' }} variant="text" width={130} height={45} />
                    :
                        <h1 className="mb-6 text-xl"> {props.location.name}, {props.location.province} </h1>
                }
            </div>
            <div className="grid grid-cols-3 gap-5 ">
                {loading
                    ?
                        // If the application is currently fetching data, render the simplified skeleton structure
                        <>
                            <SectorSkeleton type="Temperature" />
                            <SectorSkeleton type="Wind" />
                            <SectorSkeleton type="Humidity" />
                            <SectorSkeleton type="UV Index" />
                            <SectorSkeleton type="Pressure" />
                            <SectorSkeleton type="Visibility" />
                        </>
                    :
                        // Otherwise, render the complete structure with the current weather data
                        <>
                            {/* Temperature section */}
                            <WeatherSector
                                type="Temperature"
                                units="&deg;C"
                                value={props.data.temp}
                                icon={<LuSun className="w-8 h-8" />}
                                extrema={getExtrema("temp", props.hourlyData, props.data.temp)}
                                status={props.data.weather[0].main}
                            />
                            {/* Wind section */}
                            <WeatherSector
                                type="Wind"
                                units="km/h"
                                value={convertToKmH(props.data.wind_speed)}
                                icon={<LuWind className="w-8 h-8" />}
                                extrema={getExtrema("wind_speed", props.hourlyData, props.data.wind_speed)}
                                direction={props.data.wind_deg}
                            />
                            {/* Humidity section */}
                            <WeatherSector
                                type="Humidity"
                                units="%"
                                value={props.data.humidity}
                                icon={<BsDropletHalf className="h-8 w-8" />}
                                extrema={getExtrema("humidity", props.hourlyData, props.data.humidity)}
                            />
                            {/* UVI section */}
                            <WeatherSector
                                type="UV Index"
                                units={getUVSeverity(props.data.uvi)}
                                value={props.data.uvi}
                                icon={<LuThermometerSun className="w-8 h-8" />}
                                extrema={getExtrema("uvi", props.hourlyData, props.data.uvi)}
                            />
                            {/* Atmospheric pressure section */}
                            <WeatherSector
                                type="Pressure"
                                units="hPa"
                                value={props.data.pressure}
                                icon={<FaCloudscale className="w-8 h-8" />}
                                extrema={getExtrema("pressure", props.hourlyData, props.data.pressure)}
                            />
                            {/* Surface visibility section */}
                            <WeatherSector
                                type="Visibility"
                                units="km"
                                value={convertToKm(props.data.visibility)}
                                icon={<LuEye className="w-8 h-8" />}
                                extrema={getExtrema("visibility", props.hourlyData, props.data.visibility)}
                                status={getVisibilitySeverity(convertToKm(props.data.visibility))}
                            />
                        </>
                }
            </div>
        </div>
    );

}