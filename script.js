$(document).ready(function () {



  $(".city-card").hide();
  $(".forecast").hide();

  let history = JSON.parse(window.localStorage.getItem('history')) || [];

  for (let i = 0; i < history.length; i++) {

    cityHistory(history[i]);

  }

  $("#find-btn").on("click", function (event) {
    let cityName = $('#search-city').val();

    event.preventDefault()
    $(".city-card").show();
    $(".forecast").show();
    currentWeather(cityName);
    fiveDayForecast(cityName);
    cityHistory(cityName);
    addToLocalStorage(cityName);
    


  })
})

function addToLocalStorage(cityName) {
  let history = JSON.parse(window.localStorage.getItem('history')) || [];
  history.push(cityName);
  window.localStorage.setItem('history', JSON.stringify(history));
}

function cityHistory(cityName) {
  let li = $('<li>').addClass("list-group-item list-group-item-action").text(cityName).attr('value', cityName);
  $('.city-history').append(li);
}

//function to display weather info
function currentWeather(cityName) {
  // query url
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?appid=74e8a6515f50f51719fd79b020a3284d&q=${cityName}&units=imperial`;

  // AJAX call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    let date = moment().format('MMMM Do YYYY');
    console.log(response);
    $('#icon').attr('src', `http://openweathermap.org/img/w/${response.weather[0].icon}.png`);
    $(".city").html(`<h1>${response.name} ${date}</h1>`);
    $(".temp").text(`Temperature: ${response.main.temp}`)
    $(".wind").text(`Wind Speed: ${response.wind.speed}`);
    $(".humidity").text(`Humidity: ${response.main.humidity}`);
    //pull lat and lon values for uvIndex function
    let lat = response.coord.lat
    console.log(lat);
    let lon = response.coord.lon
    console.log(lon);
    // uvIndex(response.coord.lat, response.coord.lon);
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?&lat=" + lat + "&lon=" + lon + "&appid=74e8a6515f50f51719fd79b020a3284d&cnt=1";
    axios.get(uvURL)
      .then(function (response) {
        console.log(response);
        let uvIndex = response.data.value;
        let uvIndexEl = $('.uv-index');
        $(".uv-index").text(`UV Index: ${uvIndex}`);

        if (uvIndex <= 2) {
          $(uvIndexEl).addClass("badge badge-pill badge-success")
        } else if (uvIndex > 2.99 && uvIndex <= 5.99) {
          $(uvIndexEl).addClass("badge badge-pill badge-warning")
        } else if (uvIndex >= 6) {
          $(uvIndexEl).addClass("badge badge-pill badge-danger")
        }

      });
  });
}

function fiveDayForecast(cityName) {
  console.log('clicked', cityName);

  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=74e8a6515f50f51719fd79b020a3284d`
  console.log(forecastURL);

  $.ajax({
    url: forecastURL,
    method: "GET"
  }).then(function (response) {
   console.log(response);
    //  build cards with response data
    //for loop through cards.length i=5; i < 40 ; i+=8
    //40 total
    //get to noon += 8 for one full cycle
    //take reponse data


  });
}