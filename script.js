let now = new Date();
let dateTime = document.querySelector("#dateTime");
let date = now.getDate();
let hour = now.getHours();
hour = hour > 9 ? hour : "0" + hour;
let minutes = now.getMinutes();
minutes = minutes > 9 ? minutes : "0" + minutes;

let weekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayOfTheWeek = weekDay[now.getDay()];

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
  "December",
];
let month = months[now.getMonth()];
dateTime.innerHTML = ` ${hour}:${minutes} - ${date} of ${month}, ${dayOfTheWeek}`;

function addSelectedCity(event) {
  event.preventDefault();
  let citySelected = document.querySelector("#search-location").value.trim();
  const apiKey = "ebfc1f6824f703866321e99d5ec95eb7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySelected}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(retrieveLocation);
}

let cityInput = document.querySelector("#search-form");
cityInput.addEventListener("submit", addSelectedCity);

//
// let celsiusTemperature = Math.round(temperature);
// let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);
//

function retrieveLocation(response) {
  console.log(response.data);
  let h2 = document.querySelector("#city-selected");
  let h1 = document.querySelector("#city-main");
  h1.innerHTML = response.data.name;
  h2.innerHTML = response.data.name;
  let currentTemperature = Math.round(response.data.main.temp);
  let weatherTemperature = document.querySelector("#temperature-now");
  weatherTemperature.innerHTML = currentTemperature;
  let currentHumidity = Math.round(response.data.main.humidity);
  let weatherHumidity = document.querySelector("#humidity");
  weatherHumidity.innerHTML = `${currentHumidity}%`;
  let currentWind = Math.round(response.data.wind.speed);
  let weatherWind = document.querySelector("#wind");
  weatherWind.innerHTML = `${currentWind} km/h`;
  let currentSky = response.data.weather[0].main;
  let weatherSkyCondition = document.querySelector("#sky");
  weatherSkyCondition.innerHTML = currentSky;
}

let currentButtonInput = document.querySelector("#current-button");
currentButtonInput.addEventListener("click", showActualWeather);

function showActualWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeatherForLocation);
}

function showCurrentTemp(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let localTemperature = document.querySelector("#temperature-now");
  localTemperature.innerHTML = temperature;
  let currentHumidity = Math.round(response.data.main.humidity);
  let weatherHumidity = document.querySelector("#humidity");
  weatherHumidity.innerHTML = `${currentHumidity}%`;
  let currentWind = Math.round(response.data.wind.speed);
  let weatherWind = document.querySelector("#wind");
  weatherWind.innerHTML = `${currentWind} km/h`;
  let currentSky = response.data.weather[0].main;
  let weatherSkyCondition = document.querySelector("#sky");
  weatherSkyCondition.innerHTML = currentSky;
  let h2 = document.querySelector("#city-selected");
  let h1 = document.querySelector("#city-main");
  h1.innerHTML = response.data.name;
  h2.innerHTML = response.data.name;
}

function getWeatherForLocation(position) {
  console.log(position);
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  let apiKey = "ebfc1f6824f703866321e99d5ec95eb7";
  apiCoordUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiCoordUrl).then(showCurrentTemp);
}
