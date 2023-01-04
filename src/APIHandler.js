const APIHandler = (function () {

    

    const getData = async (city) => {
        
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=48288edb11c1501e5187210a25cdea41&units=metric`);
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }

    
    const getImage = async (desc) => {
        let description = desc + ' sky';
        try {
            const response = await fetch(`https://pixabay.com/api/?key=32603126-0b3c8ab615cbc7eb6ceb318bf&q=${description}&image_type=photo&pretty=true`);
            const resJson = await response.json();
            return resJson.hits[0].webformatURL;
        }
        catch (error) {
            console.log(error);
        }
    }

    return {
        getData,
        getImage,
    }

})();

export default APIHandler;