const DATAHandler = (function () {

    const windDirections = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West', 'North'];

    function getTime(seconds, timezone) {
        return new Date((seconds+timezone-3600) * 1000).toLocaleTimeString();
    }
    
    
    function getWindDirection(deg) {
        return windDirections[(deg / 45).toFixed(0)];
    }

    function getTempInFahrenheit(temp) {
        return (temp * 1.8 + 32).toFixed(0);
    }

    const proccesData = async (data) => {
        console.log('from procces data');
        const weather = {
            city: data.name,
            desc: data.weather[0].main,
            temp_cel: `Current temperature: ${data.main.temp.toFixed(0)} °C`,
            feel_temp_cel: `Feels like ${data.main.feels_like.toFixed(0)} °C`,
            min_temp_cel: `Min ${data.main.temp_min.toFixed(0)} °C`,
            max_temp_cel: `Max ${data.main.temp_max.toFixed(0)} °C`,
            humidity: data.main.humidity,
            timezone: data.timezone,
            wind_speed: data.wind.speed.toFixed(0),
            wind_direction: getWindDirection(data.wind.deg),
            sunrise: getTime(data.sys.sunrise, data.timezone),
            sunset: getTime(data.sys.sunset, data.timezone),
            temp_fahr: `Current temperature: ${getTempInFahrenheit(data.main.temp)} °F`,
            feel_temp_fahr: `Feels like ${getTempInFahrenheit(data.main.feels_like)} °F`,
            min_temp_fahr: `Min ${getTempInFahrenheit(data.main.temp_min)} °F`,
            max_temp_fahr: `Max ${getTempInFahrenheit(data.main.temp_max)} °F`,
        }
        return weather;
    }

    return {
        proccesData
    }

})();

export default DATAHandler;