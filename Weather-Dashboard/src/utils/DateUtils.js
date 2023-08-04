// Formats the given Date object into an hour tag (e.g. 9AM, 3PM, ...)
const formatHour = (date) => {
    let hours = date.getHours();
    const tag = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + tag;
}

// Retrieves the (abbreviated) weekday associated with the given Date object
const formatDay = (date) => {
    const ABR_WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return ABR_WEEKDAYS[date.getDay()];
}

// Determines whether the given time is within the hour of sunrise
const isSunrise = (curr, sunrise) => {
    const currDate = new Date(curr * 1000);
    const sunriseDate = new Date(sunrise * 1000);
    return currDate.getHours() === sunriseDate.getHours();
}

// Determines whether the given time is within the hour of sunset
const isSunset = (curr, sunset) => {
    const currDate = new Date(curr * 1000);
    const sunsetDate = new Date(sunset * 1000);
    return currDate.getHours() === sunsetDate.getHours();
}

// Determines whether the given time is between the hours of sunset and sunrise (exclusive)
const isNight = (curr, sunrise, sunset) => {
    const currDate = new Date(curr * 1000);
    const sunriseDate = new Date(sunrise * 1000);
    const sunsetDate = new Date(sunset * 1000);
    return currDate.getHours() > sunsetDate.getHours() || currDate.getHours() < sunriseDate.getHours();
}

export {
    formatHour,
    formatDay,
    isSunset,
    isSunrise,
    isNight
}