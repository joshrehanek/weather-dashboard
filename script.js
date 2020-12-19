$(document).ready(function () {

  $("#find-btn").on("click", function (event) {
    let cityName = $('#search-city').val();
    event.preventDefault()
    $("#city-form").append();
    currentWeather(cityName);
    fiveDayForecast(cityName);

  })
})
//function to display weather info
function currentWeather(cityName) {
  console.log('clicked', cityName);

  // query url
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?appid=74e8a6515f50f51719fd79b020a3284d&q=${cityName}&units=imperial`;
 

  //function fiveDayForecast (){
  //for loop through cards.length i=5; i < 40 ; i+=8
  //40 total
  //get to noon += 8 for one full cycle
  //take reponse data


  // AJAX call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    //  variable declarations to extract info from object
    //  build cards with response data
    console.log(response);

    $(".city").html(`<h1> ${response.name} Weather On Demand ${response.weather[0].id}</h1>`);
    $(".temp").text(`Temperature: ${response.main.temp}`)
    $(".wind").text(`Wind Speed: ${response.wind.speed}`);
    $(".humidity").text(`Humidity: ${response.main.humidity}`);

  });
}

function fiveDayForecast(cityName) {
  console.log('clicked', cityName);

  let forecastURL = `api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=74e8a6515f50f51719fd79b020a3284d`

$.ajax({
  url: forecastURL,
  method: "GET"
}).then(function (response) {
  //  variable declarations to extract info from object
  //  build cards with response data
  console.log(response);


});
}