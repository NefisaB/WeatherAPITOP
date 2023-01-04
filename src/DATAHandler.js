const DATAHandler = (function () {

    const windDirections = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West', 'North'];

    function getTime(seconds, timezone) {
        return new Date(seconds * 1000).toLocaleTimeString({ timezone})
    }
    
    
    function getWindDirection(deg) {
        return windDirections[(deg / 45).toFixed(0)];
    }

    const proccesData = async (data) => {
        console.log('from procces data');
        const weather = {
            city: data.name,
            desc: data.weather[0].main,
            temp: data.main.temp,
            feel_temp: data.main.feels_like,
            min_temp: data.main.temp_min,
            max_temp: data.main.temp_max,
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