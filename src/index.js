//Time
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
let realTime = document.querySelector(`.displayTime`);
realTime.innerHTML = (formatAMPM(new Date));


//Months, Days, Year for Weather App
let now = new Date();
let date = now.getDate();
let year = now.getFullYear();

let days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
let day = days[now.getDay()];

let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let month = months[now.getMonth()];
let p = document.querySelector(`.todaysDate`);
p.innerHTML = `${day}` + `<br>` + `${month} ${date}, ${year}`;


//Fahrenheit Temperature Conversion
function fahConvert(event) {
    event.preventDefault();
    let showFahTemp = document.querySelector("#real-temp");
    showFahTemp.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", fahConvert);

//Celsius Temperature Conversion
function celsiusConvert(event) {
    event.preventDefault();
    let celsiusTemp = ((fahrenheitTemperature - 32) / 1.8);
    let showCelsiusTemp = document.querySelector("#real-temp");
    showCelsiusTemp.innerHTML = Math.round(celsiusTemp);

}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", celsiusConvert);

let fahrenheitTemperature = null;


//Search City with Search Engine
function searchCity(city) {
    let apiKey = `51ea909910c3284455f83b220441cc78`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayWeatherCondition);

    //Use Search Engine to Get Weather Forecast Info. for Multiple Days
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayGeolocation);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector(`#location-input`).value;
    searchCity(city);
}


//Display Weather from Search Engine-Circle
function displayWeatherCondition(response) {
    console.log(response);
    document.querySelector(`.currentLocation`).innerHTML = response.data.name;
    document.querySelector(`#real-temp`).innerHTML = Math.round(response.data.main.temp);
    document.querySelector(`#circleIcon`).innerHTML = `<img src=${`icons/${response.data.weather[0].icon}.svg`} href=https://fontawesome.com/license height=100px width=100px />`;


    document.querySelector(`#describeWeather`).innerHTML = response.data.weather[0].main;
    document.querySelector(`#humidity`).innerHTML = ` Humidity: ` + response.data.main.humidity + `%`;
    document.querySelector(`#wind`).innerHTML = ` Wind: ` + Math.round(response.data.wind.speed) + ` km/h`;
    fahrenheitTemperature = response.data.main.temp;
}

let searchForm = document.querySelector(`#search-location`);
searchForm.addEventListener("submit", handleSubmit);


//Current Location Button-Get Coordinates
function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
    let apiKey = `51ea909910c3284455f83b220441cc78`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayWeatherCondition);

    //Get Weather Forecast Info. for Multiple Days
    apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayDailyWeatherConditions);
}


let locationButton = document.querySelector("#exact-location-btn");
locationButton.addEventListener("click", getCurrentLocation);


//Display Daily Weather Conditions
function displayDailyWeatherConditions(response) {

    let forecastElement = document.querySelector(`#dailyForecast`);
    let forecast = null;
    forecastElement.innerHTML = null;

    for (let index = 0; index < 6; index++) {
        forecast = response.data.daily[index];
        console.log(forecast);

        forecastElement.innerHTML += `
                 <div class="row border" id="styleRows">
                <div class="col-6 col-md-4">
                  <p class="next-day">${dailyForecastDays(forecast.dt * 1000)}
                   
                </p>
                </div>
                <div class="col-6 col-sm-3">
            
                <img src=${`icons/${forecast.weather[0].icon}.svg`}  href=https://fontawesome.com/license id=fontAwesomeIcon/>
                  <p class=minMaxTemp>
                  Max: ${Math.round(forecast.temp.max)} °F<br/>
                  Min:  ${Math.round(forecast.temp.min)} °F 
                  </p>
                </div>
                <div class="col-6 col-md-5">
                  <p class="daily-describeWeather" style=color:#91092A><i>${forecast.weather[0].main}</i></p>
                  <i class="fas fa-tint" id="dailyHumidity"></i> Humidity: ${forecast.humidity}% <br />
                  <i class="fas fa-wind" id="dailyWind"></i>Wind: ${Math.round(forecast.wind_speed)} km/h </div>
            </div>`;
    }
}


//Daily Forecast Days Function to Show Multiple Days
function dailyForecastDays(timestamp) {
    let dailyForecastDay = new Date(timestamp);
    let days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    for (index = 0; index < 6; index++) {
        let nextDay = days[(dailyForecastDay.getDay() + 1 + index) % 7];
        console.log(nextDay);
        return `${nextDay}`;
      
    }
}

//Get Location to Show Daily Forecast Information for Multiple Days
function displayGeolocation(response) {
    let latitude = response.data.coord.lat;
    let longitude = response.data.coord.lon;
    let apiKey = `51ea909910c3284455f83b220441cc78`;

    apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayDailyWeatherConditions);
}

//Default City
searchCity("Las Vegas");