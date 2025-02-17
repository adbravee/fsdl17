// Your OpenWeatherMap API key
const apiKey = 'fc73336b470612e4d36a01466c765b30'; // Replace with your actual API key
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

// Get the DOM elements
const searchButton = document.getElementById('search');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city-name');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const errorMessage = document.getElementById('error-message');

// Function to fetch weather data
async function getWeather(city) {
  try {
    // Make the API request
    const response = await fetch(`${baseURL}?q=${city}&appid=${apiKey}&units=metric`);
    
    // Check if the response is okay (status code 200)
    if (!response.ok) {
      throw new Error('City not found!');
    }

    const data = await response.json();
    
    // Update the UI with weather data
    cityName.textContent = data.name;
    weatherDescription.textContent = data.weather[0].description;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    // Show the weather info and hide the error
    weatherInfo.style.display = 'block';
    errorMessage.style.display = 'none';
  } catch (error) {
    // Handle errors (e.g., invalid city name)
    weatherInfo.style.display = 'none';
    errorMessage.textContent = error.message;
    errorMessage.style.display = 'block';
  }
}

// Event listener for the search button
searchButton.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});
