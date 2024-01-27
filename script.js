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
