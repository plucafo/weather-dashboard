// Element variables
var weatherEl = $(".weather-info");
var forecastEl = $(".five-day-forecast");
var searchForm = $(".search-form");
var buttonEl = $(".city-buttons");

// API URL Variables
var weatherURL;
var forecastURL;

// Create empty array to add user submitted city names to
var cities = [];

// Sets Chicago as default weather displayed on page load
var userSelectedCity = "Chicago"; // Set this to any city to change default weather shown
weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${userSelectedCity}&appid=976a6e1bd50b752c93e255a6e65ac032`;
forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userSelectedCity}&units=imperial&appid=976a6e1bd50b752c93e255a6e65ac032`;

getWeatherData();
getForecastData();

// Gets API data from open weather and appends the info to the page
function getWeatherData() {
  fetch(weatherURL)
    .then(function (response) {
      if (response.status !== 200) {
        // Don't create button if API call is unsuccessful
        return;
      }
      return response.json();
    })
    .then(function (weatherData) {
      console.log("weatherData: ");
      console.log(weatherData);

      weatherEl.empty();

      // Only create button if weatherData is available
      if (weatherData) {
        createButton(userSelectedCity);
      }
      
      // Variables to collect API data
      // var date = dayjs(weatherData.dt).format('dddd, MMM D YYYY');
      var date = dayjs(new Date()).format('dddd, MMM D YYYY');
      var temp = weatherData.main.temp;
      var condition = weatherData.weather[0].description;
      var location = weatherData.name;
      var icon = weatherData.weather[0].icon;
      
      // Create elements to display current weather
      var dateEl = $("<h3>");
      var cityNameEl = $("<h3>");
      var conditionEl = $("<h6>");
      var iconEl = $("<img>");
      var cityTempEl = $("<h6>");

      // Add content to elements
      dateEl.text(date);
      cityNameEl.text(location);
      cityTempEl.text(`${temp}°F`);
      conditionEl.text(condition);
      iconEl.attr(
        "src",
        "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      );

      // Append elements to the weather info field
      weatherEl.append(dateEl);
      weatherEl.append(iconEl);
      weatherEl.append(cityNameEl);
      weatherEl.append(conditionEl);
      weatherEl.append(cityTempEl);
    });
}

// Fetch forecast data
function getForecastData() {
  fetch(forecastURL)
    .then(function (response2) {
      if (response2.status !== 200) {
        // Don't create button if API call is unsuccessful
        return;
      }
      return response2.json();
    })
    .then(function (forecastData) {
      console.log("forecastData: ");
      console.log(forecastData);

      if (forecastData) {
        // Only create button if weatherData is available
        createButton(userSelectedCity);
      }

      for (var i = 0; i < forecastData.list.length; i++) {
        // Variables to collect API data
        var forecastDate = dayjs(forecastData.list[i].dt_txt).format(
          "dddd, MMM D"
        );
        var forecastIcon = forecastData.list[i].weather[0].icon;
        var forecastTemp = forecastData.list[i].main.temp;
        var forecastWind = forecastData.list[i].wind.speed;
        var forecastHumidity = forecastData.list[i].main.humidity;
        var forecastCity = forecastData.city.name;
        var timeStamp = dayjs(forecastData.list[i].dt_txt).format("H");

        // Variables to create card elements and add text content to them
        var forecastCardEl = $("<div>").addClass(
          "card text-bg-primary my-3 p-3 custom-height"
        );
        var forecastDateEl = $("<h5>").text(forecastDate);
        var forecastIconEl = $("<img>")
          .attr(
            "src",
            "https://openweathermap.org/img/wn/" + forecastIcon + "@2x.png"
          )
          .addClass("w-25");
        var hrEl = $("<hr>");
        var forecastCityEl = $("<p>").text(forecastCity);
        var forecastTempEl = $("<p>").text(`Temp: ${forecastTemp}°F`);
        var forecastWindEl = $("<p>").text(`Wind: ${forecastWind} MPH`);
        var forecastHumidityEl = $("<p>").text(
          `Humidity: ${forecastHumidity}%`
        );

        // Append elements with data to the forecastCardEl if times match
        if (timeStamp == "21") {
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

// Create button elements using names from cities array
function createButton() {
  buttonEl.empty();
  cities = cities.slice(0, 6);

  for (var i = 0; i < cities.length; i++) {
    var cityBtn = $("<button>")
      .text(cities[i])
      .addClass("btn bg-secondary-subtle text-dark mb-3 w-100");

    // Event listener for side buttons
    cityBtn.on("click", function () {
      forecastEl.empty();
      var clickedBtn = $(this).text();
      weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${clickedBtn}&appid=976a6e1bd50b752c93e255a6e65ac032`;
      forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${clickedBtn}&units=imperial&appid=976a6e1bd50b752c93e255a6e65ac032`;

      getWeatherData();
      getForecastData();
    });

    buttonEl.append(cityBtn);
  }
  saveCityButtons();
}

// Handles form submission
function handleFormSubmit(event) {
  event.preventDefault();
  forecastEl.empty();
  userSelectedCity = capitalizeFirstLetter(
    searchForm.children("input").val().split(",")[0].trim()
  );
  weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${userSelectedCity}&appid=976a6e1bd50b752c93e255a6e65ac032`;
  forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userSelectedCity}&units=imperial&appid=976a6e1bd50b752c93e255a6e65ac032`;

  fetch(weatherURL).then(function (response) {
    if (response.status === 200) {
      cities.unshift(userSelectedCity);
      getWeatherData();
      getForecastData();
    }
  });
}

// Capitalizes the first letter of a string
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Saves cities array to local storage
function saveCityButtons() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

// Loads cities array from local storage
function loadCityButtons() {
  var storedCities = localStorage.getItem("cities");
  if (storedCities) {
    cities = JSON.parse(storedCities);
  }
}

// Load cities from local storage when the page loads
loadCityButtons();

// Event listener on form submit
searchForm.on("submit", handleFormSubmit);
