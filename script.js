const apiKey = "ee758fd0eb93f9e116b9de199d0a3caf"; // Replace with your OpenWeatherMap API key

function getEmoji(weather) {
    if (weather.includes("cloud")) return "☁️";
    if (weather.includes("rain")) return "🌧️";
    if (weather.includes("clear")) return "☀️";
    if (weather.includes("snow")) return "❄️";
    if (weather.includes("storm")) return "⛈️";
    return "🌡️"; // default
}

function getWeather() {
    const city = document.getElementById("citySelect").value;
    const weatherBox = document.getElementById("weatherBox");

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const emoji = getEmoji(description.toLowerCase());

        weatherBox.value = `City: ${city}\nTemperature: ${temp} °C\nCondition: ${description} ${emoji}`;
    })
    .catch(() => {
        weatherBox.value = "Could not get weather. Try again!";
    });
}
