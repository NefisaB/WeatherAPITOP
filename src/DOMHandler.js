import APIHandler from "./APIHandler";

const DOMHandler = (function () {
    const populateData = async (weatherData) => {
        console.log('weather dsata' + weatherData);
        const body = document.querySelector('body');
        const main = document.createElement('main');
        body.append(main);

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        const img = document.createElement('img');
        console.log(weatherData.desc);
        img.src = await APIHandler.getImage(weatherData.desc);
        imageContainer.append(img);

        const basicInfoContainer = document.createElement('div');
        basicInfoContainer.classList.add('basic-info'); 
        const desc = document.createElement('h2');
        desc.textContent = weatherData.desc;
        const cityName = document.createElement('h3');
        cityName.textContent = weatherData.city;
        const tempInfo = document.createElement('p');
        tempInfo.textContent = `Temperature: ${weatherData.temp} ° `;
        const degrees = document.createElement('span');
        degrees.classList.add('degrees');
        degrees.textContent = 'F';
        tempInfo.append(degrees);
        const feelsLike = document.createElement('p');
        feelsLike.textContent = `Feels like ${weatherData.feel_temp} ° `;
        const degrees2 = document.createElement('span');
        degrees2.classList.add('degrees');
        degrees2.textContent = 'F';
        feelsLike.append(degrees2);
        basicInfoContainer.append(desc, cityName, tempInfo, feelsLike);
        
        const additionalInfo = document.createElement('div');
        additionalInfo.classList.add('add-info');
        const minTemp = document.createElement('p');
        minTemp.textContent = `Min: ${weatherData.min_temp} °`;
        const maxTemp = document.createElement('p');
        maxTemp.textContent = `Max: ${weatherData.max_temp} °`;
        const windInfo = document.createElement('p');
        windInfo.textContent = `Wind speed: ${weatherData.wind_speed}m/s from ${weatherData.wind_direction}`;
        const humidity = document.createElement('p');
        humidity.textContent = `Humidity: ${weatherData.humidity}%`;
        const sunrise = document.createElement('p');
        sunrise.textContent = `Sunrise: ${weatherData.sunrise}`;
        const sunset = document.createElement('p');
        sunset.textContent = `Sunset: ${weatherData.sunset}`;
        additionalInfo.append(minTemp, maxTemp, windInfo, humidity, sunrise, sunset);


        main.append(imageContainer, basicInfoContainer, additionalInfo);
    }

    return {
        populateData
    }
})();

export default DOMHandler;