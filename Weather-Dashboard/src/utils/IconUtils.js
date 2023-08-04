import {
    WiDayCloudy,
    WiDaySunny,
    WiNightClear,
    WiNightAltCloudy,
    WiCloud,
    WiCloudy,
    WiShowers,
    WiNightAltShowers,
    WiDayRain,
    WiNightAltRain,
    WiDayThunderstorm,
    WiNightAltThunderstorm,
    WiSnow,
    WiNightAltSnow,
    WiDayFog,
    WiNightFog
} from "react-icons/wi"

// Maps OpenWeatherMap API icon codes to alternative icons from the Weather Icon react library
const iconMappings = {
    "01d": WiDaySunny,
    "01n": WiNightClear,
    "02d": WiDayCloudy,
    "02n": WiNightAltCloudy,
    "03d": WiCloud,
    "03n": WiCloud,
    "04d": WiCloudy,
    "04n": WiCloudy,
    "09d": WiShowers,
    "09n": WiNightAltShowers,
    "10d": WiDayRain,
    "10n": WiNightAltRain,
    "11d": WiDayThunderstorm,
    "11n": WiNightAltThunderstorm,
    "13d": WiSnow,
    "13n": WiNightAltSnow,
    "50d": WiDayFog,
    "50n": WiNightFog
};

export default iconMappings;