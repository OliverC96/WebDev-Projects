// Sample OpenWeatherAPI OneCall response (used to avoid excessive API usage during application testing)
const staticWeather = {
    "lat": 50.9007,
    "lon": -114.0276,
    "timezone": "America/Edmonton",
    "timezone_offset": -21600,
    "current": {
        "dt": 1690768893,
        "sunrise": 1690718341,
        "sunset": 1690773953,
        "temp": 24.72,
        "feels_like": 24.29,
        "pressure": 1009,
        "humidity": 40,
        "dew_point": 10.23,
        "uvi": 0.28,
        "clouds": 91,
        "visibility": 10000,
        "wind_speed": 3.28,
        "wind_deg": 119,
        "wind_gust": 5.92,
        "weather": [
            {
                "id": 804,
                "main": "Clouds",
                "description": "overcast clouds",
                "icon": "04d"
            }
        ]
    },
    "hourly": [
        {
            "dt": 1690768800,
            "temp": 24.72,
            "feels_like": 24.29,
            "pressure": 1009,
            "humidity": 40,
            "dew_point": 10.23,
            "uvi": 0.28,
            "clouds": 91,
            "visibility": 10000,
            "wind_speed": 3.28,
            "wind_deg": 119,
            "wind_gust": 5.92,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0.2
        },
        {
            "dt": 1690772400,
            "temp": 23.62,
            "feels_like": 23.19,
            "pressure": 1009,
            "humidity": 44,
            "dew_point": 10.66,
            "uvi": 0,
            "clouds": 87,
            "visibility": 10000,
            "wind_speed": 2.99,
            "wind_deg": 130,
            "wind_gust": 7.37,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0.16
        },
        {
            "dt": 1690776000,
            "temp": 21.41,
            "feels_like": 20.94,
            "pressure": 1010,
            "humidity": 51,
            "dew_point": 10.87,
            "uvi": 0,
            "clouds": 76,
            "visibility": 10000,
            "wind_speed": 2.43,
            "wind_deg": 27,
            "wind_gust": 2.37,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0.16
        },
        {
            "dt": 1690779600,
            "temp": 18.99,
            "feels_like": 18.54,
            "pressure": 1010,
            "humidity": 61,
            "dew_point": 11.31,
            "uvi": 0,
            "clouds": 67,
            "visibility": 10000,
            "wind_speed": 2.36,
            "wind_deg": 349,
            "wind_gust": 2.72,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0.16
        },
        {
            "dt": 1690783200,
            "temp": 16.4,
            "feels_like": 15.92,
            "pressure": 1011,
            "humidity": 70,
            "dew_point": 10.92,
            "uvi": 0,
            "clouds": 56,
            "visibility": 10000,
            "wind_speed": 2.15,
            "wind_deg": 305,
            "wind_gust": 2.4,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0.16
        },
        {
            "dt": 1690786800,
            "temp": 13.5,
            "feels_like": 12.99,
            "pressure": 1013,
            "humidity": 80,
            "dew_point": 9.76,
            "uvi": 0,
            "clouds": 2,
            "visibility": 10000,
            "wind_speed": 2.74,
            "wind_deg": 301,
            "wind_gust": 3.16,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0.11
        },
        {
            "dt": 1690790400,
            "temp": 12.66,
            "feels_like": 12.1,
            "pressure": 1013,
            "humidity": 81,
            "dew_point": 9.25,
            "uvi": 0,
            "clouds": 1,
            "visibility": 10000,
            "wind_speed": 2.95,
            "wind_deg": 324,
            "wind_gust": 3.95,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0.08
        },
        {
            "dt": 1690794000,
            "temp": 11.99,
            "feels_like": 11.44,
            "pressure": 1013,
            "humidity": 84,
            "dew_point": 9.1,
            "uvi": 0,
            "clouds": 1,
            "visibility": 10000,
            "wind_speed": 2.3,
            "wind_deg": 309,
            "wind_gust": 2.55,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690797600,
            "temp": 11.78,
            "feels_like": 11.18,
            "pressure": 1013,
            "humidity": 83,
            "dew_point": 8.77,
            "uvi": 0,
            "clouds": 1,
            "visibility": 10000,
            "wind_speed": 1.79,
            "wind_deg": 282,
            "wind_gust": 1.77,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690801200,
            "temp": 11.7,
            "feels_like": 11.07,
            "pressure": 1013,
            "humidity": 82,
            "dew_point": 8.46,
            "uvi": 0,
            "clouds": 1,
            "visibility": 10000,
            "wind_speed": 1.72,
            "wind_deg": 278,
            "wind_gust": 1.69,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690804800,
            "temp": 11.52,
            "feels_like": 10.84,
            "pressure": 1014,
            "humidity": 81,
            "dew_point": 8.24,
            "uvi": 0,
            "clouds": 1,
            "visibility": 10000,
            "wind_speed": 1.63,
            "wind_deg": 276,
            "wind_gust": 1.6,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690808400,
            "temp": 12.8,
            "feels_like": 12.12,
            "pressure": 1014,
            "humidity": 76,
            "dew_point": 8.45,
            "uvi": 0.2,
            "clouds": 6,
            "visibility": 10000,
            "wind_speed": 1.55,
            "wind_deg": 285,
            "wind_gust": 1.72,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690812000,
            "temp": 15.8,
            "feels_like": 15.13,
            "pressure": 1013,
            "humidity": 65,
            "dew_point": 8.83,
            "uvi": 0.71,
            "clouds": 4,
            "visibility": 10000,
            "wind_speed": 1.11,
            "wind_deg": 304,
            "wind_gust": 1.38,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690815600,
            "temp": 18.54,
            "feels_like": 17.89,
            "pressure": 1013,
            "humidity": 55,
            "dew_point": 9.1,
            "uvi": 1.72,
            "clouds": 3,
            "visibility": 10000,
            "wind_speed": 0.56,
            "wind_deg": 339,
            "wind_gust": 0.8,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690819200,
            "temp": 21.34,
            "feels_like": 20.73,
            "pressure": 1013,
            "humidity": 46,
            "dew_point": 9.14,
            "uvi": 3.17,
            "clouds": 2,
            "visibility": 10000,
            "wind_speed": 0.62,
            "wind_deg": 133,
            "wind_gust": 0.84,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690822800,
            "temp": 23.84,
            "feels_like": 23.27,
            "pressure": 1012,
            "humidity": 38,
            "dew_point": 8.45,
            "uvi": 4.92,
            "clouds": 2,
            "visibility": 10000,
            "wind_speed": 1.66,
            "wind_deg": 143,
            "wind_gust": 1.56,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690826400,
            "temp": 25.67,
            "feels_like": 25.08,
            "pressure": 1011,
            "humidity": 30,
            "dew_point": 6.86,
            "uvi": 6.51,
            "clouds": 1,
            "visibility": 10000,
            "wind_speed": 2.48,
            "wind_deg": 133,
            "wind_gust": 2.67,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690830000,
            "temp": 27.29,
            "feels_like": 26.33,
            "pressure": 1010,
            "humidity": 22,
            "dew_point": 3.72,
            "uvi": 7.48,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 2.83,
            "wind_deg": 137,
            "wind_gust": 4.03,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690833600,
            "temp": 28.59,
            "feels_like": 27.1,
            "pressure": 1009,
            "humidity": 17,
            "dew_point": 1.29,
            "uvi": 7.6,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 3.09,
            "wind_deg": 141,
            "wind_gust": 6.1,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690837200,
            "temp": 29.52,
            "feels_like": 27.76,
            "pressure": 1009,
            "humidity": 14,
            "dew_point": -0.91,
            "uvi": 6.82,
            "clouds": 2,
            "visibility": 10000,
            "wind_speed": 2.59,
            "wind_deg": 157,
            "wind_gust": 6.96,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690840800,
            "temp": 30.12,
            "feels_like": 28.23,
            "pressure": 1008,
            "humidity": 12,
            "dew_point": -2.69,
            "uvi": 5.45,
            "clouds": 2,
            "visibility": 10000,
            "wind_speed": 2.77,
            "wind_deg": 203,
            "wind_gust": 7.03,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690844400,
            "temp": 30.14,
            "feels_like": 28.24,
            "pressure": 1007,
            "humidity": 12,
            "dew_point": -2.58,
            "uvi": 3.69,
            "clouds": 3,
            "visibility": 10000,
            "wind_speed": 3.82,
            "wind_deg": 249,
            "wind_gust": 6.61,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690848000,
            "temp": 29.53,
            "feels_like": 27.77,
            "pressure": 1007,
            "humidity": 14,
            "dew_point": -1.24,
            "uvi": 2.04,
            "clouds": 3,
            "visibility": 10000,
            "wind_speed": 4.42,
            "wind_deg": 292,
            "wind_gust": 6.49,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690851600,
            "temp": 28.91,
            "feels_like": 27.31,
            "pressure": 1007,
            "humidity": 15,
            "dew_point": -0.77,
            "uvi": 0.9,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 1.66,
            "wind_deg": 292,
            "wind_gust": 5.12,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690855200,
            "temp": 26.15,
            "feels_like": 26.15,
            "pressure": 1007,
            "humidity": 23,
            "dew_point": 3.32,
            "uvi": 0.28,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 1.6,
            "wind_deg": 62,
            "wind_gust": 3.51,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690858800,
            "temp": 21.5,
            "feels_like": 20.57,
            "pressure": 1009,
            "humidity": 33,
            "dew_point": 4.1,
            "uvi": 0,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 2.08,
            "wind_deg": 66,
            "wind_gust": 5.49,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690862400,
            "temp": 17.57,
            "feels_like": 16.53,
            "pressure": 1010,
            "humidity": 44,
            "dew_point": 4.76,
            "uvi": 0,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 1.65,
            "wind_deg": 349,
            "wind_gust": 4.05,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690866000,
            "temp": 15.12,
            "feels_like": 14.46,
            "pressure": 1012,
            "humidity": 68,
            "dew_point": 8.33,
            "uvi": 0,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 4.31,
            "wind_deg": 332,
            "wind_gust": 7.78,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690869600,
            "temp": 13.15,
            "feels_like": 12.9,
            "pressure": 1013,
            "humidity": 91,
            "dew_point": 11.47,
            "uvi": 0,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 4.64,
            "wind_deg": 307,
            "wind_gust": 8.33,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690873200,
            "temp": 12.72,
            "feels_like": 12.42,
            "pressure": 1013,
            "humidity": 91,
            "dew_point": 11.02,
            "uvi": 0,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 4.16,
            "wind_deg": 306,
            "wind_gust": 8.13,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690876800,
            "temp": 12.4,
            "feels_like": 12.07,
            "pressure": 1013,
            "humidity": 91,
            "dew_point": 10.62,
            "uvi": 0,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 3.62,
            "wind_deg": 310,
            "wind_gust": 7.09,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690880400,
            "temp": 12.09,
            "feels_like": 11.73,
            "pressure": 1014,
            "humidity": 91,
            "dew_point": 10.35,
            "uvi": 0,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 3.85,
            "wind_deg": 321,
            "wind_gust": 8.23,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690884000,
            "temp": 11.84,
            "feels_like": 11.46,
            "pressure": 1014,
            "humidity": 91,
            "dew_point": 10.15,
            "uvi": 0,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 4,
            "wind_deg": 319,
            "wind_gust": 8.51,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690887600,
            "temp": 11.73,
            "feels_like": 11.33,
            "pressure": 1015,
            "humidity": 91,
            "dew_point": 9.9,
            "uvi": 0,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 4.45,
            "wind_deg": 324,
            "wind_gust": 9.74,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690891200,
            "temp": 11.63,
            "feels_like": 11.2,
            "pressure": 1015,
            "humidity": 90,
            "dew_point": 9.67,
            "uvi": 0,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 4.62,
            "wind_deg": 328,
            "wind_gust": 10.38,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690894800,
            "temp": 12.08,
            "feels_like": 11.59,
            "pressure": 1015,
            "humidity": 86,
            "dew_point": 9.54,
            "uvi": 0.2,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 4.24,
            "wind_deg": 324,
            "wind_gust": 9.68,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690898400,
            "temp": 14.43,
            "feels_like": 13.83,
            "pressure": 1015,
            "humidity": 73,
            "dew_point": 9.45,
            "uvi": 0.71,
            "clouds": 1,
            "visibility": 10000,
            "wind_speed": 4.78,
            "wind_deg": 337,
            "wind_gust": 7.82,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690902000,
            "temp": 16.75,
            "feels_like": 16.15,
            "pressure": 1015,
            "humidity": 64,
            "dew_point": 9.81,
            "uvi": 1.74,
            "clouds": 1,
            "visibility": 10000,
            "wind_speed": 4.28,
            "wind_deg": 342,
            "wind_gust": 5.52,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690905600,
            "temp": 18.98,
            "feels_like": 18.45,
            "pressure": 1015,
            "humidity": 58,
            "dew_point": 10.25,
            "uvi": 3.27,
            "clouds": 2,
            "visibility": 10000,
            "wind_speed": 3.82,
            "wind_deg": 352,
            "wind_gust": 4.49,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690909200,
            "temp": 20.96,
            "feels_like": 20.44,
            "pressure": 1014,
            "humidity": 51,
            "dew_point": 10.25,
            "uvi": 5.09,
            "clouds": 1,
            "visibility": 10000,
            "wind_speed": 3.39,
            "wind_deg": 2,
            "wind_gust": 3.57,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690912800,
            "temp": 22.79,
            "feels_like": 22.3,
            "pressure": 1014,
            "humidity": 45,
            "dew_point": 9.98,
            "uvi": 6.74,
            "clouds": 1,
            "visibility": 10000,
            "wind_speed": 2.81,
            "wind_deg": 15,
            "wind_gust": 2.5,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690916400,
            "temp": 24.6,
            "feels_like": 24.11,
            "pressure": 1013,
            "humidity": 38,
            "dew_point": 9.36,
            "uvi": 7.79,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 2.39,
            "wind_deg": 36,
            "wind_gust": 1.7,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690920000,
            "temp": 26.24,
            "feels_like": 26.24,
            "pressure": 1012,
            "humidity": 32,
            "dew_point": 8.08,
            "uvi": 7.92,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 3.2,
            "wind_deg": 68,
            "wind_gust": 2.43,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690923600,
            "temp": 27.61,
            "feels_like": 26.66,
            "pressure": 1011,
            "humidity": 26,
            "dew_point": 6.49,
            "uvi": 7.1,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 3.65,
            "wind_deg": 87,
            "wind_gust": 4.28,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690927200,
            "temp": 28.26,
            "feels_like": 27.04,
            "pressure": 1011,
            "humidity": 24,
            "dew_point": 5.53,
            "uvi": 5.72,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 4.19,
            "wind_deg": 95,
            "wind_gust": 5.67,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690930800,
            "temp": 28.64,
            "feels_like": 27.25,
            "pressure": 1010,
            "humidity": 22,
            "dew_point": 4.82,
            "uvi": 3.86,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 4.9,
            "wind_deg": 99,
            "wind_gust": 6.76,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690934400,
            "temp": 28.62,
            "feels_like": 27.21,
            "pressure": 1009,
            "humidity": 21,
            "dew_point": 4.5,
            "uvi": 2.12,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 5.46,
            "wind_deg": 107,
            "wind_gust": 6.55,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1690938000,
            "temp": 27.8,
            "feels_like": 26.72,
            "pressure": 1009,
            "humidity": 24,
            "dew_point": 5.04,
            "uvi": 0.91,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 5.79,
            "wind_deg": 109,
            "wind_gust": 6.08,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        }
    ],
    "daily": [
        {
            "dt": 1690743600,
            "sunrise": 1690718341,
            "sunset": 1690773953,
            "moonrise": 1690771620,
            "moonset": 1690706040,
            "moon_phase": 0.42,
            "summary": "Expect a day of partly cloudy with rain",
            "temp": {
                "day": 29.74,
                "min": 11.39,
                "max": 32.03,
                "night": 18.99,
                "eve": 24.36,
                "morn": 12.34
            },
            "feels_like": {
                "day": 28.13,
                "night": 18.54,
                "eve": 23.9,
                "morn": 11.85
            },
            "pressure": 1009,
            "humidity": 23,
            "dew_point": 6.03,
            "wind_speed": 5.55,
            "wind_deg": 237,
            "wind_gust": 8.17,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 4,
            "pop": 0.32,
            "rain": 0.13,
            "uvi": 8.49
        },
        {
            "dt": 1690830000,
            "sunrise": 1690804829,
            "sunset": 1690860262,
            "moonrise": 1690860780,
            "moonset": 1690796880,
            "moon_phase": 0.46,
            "summary": "There will be partly cloudy until morning, then clearing",
            "temp": {
                "day": 27.29,
                "min": 11.52,
                "max": 30.14,
                "night": 15.12,
                "eve": 28.91,
                "morn": 12.8
            },
            "feels_like": {
                "day": 26.33,
                "night": 14.46,
                "eve": 27.31,
                "morn": 12.12
            },
            "pressure": 1010,
            "humidity": 22,
            "dew_point": 3.72,
            "wind_speed": 4.42,
            "wind_deg": 292,
            "wind_gust": 7.78,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": 0,
            "pop": 0.16,
            "uvi": 7.6
        },
        {
            "dt": 1690916400,
            "sunrise": 1690891317,
            "sunset": 1690946568,
            "moonrise": 1690949040,
            "moonset": 1690888560,
            "moon_phase": 0.5,
            "summary": "There will be clear sky today",
            "temp": {
                "day": 24.6,
                "min": 11.63,
                "max": 28.64,
                "night": 16.08,
                "eve": 27.8,
                "morn": 12.08
            },
            "feels_like": {
                "day": 24.11,
                "night": 15.18,
                "eve": 26.72,
                "morn": 11.59
            },
            "pressure": 1013,
            "humidity": 38,
            "dew_point": 9.36,
            "wind_speed": 5.79,
            "wind_deg": 109,
            "wind_gust": 10.38,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": 0,
            "pop": 0,
            "uvi": 7.92
        },
        {
            "dt": 1691002800,
            "sunrise": 1690977805,
            "sunset": 1691032873,
            "moonrise": 1691036760,
            "moonset": 1690980660,
            "moon_phase": 0.54,
            "summary": "Expect a day of partly cloudy with clear spells",
            "temp": {
                "day": 23.9,
                "min": 11.42,
                "max": 28.71,
                "night": 21.87,
                "eve": 28.71,
                "morn": 11.98
            },
            "feels_like": {
                "day": 23.39,
                "night": 21.34,
                "eve": 27.33,
                "morn": 11.66
            },
            "pressure": 1014,
            "humidity": 40,
            "dew_point": 9.16,
            "wind_speed": 4.72,
            "wind_deg": 62,
            "wind_gust": 8.27,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "clouds": 34,
            "pop": 0.03,
            "uvi": 7.55
        },
        {
            "dt": 1691089200,
            "sunrise": 1691064295,
            "sunset": 1691119177,
            "moonrise": 1691124240,
            "moonset": 1691072700,
            "moon_phase": 0.58,
            "summary": "Expect a day of partly cloudy with clear spells",
            "temp": {
                "day": 26.16,
                "min": 12.75,
                "max": 32.21,
                "night": 25.72,
                "eve": 32.21,
                "morn": 12.75
            },
            "feels_like": {
                "day": 26.16,
                "night": 25,
                "eve": 30.08,
                "morn": 12.51
            },
            "pressure": 1012,
            "humidity": 35,
            "dew_point": 9.18,
            "wind_speed": 6.31,
            "wind_deg": 120,
            "wind_gust": 9.58,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": 0,
            "pop": 0,
            "uvi": 7.71
        },
        {
            "dt": 1691175600,
            "sunrise": 1691150785,
            "sunset": 1691205478,
            "moonrise": 1691211540,
            "moonset": 1691164500,
            "moon_phase": 0.62,
            "summary": "You can expect partly cloudy in the morning, with rain in the afternoon",
            "temp": {
                "day": 22.14,
                "min": 13.21,
                "max": 24.66,
                "night": 18.48,
                "eve": 24.61,
                "morn": 13.21
            },
            "feels_like": {
                "day": 21.66,
                "night": 18.05,
                "eve": 24.17,
                "morn": 12.78
            },
            "pressure": 1019,
            "humidity": 48,
            "dew_point": 10.38,
            "wind_speed": 5.79,
            "wind_deg": 337,
            "wind_gust": 11.98,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 100,
            "pop": 0.27,
            "rain": 0.17,
            "uvi": 8
        },
        {
            "dt": 1691262000,
            "sunrise": 1691237275,
            "sunset": 1691291778,
            "moonrise": 1691298780,
            "moonset": 1691256120,
            "moon_phase": 0.65,
            "summary": "Expect a day of partly cloudy with rain",
            "temp": {
                "day": 23.81,
                "min": 13.78,
                "max": 26.21,
                "night": 16.29,
                "eve": 25.32,
                "morn": 13.78
            },
            "feels_like": {
                "day": 23.26,
                "night": 16.25,
                "eve": 24.8,
                "morn": 13.54
            },
            "pressure": 1022,
            "humidity": 39,
            "dew_point": 8.8,
            "wind_speed": 4.91,
            "wind_deg": 72,
            "wind_gust": 4.18,
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10d"
                }
            ],
            "clouds": 50,
            "pop": 0.96,
            "rain": 5.97,
            "uvi": 8
        },
        {
            "dt": 1691348400,
            "sunrise": 1691323766,
            "sunset": 1691378076,
            "moonrise": 1691386020,
            "moonset": 1691347500,
            "moon_phase": 0.69,
            "summary": "There will be rain today",
            "temp": {
                "day": 20.76,
                "min": 14.52,
                "max": 21.55,
                "night": 16.88,
                "eve": 21.47,
                "morn": 14.85
            },
            "feels_like": {
                "day": 20.54,
                "night": 16.69,
                "eve": 21.34,
                "morn": 14.79
            },
            "pressure": 1024,
            "humidity": 63,
            "dew_point": 13.19,
            "wind_speed": 3.21,
            "wind_deg": 79,
            "wind_gust": 2.95,
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10d"
                }
            ],
            "clouds": 71,
            "pop": 1,
            "rain": 10.1,
            "uvi": 8
        }
    ]
};

export default staticWeather;