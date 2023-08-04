import axios from "axios";

// Declaring relevant API-related constants
const GEOCODING_ENDPOINT = process.env.REACT_APP_WEATHER_ENDPOINT + "/geo/1.0";
const COUNTRY_CODE = process.env.REACT_APP_COUNTRY_CODE;
const API_KEY = process.env.REACT_APP_API_KEY;

// Helper function which determines the validity of the provided zip code
// Note: only validates Canadian zip codes, based on the following criteria: https://tinyurl.com/yau3euwr
const validateZipCode = (zipCode) => {
    zipCode = zipCode.replace(/\s+/g, "");      // Trim whitespace from the zip code
    zipCode.forEach((val, index) => {
        if (index % 2 === 0) {                  // Ensure that every even-indexed character is an uppercase letter
            if (val !== val.toUpperCase()) {
                return false;
            }
        }
        else {                                  // Ensure that every odd-indexed character is a digit
            if (val < '0' || val > '9') {
                return false;
            }
        }
    });
    return true;
}

// Transforms a valid zip code or city name into an equivalent pair of geographical coordinates ('direct geocoding')
const convertToCoordinates = (location) => {

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
            limit: 10
        };

    // Initiating the direct geocoding request
    axios.get(GEOCODING_ENDPOINT + isZip ? "/zip" : "/direct", {params})
        .then((res) => {
            console.log(res);
            const data = isZip ? res : res[0];
            return {
                latitude: data.lat,
                longitude: data.long,
                name: data.name,
                country: data.country
            };
        })
        .catch((err) => {
            console.log("Error - geocoding request failed:");
            console.log(err);
        });

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
    convertToCoordinates
}