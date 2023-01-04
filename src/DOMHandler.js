import APIHandler from "./APIHandler";
import DATAHandler from "./DATAHandler";

const DOMHandler = (function () {
    const populateData = async (weatherData) => {
        
        const body = document.querySelector('body');
        const main = document.createElement('main');
        body.replaceChildren(main);

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
        degrees.textContent = 'C';
        tempInfo.append(degrees);
        const feelsLike = document.createElement('p');
        feelsLike.textContent = `Feels like ${weatherData.feel_temp} ° `;
        const degrees2 = document.createElement('span');
        degrees2.classList.add('degrees');
        degrees2.textContent = 'C';
        feelsLike.append(degrees2);
        basicInfoContainer.append(desc, cityName, tempInfo, feelsLike);
        
        const additionalInfo = document.createElement('div');
        additionalInfo.classList.add('add-info');
        const minTemp = document.createElement('p');
        minTemp.textContent = `Min: ${weatherData.min_temp} ° C`;
        const maxTemp = document.createElement('p');
        maxTemp.textContent = `Max: ${weatherData.max_temp} ° C`;
        const windInfo = document.createElement('p');
        windInfo.textContent = `Wind speed: ${weatherData.wind_speed}m/s from ${weatherData.wind_direction}`;
        const humidity = document.createElement('p');
        humidity.textContent = `Humidity: ${weatherData.humidity}%`;
        const sunrise = document.createElement('p');
        sunrise.textContent = `Sunrise: ${weatherData.sunrise}`;
        const sunset = document.createElement('p');
        sunset.textContent = `Sunset: ${weatherData.sunset}`;
        additionalInfo.append(minTemp, maxTemp, windInfo, humidity, sunrise, sunset);

        const formContainer = document.createElement('div');
        formContainer.classList.add('form-container');
        const form = document.createElement('form');
        const fieldset = document.createElement('fieldset');
        const label = document.createElement('label');
        label.textContent = 'Enter a city';
        const input = document.createElement('input');
        input.setAttribute('id', 'cityName');
        input.setAttribute('name', 'cityName');
        input.setAttribute('type', 'text');
        fieldset.append(label, input);
        const formBtn = document.createElement('button');
        formBtn.textContent = 'Search';
        formBtn.setAttribute('type', 'submit');
        formBtn.addEventListener('click', getCityInfo);
        form.append(fieldset, formBtn);
        formContainer.append(form);

        main.append(imageContainer, basicInfoContainer, formContainer,additionalInfo );
    }

    const getCityInfo = async (e) => {
        e.preventDefault();
        const newCity = document.querySelector('#cityName').value;
        APIHandler.getData(newCity)
            .then(data => DATAHandler.proccesData(data))
            .then(data => populateData(data));
    }

    return {
        populateData
    }
})();

export default DOMHandler;