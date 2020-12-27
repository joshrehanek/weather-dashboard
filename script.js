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

  $("li").on("click", function (event) {
    console.log("clicked");
    event.preventDefault()
    let pastCity = $(this).val();
    console.log(pastCity)
    currentWeather(pastCity);
    
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

  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=74e8a6515f50f51719fd79b020a3284d&units=imperial`
  console.log(forecastURL);

  $.ajax({
    url: forecastURL,
    method: "GET"
  }).then(function (response) {
   console.log(response);

   let forecastTitle = $('<h2>').addClass('grid-x grid-margin-x col-md-9 mt-3').text('5 Day Forecast');
   $('#forecast-title').append(forecastTitle);

    for (let i = 4; i < 40; i+=8) {
      let card = $('<div>').addClass("col md-2 forecast bg-primary text-white ml-2 mb-2 forecast-card");
      let forecastDate = $('<h5>').text(new Date(response.list[i].dt_txt).toLocaleDateString());
      let forecastIcon = $("<img>").attr("src", `http://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png`);
      let forecastTemp = $('<p>').text(`Temp: ${response.list[i].main.temp}`);
      let forecastHumidity = $('<p>').text(`Humidity: ${response.list[i].main.humidity}`);
      card.append(forecastDate, forecastIcon, forecastTemp, forecastHumidity);
      
      $('#forecast-cards').append(card);
    }
  });
}
})




// array.indexof(i) ===== -1; doesnt exist in local array localStorage