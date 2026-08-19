// API key : aba54e7b9d1c92fe3acbd7efbd490383
// Get your API Key from OpenWeather 


const date = document.getElementById('date');
const city = document.getElementById('city');
const temp = document.getElementById('temp');
const tempImg = document.getElementById('tempImg');
const description = document.getElementById('description');
const tempMax = document.getElementById('tempMax');
const tempMin = document.getElementById('tempMin');


const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let dateObj = new Date();
let month = months[dateObj.getUTCMonth()];
let day = dateObj.getUTCDate() - 1;
let year = dateObj.getUTCFullYear();

date.innerHTML = `${month} ${day} ${year}`;

const app = document.getElementById('app');

async function getWeather() {
    try {
        const searchInput = document.getElementById('searchBarInput');
        const cityName = searchInput ? searchInput.value.trim() : "";
        if (!cityName) {
            alert("Please enter a city name");
            return;
        }

        const weatherDataFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=aba54e7b9d1c92fe3acbd7efbd490383&units=metric`);

        const weatherData = await weatherDataFetch.json();
        console.log(weatherData);

        if (weatherData.cod == 200) {
            const cityEl = document.getElementById('city');
            const descriptionEl = document.getElementById('description');
            const tempImgEl = document.getElementById('tempImg');
            const tempEl = document.getElementById('temp');
            const tempMaxEl = document.getElementById('tempMax');
            const tempMinEl = document.getElementById('tempMin');

            if (cityEl) cityEl.innerHTML = `${weatherData.name}`;
            if (descriptionEl) descriptionEl.innerHTML = `${weatherData.weather[0].main}`;
            if (tempImgEl) tempImgEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png"/> `;
            if (tempEl) tempEl.innerHTML = `<h2> ${Math.round(weatherData.main.temp)}℃</h2>`;
            if (tempMaxEl) tempMaxEl.innerHTML = `${weatherData.main.temp_max}℃`;
            if (tempMinEl) tempMinEl.innerHTML = `${weatherData.main.temp_min}℃`;
        } else {
            alert(weatherData.message || "City not found");
        }
    }
    catch (err) {
        console.log(err);
        alert("Error: " + (err.message || "Unable to fetch weather data"));
    }
}

// Make sure function is attached to window for inline HTML onclick handlers
window.getWeather = getWeather;

