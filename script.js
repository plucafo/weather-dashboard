// Create a button element and append it to the page
var buttonEl = $(".city-buttons");
var cityBtn = $("<button>").addClass("btn bg-secondary-subtle text-dark w-100");

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
  buttonEl.append(cityBtn);
}

// Maybe make an array of the lat and lon for each city?
// var lat = ['41.88', ];
// var lon = ['87.62', ];

// Element variables
var weatherEl = $(".weather-info");
var cityNameEl = $("<h3>");
var conditionEl = $("<h6>");
var iconEl = $("<img>");
var cityTempEl = $("<h6>");

var searchForm = $(".search-form");
var userSelectedCity;
var weatherURL;

searchForm.on('submit', function(event){
  event.preventDefault();

  userSelectedCity = searchForm.children('input').val();

  weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${userSelectedCity}&appid=976a6e1bd50b752c93e255a6e65ac032`;

  console.log('Submitted City: ' + userSelectedCity);

  fetch(weatherURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (weatherData) {
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
    iconEl.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
    // weatherEl.addClass('d-flex align-items-center')
    // Append elements to the weather info field
    weatherEl.append(iconEl);
    weatherEl.append(cityNameEl);
    weatherEl.append(conditionEl);
    weatherEl.append(cityTempEl);
  });
})

// Fetch URLs
// var weatherURL =
//   "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=chicago&appid=976a6e1bd50b752c93e255a6e65ac032";
var forecastURL =
  "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=chicago&appid=976a6e1bd50b752c93e255a6e65ac032";


// Fetch forecast data
fetch(forecastURL)
  .then(function (response2) {
    return response2.json();
  })
  .then(function (forecastData) {
    console.log(forecastData);
  });
  