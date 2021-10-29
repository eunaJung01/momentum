const API_KEY = "9586d01dacc2a8dd88cc67f46360d9bf";

const weatherDiv = document.querySelector("#weather-location div:first-child");
const weatherImg = document.querySelector("#weather-location div:first-child img");
const temperature = document.querySelector("#weather-location div:nth-child(2)");
const city = document.querySelector("#weather-location div:last-child");

// ask geolocation only in 2nd page
if (page == 2) {
  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
}
function onGeoError() {
  alert("Can't find you. No weather & location for you.");
}

// get data from API (OpenWeatherMap)
function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url).then(response => response.json().then(data => {
    const weatherImgUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;  // get weather img url
    weatherImg.src = weatherImgUrl;
    temperature.innerText = `${Math.round(data.main.temp)}℃`; // get temperature
    changeCSS(weatherImg);
    setEventListener(data, weatherImgUrl);
  }));
}

// set mouse events in weather & city
function setEventListener(data, weatherImgUrl) {
  weatherDiv.addEventListener("mouseover", () => {
    weatherDiv.innerHTML = `${data.weather[0].main}`;
  });
  weatherDiv.addEventListener("mouseout", () => {
    weatherDiv.innerHTML = `<img src = ${weatherImgUrl}>`;
    changeCSS(weatherImg);
  });
  
  city.addEventListener("mouseover", () => {
    city.innerHTML = `${data.name}`;
  });
  city.addEventListener("mouseout", () => {
    city.innerHTML = `<img src = img/location.png>`;
    changeCSS();
  });
}

function changeCSS(weather) {
  weather.style.width = "70px";
  weather.style.height = "70px";
  weather.style.margin = "2.5px auto";
}
function changeCSS() {
  city.style.width = "113px";
  city.style.height = "75px";
}