const apiKey = "0c0c081e6f281c4f0306269a9044c246"; // Replace with your real OpenWeather API Key

let selectedCity = null;

const input = document.getElementById("cityInput");
const suggestions = document.getElementById("suggestions");
const weatherBox = document.getElementById("weatherBox");

// Autocomplete logic using Geocoding API
input.addEventListener("input", function() {
    const query = input.value.trim();

    if (query.length < 2) {
        suggestions.innerHTML = "";
        selectedCity = null;
        return;
    }

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        suggestions.innerHTML = "";

        if (data.length === 0) {
            const noResult = document.createElement("div");
            noResult.textContent = "No cities found";
            suggestions.appendChild(noResult);
            return;
        }

        data.forEach(city => {
            const div = document.createElement("div");
            div.textContent = `${city.name}, ${city.country}`;
            div.onclick = () => {
                input.value = `${city.name}, ${city.country}`;
                selectedCity = city;
                suggestions.innerHTML = "";
            };
            suggestions.appendChild(div);
        });
    })
    .catch(() => {
        suggestions.innerHTML = "<div>Error loading suggestions</div>";
    });
});

function getEmoji(weather) {
    if (weather.includes("cloud")) return "☁️";
    if (weather.includes("rain")) return "🌧️";
    if (weather.includes("clear")) return "☀️";
    if (weather.includes("snow")) return "❄️";
    if (weather.includes("storm")) return "⛈️";
    return "🌡️";
}

function getWeather() {
    if (!selectedCity) {
        weatherBox.value = "Please select a city from suggestions!";
        return;
    }

    const { lat, lon, name, country } = selectedCity;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        if (data.cod === 200) {
            const temp = data.main.temp;
            const description = data.weather[0].description;
            const emoji = getEmoji(description.toLowerCase());

            weatherBox.value = `City: ${name}, ${country}\nTemperature: ${temp} °C\nCondition: ${description} ${emoji}`;
        } else {
            weatherBox.value = `Error: ${data.message}`;
        }
    })
    .catch(() => {
        weatherBox.value = "Could not fetch weather data.";
    });
}
