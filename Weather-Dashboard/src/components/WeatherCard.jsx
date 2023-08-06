import React from "react";

// Functional component which represents weather data for a single unit of time (hourly or daily)
export default function WeatherCard(props) {

    // Declaring relevant constants
    const WeatherIcon = props.icon;
    const currentHour = props.id === 0 && props.type === "hourly";

    // Defining alternative colour themes for icons based on weather conditions
    const getIconColour = () => {
        if (currentHour) {
            return "text-green-med";
        }
        else if (props.sunrise || props.sunset) {
            return "text-night-salmon";
        }
        else if (props.night) {
            return "text-blue-dark";
        }
        else {
            return "text-primary";
        }
    }

    return (
        <div className={`flex flex-col ${props.type === "hourly" ? "w-1/12" : "w-1/8"} items-center ${getIconColour()}`}>
            <h1 className="mb-2"> {currentHour ? "Now" : props.time} </h1>
            <WeatherIcon className="w-14 h-14" />
            {props.type === "hourly"
                ?
                    <h1 className="mt-2"> {props.temps[0]}&deg; </h1>
                :
                    <div className="mt-2 flex">
                        <h1 className=""> {props.temps[1]}&deg; </h1>
                        <h1 className="ml-1 text-gray-500"> {props.temps[0]}&deg; </h1>
                    </div>
            }
        </div>
    );

}