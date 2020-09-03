//openweathermap api-key
var API_KEY = "4f76f229391709106c3c44b33312c811";
var units = "imperial";
var JSON_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=" + units +"&lat=";

//jquery wrapper where most of logic will take place
$(function() {
  'use strict';
  //to store location
  var location;

  //google geolocation for latitude and longitude
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      location = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      };

      //call to the weather api
      $.getJSON(
        JSON_URL + location.lat + "&lon=" + location.lon + "&APPID=" + API_KEY,
        function(wd) {
          var currentLocation = wd.name;
          var currentCountry = wd.sys.country;
          var currentWeather = wd.weather[0].description;
          var currentTemperature = wd.main.temp;
          var currentHigh = wd.main.temp_max;
          var currentLow = wd.main.temp_min;
          var iconCode = wd.weather[0].icon;

          //update html
          $("#current-country").html(currentCountry);
          $("#current-location").html(currentLocation);
          $("#weather-description").html(currentWeather);
          $("#local-temperature").html(
            "<p>" + currentTemperature + " &#8457;</p>"
          );
          $("#high-temp").html(
            "<p>High/ " + currentHigh + " &#8457;</p>"
          );
          $("#low-temp").html("<p>Low/ " + currentLow + " &#8457;</p>");

          //create skycons
          var skycons = new Skycons({ color: "orange" });

          function weatherIcon() {
            'use strict';
            if (currentWeather === "clear sky" && iconCode === "01d") {
              skycons.add("icon1", Skycons.CLEAR_DAY);
              $("body").css(
                "background-image",
                "url(https://s19.postimg.cc/b664kszn7/blue-sky-299764_1920.jpg)"
              );
            } else if (currentWeather === "clear sky" && iconCode === "01n") {
              skycons.add("icon1", Skycons.CLEAR_NIGHT);
              $("body").css(
                "background-image",
                "url(https://s19.postimg.cc/toah51hf7/lake-927433_1920.jpg)"
              );
            } else if (currentWeather === "rain" || currentWeather === "light rain" || currentWeather === "heavy intensity rain") {
              skycons.add("icon1", Skycons.RAIN);
              $("body").css(
                "background-image",
                "url(https://s19.postimg.cc/6pdrm4lf7/rain-455120_1920.jpg)"
              );
            } else if (currentWeather === "snow" || currentWeather === "light snow") {
              skycons.add("icon1", Skycons.SNOW);
              $("body").css(
                "background-image",
                "url(https://s19.postimg.cc/bpft7tgfn/snowflake-554635_1920.jpg)"
              );
            } else if (currentWeather === "sleet" || currentWeather === "haze") {
              skycons.add("icon1", Skycons.SLEET);
              $("body").css(
                "background-image",
                "url(https://s19.postimg.cc/4aqhffuk3/hailstones-on-window-pane-1354038_1920.jpg)"
              );
            } else if (currentWeather === "windy") {
              skycons.add("icon1", Skycons.WIND);
              $("body").css(
                "background-image",
                "url(https://s19.postimg.cc/jxhqst8c3/grass-1810493_1920.jpg)"
              );
            } else if (currentWeather === "fog" || currentWeather === "mist") {
              skycons.add("icon1", Skycons.FOG);
              $("body").css(
                "background-image",
                "url(https://s19.postimg.cc/x2x8yx27n/fog-571786_1920.jpg)"
              );
            } else if (currentWeather === "scattered clouds" || currentWeather === "broken clouds") {
              skycons.add("icon1", Skycons.CLOUDY);
              $("body").css(
                "background-image",
                "url(https://s19.postimg.cc/ebvbor7n7/clouds-314476_1280.jpg)"
              );
            } else if (currentWeather === "few clouds") {
              skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
              $("body").css(
                "background-image",
                "url(https://s19.postimg.cc/e0dvbzr77/sky-592415_1920.jpg)"
              );
            } else if (currentWeather === "overcast clouds") {
              skycons.add("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
              $("body").css(
                "background-image",
                "url(https://s19.postimg.cc/v26pe362b/month-2219843_1920.jpg)"
              );
            } else {
              $("#icon").html("<h2>Sorry no matching weather icon</h2>");
            }
            skycons.play();
          }
          weatherIcon();

          //toggle celcius and farenheit
          var celsius = Math.floor((currentTemperature - 32) * (5 / 9));
          var celsiusHigh = Math.floor((currentHigh - 32) * (5 / 9));
          var celsiusLow = Math.floor((currentLow - 32) * (5 / 9));
          
            $("#cfButton").click(function() {
              if(units === "imperial"){
                units = "metric";
                $("#current-country").html(currentCountry);
                $("#local-temperature").html("<p>" + celsius + " &#8451;</p>");
                $("#high-temp").html("<p>High/ " + celsiusHigh + " &#8451;</p>");
                $("#low-temp").html("<p>Low/ " + celsiusLow + " &#8451;</p>");
              }else if(units === "metric"){
                units = "imperial";
                $("#current-country").html(currentCountry);
                $("#local-temperature").html("<p>" + currentTemperature + " &#8457;</p>");
                $("#high-temp").html("<p>High/ " + currentHigh + " &#8457;</p>");
                $("#low-temp").html("<p>Low/ " + currentLow + " &#8457;</p>");
              }
            });
        }
      );
    });
  } else {
    $("#current-location").html("Your Browser does not support Geolocation");
  }
});
