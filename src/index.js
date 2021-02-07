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


//Months, Days, Year
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
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector(`#location-input`).value;
    searchCity(city);
}


//Display Weather from Search Engine
function displayWeatherCondition(response) {
    document.querySelector(`.currentLocation`).innerHTML = response.data.name;
    document.querySelector(`#real-temp`).innerHTML = Math.round(response.data.main.temp);
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

}


let locationButton = document.querySelector("#exact-location-btn");
locationButton.addEventListener("click", getCurrentLocation);

searchCity("Las Vegas");