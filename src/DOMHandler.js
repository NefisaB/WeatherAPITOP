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
        const currTime = document.createElement('p');
        currTime.textContent = new Date().toLocaleTimeString();
        const desc = document.createElement('h2');
        desc.textContent = weatherData.desc;
        const cityName = document.createElement('h3');
        cityName.textContent = weatherData.city;
        const tempInfo = document.createElement('p');
        tempInfo.textContent = weatherData.temp_cel;
        tempInfo.setAttribute('id', 'current-temperature');
        const feelsLike = document.createElement('p');
        feelsLike.textContent = weatherData.feel_temp_cel;
        feelsLike.setAttribute('id', 'feel-temperature');
        const degBtn = document.createElement('button');
        degBtn.textContent = 'Switch to F';
        degBtn.setAttribute('id', 'deg-button');
        degBtn.classList.add('celsius');
        degBtn.addEventListener('click', changeDegrees.bind(null,degBtn, weatherData));
        
        basicInfoContainer.append(currTime, desc, cityName, tempInfo, feelsLike, degBtn);
        
        const additionalInfo = document.createElement('div');
        additionalInfo.classList.add('add-info');
        const minTemp = document.createElement('p');
        minTemp.textContent = weatherData.min_temp_cel;
        const maxTemp = document.createElement('p');
        minTemp.setAttribute('id', 'min-temperature');
        maxTemp.textContent = weatherData.max_temp_cel;
        const windInfo = document.createElement('p');
        maxTemp.setAttribute('id', 'max-temperature');
        windInfo.textContent = `Wind speed: ${weatherData.wind_speed} m/s from ${weatherData.wind_direction}`;
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

    const changeDegrees = (btn, data) => {
        if (btn.classList.contains('celsius')) {
            document.querySelector('#current-temperature').textContent = data.temp_fahr;
            document.querySelector('#feel-temperature').textContent = data.feel_temp_fahr;
            document.querySelector('#min-temperature').textContent = data.min_temp_fahr;
            document.querySelector('#max-temperature').textContent = data.max_temp_fahr;
            btn.classList.remove('celsius');
            btn.textContent = 'Switch to C';
        } else {
            document.querySelector('#current-temperature').textContent = data.temp_cel;
            document.querySelector('#feel-temperature').textContent = data.feel_temp_cel;
            document.querySelector('#min-temperature').textContent = data.min_temp_cel;
            document.querySelector('#max-temperature').textContent = data.max_temp_cel;
            btn.classList.add('celsius');
            btn.textContent = 'Switch to F';
        }
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