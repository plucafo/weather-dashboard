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

var cities = [
  "Atlanta",
  "Chicago",
  "Dallas",
  "Los Angeles",
  "New York",
  "Phoenix",
];

// Creates buttons using cities array
for (var i = 0; i < cities.length; i++) {
  var cityBtn = $("<button>")
    .text(cities[i])
    .addClass("btn bg-secondary-subtle text-dark mb-3 w-100");

  // Sets Chicago as default weather displayed on page load
  var userSelectedCity = "Chicago"; // Set this to any city to change default weather shown
  weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${userSelectedCity}&appid=976a6e1bd50b752c93e255a6e65ac032`;
  getWeatherData();

  // Fetch forecast data

  var forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=Chicago&units=imperial&appid=976a6e1bd50b752c93e255a6e65ac032";

  fetch(forecastURL)
    .then(function (response2) {
      return response2.json();
    })
    .then(function (forecastData) {
      console.log("forecastData: ");
      console.log(forecastData);
    });

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

  // Handle form submit function
  function handleFormSubmit(event) {
    event.preventDefault();
    userSelectedCity = searchForm.children("input").val();
    weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${userSelectedCity}&appid=976a6e1bd50b752c93e255a6e65ac032`;

    getWeatherData();
  }

  // Event listener on form submit
  searchForm.on("submit", handleFormSubmit);

  // Event listener for side buttons
  cityBtn.on("click", function () {
    var clickedBtn = $(this).text();
    weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${clickedBtn}&appid=976a6e1bd50b752c93e255a6e65ac032`;
    getWeatherData();
  });

  buttonEl.append(cityBtn);
}
