// Element variables
var weatherEl = $(".weather-info");
var forecastEl = $(".five-day-forecast");
var cityNameEl = $("<h3>");
var conditionEl = $("<h6>");
var iconEl = $("<img>");
var cityTempEl = $("<h6>");
var searchForm = $(".search-form");
var buttonEl = $(".city-buttons");
var weatherURL;
var forecastURL;

var cities = [
  "Atlanta",
  "Chicago",
  "Dallas",
  "Los Angeles",
  "New York",
  "Phoenix",
];

// Sets Chicago as default weather displayed on page load
var userSelectedCity = "Chicago"; // Set this to any city to change default weather shown
weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${userSelectedCity}&appid=976a6e1bd50b752c93e255a6e65ac032`;
forecastURL =
  `https://api.openweathermap.org/data/2.5/forecast?q=${userSelectedCity}&units=imperial&appid=976a6e1bd50b752c93e255a6e65ac032`;

getWeatherData();
getForecastData();

// Fetch forecast data
function getForecastData() {
fetch(forecastURL)
  .then(function (response2) {
    return response2.json();
  })
  .then(function (forecastData) {
    console.log("forecastData: ");
    console.log(forecastData);
    
    
    for (var i=0; i < 40; i++) {
      // Variables to collect API data
      var forecastDate = forecastData.list[i].dt_txt.split(" ")[0];
      var forecastIcon = forecastData.list[i].weather[0].icon;
      var forecastTemp = forecastData.list[i].main.temp;
      var forecastWind = forecastData.list[i].wind.speed;
      var forecastHumidity = forecastData.list[i].main.humidity;
      var forecastCity = forecastData.city.name;
      var timeStamp = forecastData.list[i].dt_txt.split(" ")[1];

      // Varibles to create card elements
      var forecastCardEl = $('<div>').addClass('card text-bg-primary my-3 p-3 custom-height');
      var forecastDateEl = $('<h5>').text(forecastDate);
      var forecastIconEl = $('<img>').attr('src', 'https://openweathermap.org/img/wn/' + forecastIcon + '@2x.png').addClass('w-25');
      var hrEl = $('<hr>');
      var forecastCityEl = $('<p>').text(forecastCity);
      var forecastTempEl = $('<p>').text(`Temp: ${forecastTemp}°F`);
      var forecastWindEl = $('<p>').text(`Wind: ${forecastWind}MPH`);
      var forecastHumidityEl = $('<p>').text(`Humidity: ${forecastHumidity}%`);
      

      if(timeStamp == '12:00:00') {
        console.log(forecastDate);

        forecastEl.append(forecastCardEl);
        forecastCardEl.append(forecastDateEl);
        forecastCardEl.append(forecastIconEl);
        forecastCardEl.append(hrEl);
        forecastCardEl.append(forecastCityEl);
        forecastCardEl.append(forecastTempEl);
        forecastCardEl.append(forecastWindEl);
        forecastCardEl.append(forecastHumidityEl);
      }
    }

  });
}

for (var i = 0; i < cities.length; i++) {
  // Create button elements using names from cities array
  var cityBtn = $("<button>")
    .text(cities[i])
    .addClass("btn bg-secondary-subtle text-dark mb-3 w-100");

  // Event listener for side buttons
  cityBtn.on("click", function () {
    var clickedBtn = $(this).text();
    weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${clickedBtn}&appid=976a6e1bd50b752c93e255a6e65ac032`;
   forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${clickedBtn}&units=imperial&appid=976a6e1bd50b752c93e255a6e65ac032`;

    getWeatherData();
  });

  buttonEl.append(cityBtn);
}

// **************************************************************************
// ********************* Get weather data function **************************
// **** Gets API data from open weather and appends the info to the page ****
// **************************************************************************
function getWeatherData() {
  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherData) {
      console.log("weatherData: ");
      console.log(weatherData);

      var temp = weatherData.main.temp;
      var condition = weatherData.weather[0].description;
      var location = weatherData.name;
      var icon = weatherData.weather[0].icon;

      console.log(
        `Temperature in ${location}: ${temp}°F
      Weather Condition: ${condition}
      Icon: ${icon}`
      );

      // Add content to elements
      cityNameEl.text(location);
      cityTempEl.text(`${temp}°F`);
      conditionEl.text(condition);
      iconEl.attr(
        "src",
        "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      );

      // Append elements to the weather info field
      weatherEl.append(iconEl);
      weatherEl.append(cityNameEl);
      weatherEl.append(conditionEl);
      weatherEl.append(cityTempEl);
    });
}

// Handles form submission
function handleFormSubmit(event) {
  event.preventDefault();
  forecastEl.empty();
  userSelectedCity = searchForm.children("input").val();
  weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${userSelectedCity}&appid=976a6e1bd50b752c93e255a6e65ac032`;
  forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userSelectedCity}&units=imperial&appid=976a6e1bd50b752c93e255a6e65ac032`;

  getWeatherData();
  getForecastData();
}

// Event listener on form submit
searchForm.on("submit", handleFormSubmit);
