document.getElementById('location-form').addEventListener('submit', getWeather);

async function getWeather(e) {
  e.preventDefault(); 

  let apiKey = "ENTER_YOUR_API_KEY_HERE";  // Your OpenWeatherMap API Key
  let location = document.querySelector("#location-input").value;
  let API = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try{
    let res = await fetch(API);
    if(!res.ok){
      if (res.status === 404) {
        throw new Error("City not found"); 
      }else {
        throw new Error(`HTTP error: ${response.status}`); 
      }
    }else{
      displayWeather(await res.json());
    }
  }catch(error){
    displayError(error)
  }
}

function displayWeather(data) {
  console.log(data);
  const weatherContainer = document.getElementById('weather-data');
  weatherContainer.innerHTML = `
    <h2>Weather in ${data.name}</h2>
    <p>Temperature: ${data.main.temp} °C</p>
    <p>Description: ${data.weather[0].description}</p>
    `; // Tailor this to display the weather data you want
}

function displayError(error) {
  const weatherContainer = document.getElementById('weather-data');
  weatherContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`; 
}
