$(document).ready(function () {
  $(".city-card").hide();

  let history = JSON.parse(window.localStorage.getItem('history')) || [];
 
  for (let i = 0; i < history.length; i++)  {

  cityHistory(history[i]);

  }

  $("#find-btn").on("click", function (event) {
    let cityName = $('#search-city').val();
    event.preventDefault()
    $(".city-card").show();
  
    currentWeather(cityName);
    fiveDayForecast(cityName);
    cityHistory(cityName);
    addToLocalStorage(cityName);


  })
})

function addToLocalStorage(cityName){
  let history = JSON.parse(window.localStorage.getItem('history')) || [];
  history.push(cityName);
  window.localStorage.setItem('history', JSON.stringify(history));
}

function cityHistory(cityName){
let li = $('<li>').addClass("list-group-item list-group-item-action").text(cityName).attr('value', cityName);
$('.city-history').append(li);

}

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
    $('#icon').attr('src', `http://openweathermap.org/img/w/${response.weather[0].icon}.png`);
    $(".city").html(`<h1>${response.name}</h1>`);
    $(".temp").text(`Temperature: ${response.main.temp}`)
    $(".wind").text(`Wind Speed: ${response.wind.speed}`);
    $(".humidity").text(`Humidity: ${response.main.humidity}`);

  });
}

function fiveDayForecast(cityName) {
  console.log('clicked', cityName);

  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=74e8a6515f50f51719fd79b020a3284d`

$.ajax({
  url: forecastURL,
  method: "GET"
}).then(function (response) {
  //  variable declarations to extract info from object
  //  build cards with response data
  console.log(response);


});
}