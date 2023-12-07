import "./style.css";


(function () {

  const searchBtn = document.getElementById("search");

  async function getWeather() {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=bd5234cbc8544024ad6163623232509&q=${document.getElementById("location").value}&days=3&aqi=no&alerts=no`
    );
    const weatherData = await response.json();
    console.log('Weather data from api', weatherData)
    return weatherData;
  };

  async function createForecast(weather) {
    let forecast = document.getElementById('forecast');
    while (forecast.hasChildNodes()) {
        forecast.removeChild(forecast.lastChild)
    }
    let header = document.getElementById('location-header');
    console.log(weather['location']['name'])
    header.textContent = weather['location']['name'];
    
    for (let i = 0; i < weather.forecast.forecastday.length; i++) {
        let day = weather.forecast.forecastday[i];
        let date = day.date;
        let minTemp = day.day.mintemp_f;
        let maxTemp = day.day.maxtemp_f;
        let avgTemp = day.day.avgtemp_f;
        let avgHumidity = day.day.avghumidity;
        let weatherArray = [`${date}`, `Min temperature: ${minTemp}F`, `Max temperature: ${maxTemp}F`, `Average temperature: ${avgTemp}F`, `Humidity: ${avgHumidity}`]   
        let card = createWeatherCard(weatherArray);
        forecast.append(card);

        if (i === 0) {
            if ((day.day.condition.text).toLowerCase().includes('fog')) {
                document.documentElement.style.backgroundImage = 'url(https://images.unsplash.com/photo-1560996025-95b43d543770?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80)'
            }
            else if ((day.day.condition.text).toLowerCase().includes('cloudy')) {
                document.documentElement.style.backgroundImage = 'url(https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)'
            }
            else if ((day.day.condition.text).toLowerCase().includes('sunny')) {
                document.documentElement.style.backgroundImage = 'url(https://images.unsplash.com/photo-1588526779453-57a0d3d15963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80)'
            }
            else if ((day.day.condition.text).toLowerCase().includes('rain')) {
                document.documentElement.style.backgroundImage = 'url(https://images.unsplash.com/photo-1603321544554-f416a9a11fcf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)'
            }
            else if ((day.day.condition.text).toLowerCase().includes('snow')) {
                document.documentElement.style.backgroundImage = 'url(https://images.unsplash.com/photo-1577457943926-11193adc0563?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2102&q=80)'
            }
        }
    }
  }
  function createWeatherCard(...args) {
    let card = document.createElement('div');
    card.setAttribute('class', 'card');
    for (let i = 0; i < args[0].length; i++) {
        let info = document.createElement('p');
        info.innerText = args[0][i];
        card.appendChild(info);
    }
    return card

  }
  searchBtn.addEventListener("click", async () => {
    let weather = await getWeather();
    createForecast(weather);
  });
})();
