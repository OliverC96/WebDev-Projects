import { formatHour } from "./DateUtils";

// Retrieves the UV severity rating according to the Environment and Climate Change Canada UV Scale:
// https://www.canada.ca/en/environment-climate-change/services/weather-health/uv-index-sun-safety/about.html
const getUVSeverity = (UVIndex) => {
    if ((0 <= UVIndex) && (UVIndex <= 2)) {
        return "Low";
    } else if (UVIndex <= 5) {
        return "Moderate";
    } else if (UVIndex <= 7) {
        return "High";
    } else if (UVIndex <= 10) {
        return "Very High";
    } else {
        return "Extreme"
    }
}

// Maps UV Index severity ratings to colours on the severity scale
const getUVColour = (UVIndex) => {
    if ((0 <= UVIndex) && (UVIndex <= 2)) {
        return "text-uvi-low";
    } else if (UVIndex <= 5) {
        return "text-uvi-moderate";
    } else if (UVIndex <= 7) {
        return "text-uvi-high";
    } else if (UVIndex <= 10) {
        return "text-uvi-very-high";
    } else {
        return "text-uvi-extreme";
    }
}

// Retrieves the current visibility status/severity according to https://en.wikipedia.org/wiki/Visibility
const getVisibilitySeverity = (visibility) => {
    if ((0 <= visibility) && (visibility < 1)) {
        return "Fog";
    }
    else if (visibility <= 2) {
        return "Mist";
    }
    else if (visibility <= 5) {
        return "Haze";
    }
    else {
        return "Clear";
    }
}

// Converts the given measurement in m/s to an equivalent quantity in km/h
const convertToKmH = (metresPerSecond) => {
    return metresPerSecond * 3.6;
}

// Converts the given measurement in m to an equivalent quantity in km
const convertToKm = (metres) => {
    return metres / 1000;
}

// Retrieves the extrema (min and max vals) of the provided type (field) in the given set of hourly weather data
const getExtrema = (type, data) => {
    const firstHour = data[0];
    let min = {
        val: firstHour[type],
        hour: formatHour(new Date(firstHour.dt * 1000))
    }
    let max = {
        val: firstHour[type],
        hour: formatHour(new Date(firstHour.dt * 1000))
    }
    data.slice(1, 24).forEach((hour) => {
        const currVal = hour[type];
        const currTime = new Date(hour.dt * 1000);
        if (currVal < min.val) {
            min = {
                val: currVal,
                hour: formatHour(currTime)
            }
        }
        else if (currVal > max.val) {
            max = {
                val: currVal,
                hour: formatHour(currTime)
            }
        }
    });
    if (type === "wind_speed") {
        min.val = convertToKmH(min.val);
        max.val = convertToKmH(max.val);
    }
    else if (type === "visibility") {
        min.val = convertToKm(min.val);
        max.val = convertToKm(max.val);
    }
    return {
        "min": min,
        "max": max
    };
}

// Computes the ratio between the current value, and the maximum daily value
const getMeasurementRatio = (minVal, currVal, maxVal) => {
    const length = maxVal - minVal;
    const position = currVal - minVal;
    const ratio = Math.round((position / length) * 100);
    if (length < 2) {           // If the variance between min and max is negligible, display the position arrow at halfway
        return 50;
    }
    else if (ratio > 95) {      // Minor adjustment to improve styling when curr val is very close to the max val
        return 95;
    }
    return ratio;               // Otherwise, return the un-adjusted ratio (position of current val within the range of [min, max])
}

// Converts the given measurement in degrees to its corresponding cardinal direction
// Courtesy of https://gist.github.com/RobertSudwarts/acf8df23a16afdb5837f
const convertToCardinalDirection = (degrees) => {
    const CARDINAL_DIRECTIONS = [
        "N", "N/NE", "NE", "E/NE", "E", "E/SE", "SE", "S/SE",
        "S", "S/SW", "SW", "W/SW", "W", "W/NW", "N/W", "N/NW"
    ];
    const index = Math.round(degrees / 22.5);
    return CARDINAL_DIRECTIONS[index % 16];

}

export {
    getUVSeverity,
    getUVColour,
    getVisibilitySeverity,
    getMeasurementRatio,
    getExtrema,
    convertToCardinalDirection,
    convertToKmH,
    convertToKm,
}