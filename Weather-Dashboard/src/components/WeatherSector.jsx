import React from "react";
import {
    getUVColour,
    getMeasurementRatio,
    convertToCardinalDirection
} from "../utils/MeasurementUtils";
import { TbLocation } from "react-icons/tb";
import { BiSolidUpArrow } from "react-icons/bi";

export default function WeatherSector(props) {

    return (
        <div className="bg-secondary p-6 rounded-md flex flex-col gap-6">
            {/* First row - section name, icon, and additional information if applicable */}
            <div className="flex justify-between">
                <div className="flex">
                    {props.icon}
                    <h1 className="text-lg ml-3"> {props.type} </h1>
                </div>
                {(props.type === "Visibility" || props.type === "Temperature") &&
                    <h1 className="text-lg"> {props.status} </h1>
                }
                {props.type === "Wind" &&
                    <div className="flex">
                        <h1 className="mr-2"> {convertToCardinalDirection(props.direction)}, {props.direction}&deg; </h1>
                        <TbLocation className="w-8 h-8" style={{transform: `rotate(${props.direction - 45}deg)`}} />
                    </div>
                }
            </div>
            {/* Second row - the current recorded value (including appropriate units) */}
            <div className="flex">
                <h1 className="text-4xl"> {Math.round(props.value)} </h1>
                <h1 className={`ml-2 text-lg ${props.type === "UV Index" && getUVColour(props.value)}`}> {props.units} </h1>
            </div>
            {/* Third row - a gradient range displaying the position of the current value relative to the daily min and max values */}
            <div className="flex justify-between items-center">
                <div className="text-gray-400 text-sm text-left">
                    <h1> {Math.round(props.extrema.min.val)}{props.type !== "UV Index" && props.units} </h1>
                    <h1> {props.extrema.min.hour} </h1>
                </div>
                <div className="w-2/3 place-self-end">
                    <div className="h-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                    <BiSolidUpArrow className="relative" style={{left: `${getMeasurementRatio(props.extrema.min.val, props.value, props.extrema.max.val)}%`}} />
                </div>
                <div className="text-gray-400 text-sm text-right">
                    <h1> {Math.round(props.extrema.max.val)}{props.type !== "UV Index" && props.units} </h1>
                    <h1> {props.extrema.max.hour} </h1>
                </div>
            </div>
        </div>
    )

}