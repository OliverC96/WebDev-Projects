import axios from "axios";

// Declaring relevant API-related constants
const GEOCODING_ENDPOINT = process.env.REACT_APP_WEATHER_ENDPOINT + "/geo/1.0";
const COUNTRY_CODE = process.env.REACT_APP_COUNTRY_CODE;
const API_KEY = process.env.REACT_APP_API_KEY;

// A mapping of Canadian province names to their corresponding (abbreviated) province codes
const PROVINCE_CODES = {
    "Alberta": "AB",
    "British Columbia": "BC",
    "Manitoba": "MB",
    "Ontario": "ON",
    "Quebec": "QC",
    "Nova Scotia": "NS",
    "New Brunswick": "NB",
    "Prince Edward Island": "PE",
    "Saskatchewan": "SK",
    "Newfoundland and Labrador": "NL",
    "Northwest Territories": "NW",
    "Yukon": "YT",
    "Nunavut": "NU"
}

// Helper function which determines the validity of the provided zip code
// Note: only validates Canadian zip codes, based on the following criteria: https://tinyurl.com/yau3euwr
const validateZipCode = (zipCode) => {
    let res = true;
    zipCode = zipCode.replace(/\s+/g, "");      // Trim whitespace from the zip code
    zipCode.split("").forEach((val, index) => {
        if (index % 2 === 0) {                  // Ensure that every even-indexed character is an uppercase letter
            if (val !== val.toUpperCase()) {
                res = false;
            }
        }
        else {                                  // Ensure that every odd-indexed character is a digit
            if (val < '0' || val > '9') {
                res = false;
            }
        }
    });
    return res;
}

// Transforms a valid zip code or city name into an equivalent pair of geographical coordinates ('direct geocoding')
const convertToCoordinates = async (location) => {

    // Configuring the query parameters
    const isZip = validateZipCode(location);
    const params = isZip
        ?
        {
            zip: location + "," + COUNTRY_CODE,
            appid: API_KEY
        }
        :
        {
            q: location + "," + COUNTRY_CODE,
            appid: API_KEY,
            limit: 3
        };

    // Initiating the direct geocoding request
    return await axios.get(GEOCODING_ENDPOINT + (isZip ? "/zip" : "/direct"), {params});

}

// Retrieves the location (city/area name) associated with a pair of geographical coordinates ('reverse geocoding')
const convertToLocation = async (lat, long) => {

    // Configuring the query parameters
    const params = {
        lat: lat,
        lon: long,
        appid: API_KEY,
        limit: 5
    }

    return await axios.get(GEOCODING_ENDPOINT + "/reverse", {params});

}

export {
    convertToLocation,
    convertToCoordinates,
    PROVINCE_CODES
}