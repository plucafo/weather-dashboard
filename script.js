// Create a button element and append it to the page
var buttonEl = $(".city-buttons");
var buttonText; // Get text for dynamically created buttons from open weather API
var cityBtn = $("<button>").addClass("btn bg-secondary-subtle text-dark w-100");

var cities = [
  "Atlanta",
  "Chicago",
  "Dallas",
  "Los Angeles",
  "New York",
  "Phoenix",
];

for (var i = 0; i < cities.length; i++) {
  var cityBtn = $("<button>")
    .text(cities[i])
    .addClass("btn bg-secondary-subtle text-dark mb-3 w-100");
  buttonEl.append(cityBtn);
}

// Maybe make an array of the lat and lon for each city?
// var lat = ['41.88', ];
// var lon = ['87.62', ];

var weatherEl = $(".weather-info");
var cityNameEl = $("<h3>");
var conditionEl = $("<h6>");
var iconEl = $('<img>');
var cityTempEl = $("<h6>");

var chicagoURL =
  "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=41.88&lon=-87.62&appid=976a6e1bd50b752c93e255a6e65ac032";

fetch(chicagoURL)
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
    cityNameEl.text(location);
    cityTempEl.text(`${temp}°F`);
    conditionEl.text(condition);
    iconEl.attr('src', 'https://openweathermap.org/img/wn/' + icon + '@2x.png')

    weatherEl.append(iconEl);
    weatherEl.append(cityNameEl);
    weatherEl.append(conditionEl);
    weatherEl.append(cityTempEl);

});
    

