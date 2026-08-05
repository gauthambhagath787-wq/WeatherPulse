//A total of 3 APIs were used: One to bring weather Data, one to bring Country code using city name entered, and one to bring, flag image

const WeatherApi = "http://api.weatherapi.com/v1/forecast.json.json?key=3cb840037e3645d6862105411260207&q="


const form = document.querySelector(".search-form")
const text = document.querySelector(".text");
const regionInfo = document.querySelector(".region-info");
const regionClimate = document.querySelector(".region-climate")
const errorPara = document.querySelector(".container p")
const flag = document.querySelector(".flag");

const regionInfoText = ["City", "Region/State", "Country", "Time"];
const regionClimateText = ["Temperature", "Chances of Rain", "Chances of Snow", "Condition", "Humidity"]


//updates the flag
const updateFlag = async (City) => {
    flag.innerHTML = ""; //To refresh the content so that flags won't collide
    const res = await fetch(`https://countries.dev/cities?q=${City}`); //fetching country code from API using city name entered
    const country = await res.json(); //getting data
    let code = country[0].countryCode
    console.log(code);
    let newSrc = `https://flagsapi.com/${code}/flat/64.png` //Using the API to get a flag. The reason we don't need the fetch is because we are querying textual data in JSON format, therefore no need for fetch
    let image = document.createElement('img');
    image.src = newSrc
    flag.appendChild(image);
}

const getWeatherData = async () => {
    const query = document.querySelector(".search input");
    let queryVal = query.value; //value entered in the input
    try { //Trying to load the API and enter the values
        let url = `${WeatherApi}${queryVal}`
        let response = await fetch(url);
        let data = await response.json()
        let city = data.location.name;
        let region = data.location.region;
        let country = data.location.country;
        let time = data.location.localtime
        let temperature = `${data.current.temp_c}°C`
        let chanceOfRain = `${data.current.chance_of_rain}%`
        let chanceOfSnow = `${data.current.chance_of_snow}%`
        let condition = `${data.current.condition.text}`
        let humidity = `${data.current.humidity}%`
        
        let regionInfoArr = [city, region, country, time];
        let regionClimateArr = [temperature, chanceOfRain, chanceOfSnow, condition, humidity];

        updateFlag(city)

        regionInfo.innerHTML = "";
        regionClimate.innerHTML = "";
        errorPara.innerText = "";
        
        regionInfo.innerHTML = regionInfoArr
            .map((val, i) => `<p><b><span style="color: #028090">${regionInfoText[i]}</span></b> : ${val}</p>`)
            .join('');

        regionClimate.innerHTML = regionClimateArr
            .map((val, i) => `<p><b><span style="color: #028090">${regionClimateText[i]}</span></b> : ${val}</p>`)
            .join('');

    } catch (err) { //If error, it will display error
        regionInfo.innerHTML = "";
        regionClimate.innerHTML = "";
        flag.innerHTML = "";
        errorPara.innerText = "";
        errorPara.innerText = `${queryVal} is not a valid City Name`
    }
}


form.addEventListener("submit", (evt) => {
    event.preventDefault();
    getWeatherData();
})

