const apiKey = "433a6461f3c219a34676fe4f5db4e8f8";
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Cidade não encontrada");
    const data = await response.json();

    document.getElementById("city-name").textContent = data.name;
    document.getElementById("temperature").textContent = `${data.main.temp}°C`;
    document.getElementById("condition").textContent = data.weather[0].description;
    document.getElementById("feels-like").textContent = `${data.main.feels_like}°C`;
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;
    document.getElementById("wind-speed").textContent = `${data.wind.speed} m/s`;
    document.getElementById("pressure").textContent = `${data.main.pressure} hPa`;
    document.getElementById("visibility").textContent = `${data.visibility / 1000} km`;

  
    const iconCode = data.weather[0].icon;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    document.getElementById("weather-result").classList.remove("hidden");
    document.getElementById("error-message").classList.add("hidden");
  } catch (error) {
    document.getElementById("weather-result").classList.add("hidden");
    document.getElementById("error-message").classList.remove("hidden");
  }
}
