const DATAHandler = (function () {

    const windDirections = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West', 'North'];

    function getTime(seconds, timezone) {
        return new Date((seconds+timezone-3600) * 1000).toLocaleTimeString();
    }
    
    
    function getWindDirection(deg) {
        return windDirections[(deg / 45).toFixed(0)];
    }

    const proccesData = async (data) => {
        console.log('from procces data');
        const weather = {
            city: data.name,
            desc: data.weather[0].main,
            temp: data.main.temp.toFixed(0),
            feel_temp: data.main.feels_like.toFixed(0),
            min_temp: data.main.temp_min.toFixed(0),
            max_temp: data.main.temp_max.toFixed(0),
            humidity: data.main.humidity,
            timezone: data.timezone,
            wind_speed: data.wind.speed,
            wind_direction: getWindDirection(data.wind.deg),
            sunrise: getTime(data.sys.sunrise, data.timezone),
            sunset: getTime(data.sys.sunset, data.timezone),
        }
        return weather;
    }

    return {
        proccesData
    }

})();

export default DATAHandler;