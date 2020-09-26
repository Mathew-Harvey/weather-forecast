var APIKey = "07a20a4e47e01a7a29d322ba253e32a7";

const citys = ["Perth"]

var currentTime = function () {
    document.querySelector("#currentTime").innerHTML = moment().format('h:mm:ss a');
}
currentTime();
setInterval(currentTime, 1000);


function clearWeather() {
    $("#clear-weather").on("click", function (event) {
        event.preventDefault();
        $("#current-weather").html('')
    })
}

$(document).on("click", ".city-btn", getWeatherInfo);
renderButtons();
function getWeatherInfo() {

    var citytosearch = $("#city-input").val().trim();

    var weatherQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + citytosearch + "&appid=" + APIKey;
    $.ajax({
        url: weatherQueryURL,
        method: "GET"
    }).then(function (response) {
        var lat = response.coord.lat;
        var long = response.coord.lon;
        var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=" + APIKey;

        $.ajax({
            url: uvQueryURL,
            method: "GET"
        }).then(function (response) {

            var UVDiv = $("<div id='UV'>");
            var UV = "UV Index: " + response.value;
            var pSix = $("<p>").text(UV);
            UVDiv.append(pSix);
            $("#current-weather").append(UVDiv);
        });

        var cityNameDiv = $("<div id='cityName'>");
        var timeDateDiv = $("<div id='timeDate'>");
        var tempCelciusDiv = $("<div id='tempCelcius'>");
        var humidityDiv = $("<div id='humidity'>");
        var windSpeedDiv = $("<div id='windSpeed'>");

        var cityName = response.name;
        var Date = moment().format('MMMM Do YYYY');
        var tempCelcius = "Temperature: " + ((response.main.temp - 273.15).toFixed(0)) + " degrees celsius";
        var humidity = "Humidity: " + (response.main.humidity) + " %";
        var windSpeed = "Wind Speed: " + ((response.wind.speed * 3.6).toFixed(1)) + " km/h";

        var pOne = $("<p>").text(cityName);
        var pTwo = $("<p>").text(Date);
        var pThree = $("<p>").text(tempCelcius);
        var pFour = $("<p>").text(humidity);
        var pFive = $("<p>").text(windSpeed);

        cityNameDiv.append(pOne);
        timeDateDiv.append(pTwo);
        tempCelciusDiv.append(pThree);
        humidityDiv.append(pFour);
        windSpeedDiv.append(pFive);

        $("#current-weather").append(cityNameDiv);
        $("#current-weather").append(timeDateDiv);
        $("#current-weather").append(tempCelciusDiv);
        $("#current-weather").append(humidityDiv);
        $("#current-weather").append(windSpeedDiv);

    })


    //- forecast ajax search


    var forcastQueryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + citytosearch + "&appid=" + APIKey;
    $.ajax({
        url: forcastQueryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response)

        //-- Day 1 [5]
        var day1DateDiv = $("<div id='day1Date'>");
        var day1WeatherDiv = $("<div id='day1Weather'>");
        var day1TempCelciusDiv = $("<div id='day1TemCelcius'>");
        var day1HumidityDiv = $("<div id='day1Humidity'>");


        var day1Date = response.list[5].dt_txt;
        var day1DateShort = day1Date.slice(0, 10)
        var day1Weather = response.list[5].weather[0].description;
        var day1TempCelcius = "Temperature: " + ((response.list[5].main.temp - 273.15).toFixed(0)) + " degrees celsius";
        var day1Humidity = "Humidity: " + (response.list[5].main.humidity) + " %";


        var ppOne = $("<p>").text(day1DateShort);
        var ppTwo = $("<p>").text(day1Weather);
        var ppThree = $("<p>").text(day1TempCelcius);
        var ppFour = $("<p>").text(day1Humidity);


        day1DateDiv.append(ppOne);
        day1WeatherDiv.append(ppTwo);
        day1TempCelciusDiv.append(ppThree);
        day1HumidityDiv.append(ppFour);


        $("#day1").append(day1DateDiv);
        $("#day1").append(day1WeatherDiv);
        $("#day1").append(day1TempCelciusDiv);
        $("#day1").append(day1HumidityDiv);


        //-- Day 2 [12]


        var day2DateDiv = $("<div id='day2Date'>");
        var day2WeatherDiv = $("<div id='day2Weather'>");
        var day2TempCelciusDiv = $("<div id='day2TemCelcius'>");
        var day2HumidityDiv = $("<div id='day2Humidity'>");


        var day2Date = response.list[12].dt_txt;
        var day2DateShort = day2Date.slice(0, 10)
        var day2Weather = response.list[12].weather[0].description;
        var day2TempCelcius = "Temperature: " + ((response.list[12].main.temp - 273.15).toFixed(0)) + " degrees celsius";
        var day2Humidity = "Humidity: " + (response.list[12].main.humidity) + " %";


        var pppOne = $("<p>").text(day2DateShort);
        var pppTwo = $("<p>").text(day2Weather);
        var pppThree = $("<p>").text(day2TempCelcius);
        var pppFour = $("<p>").text(day2Humidity);


        day2DateDiv.append(pppOne);
        day2WeatherDiv.append(pppTwo);
        day2TempCelciusDiv.append(pppThree);
        day2HumidityDiv.append(pppFour);


        $("#day2").append(day2DateDiv);
        $("#day2").append(day2WeatherDiv);
        $("#day2").append(day2TempCelciusDiv);
        $("#day2").append(day2HumidityDiv);


        //-- Day 3 [21]

        var day3DateDiv = $("<div id='day3Date'>");
        var day3WeatherDiv = $("<div id='day3Weather'>");
        var day3TempCelciusDiv = $("<div id='day3TemCelcius'>");
        var day3HumidityDiv = $("<div id='day3Humidity'>");


        var day3Date = response.list[21].dt_txt;
        var day3DateShort = day3Date.slice(0, 10)
        var day3Weather = response.list[21].weather[0].description;
        var day3TempCelcius = "Temperature: " + ((response.list[21].main.temp - 273.15).toFixed(0)) + " degrees celsius";
        var day3Humidity = "Humidity: " + (response.list[21].main.humidity) + " %";


        var ppppOne = $("<p>").text(day3DateShort);
        var ppppTwo = $("<p>").text(day3Weather);
        var ppppThree = $("<p>").text(day3TempCelcius);
        var ppppFour = $("<p>").text(day3Humidity);


        day3DateDiv.append(ppppOne);
        day3WeatherDiv.append(ppppTwo);
        day3TempCelciusDiv.append(ppppThree);
        day3HumidityDiv.append(ppppFour);


        $("#day3").append(day3DateDiv);
        $("#day3").append(day3WeatherDiv);
        $("#day3").append(day3TempCelciusDiv);
        $("#day3").append(day3HumidityDiv);


         //-- Day 4 [30]

         var day4DateDiv = $("<div id='day4Date'>");
         var day4WeatherDiv = $("<div id='day4Weather'>");
         var day4TempCelciusDiv = $("<div id='day4TemCelcius'>");
         var day4HumidityDiv = $("<div id='day4Humidity'>");
 
 
         var day4Date = response.list[30].dt_txt;
         var day4DateShort = day3Date.slice(0, 10)
         var day4Weather = response.list[30].weather[0].description;
         var day4TempCelcius = "Temperature: " + ((response.list[30].main.temp - 273.15).toFixed(0)) + " degrees celsius";
         var day4Humidity = "Humidity: " + (response.list[30].main.humidity) + " %";
 
 
         var pppppOne = $("<p>").text(day4DateShort);
         var pppppTwo = $("<p>").text(day4Weather);
         var pppppThree = $("<p>").text(day4TempCelcius);
         var pppppFour = $("<p>").text(day4Humidity);
 
 
         day4DateDiv.append(pppppOne);
         day4WeatherDiv.append(pppppTwo);
         day4TempCelciusDiv.append(pppppThree);
         day4HumidityDiv.append(pppppFour);
 
 
         $("#day4").append(day4DateDiv);
         $("#day4").append(day4WeatherDiv);
         $("#day4").append(day4TempCelciusDiv);
         $("#day4").append(day4HumidityDiv);


         //-- Day 5 [37]

         var day5DateDiv = $("<div id='day5Date'>");
         var day5WeatherDiv = $("<div id='day5Weather'>");
         var day5TempCelciusDiv = $("<div id='day5TemCelcius'>");
         var day5HumidityDiv = $("<div id='day5Humidity'>");
 
 
         var day5Date = response.list[37].dt_txt;
         var day5DateShort = day3Date.slice(0, 10)
         var day5Weather = response.list[37].weather[0].description;
         var day5TempCelcius = "Temperature: " + ((response.list[37].main.temp - 273.15).toFixed(0)) + " degrees celsius";
         var day5Humidity = "Humidity: " + (response.list[37].main.humidity) + " %";
 
 
         var ppppppOne = $("<p>").text(day5DateShort);
         var ppppppTwo = $("<p>").text(day5Weather);
         var ppppppThree = $("<p>").text(day5TempCelcius);
         var ppppppFour = $("<p>").text(day5Humidity);
 
 
         day4DateDiv.append(ppppppOne);
         day4WeatherDiv.append(ppppppTwo);
         day4TempCelciusDiv.append(ppppppThree);
         day4HumidityDiv.append(ppppppFour);
 
 
         $("#day5").append(day5DateDiv);
         $("#day5").append(day5WeatherDiv);
         $("#day5").append(day5TempCelciusDiv);
         $("#day5").append(day5HumidityDiv);


    })
}











function renderButtons() {
    $("#searchHistory").empty();
    for (let i = 0; i < citys.length; i++) {
        const a = $("<button>");
        a.addClass("history");
        a.attr("data-name", citys[i]);
        a.text(citys[i]);
        $("#searchHistory").append(a)
    } console.log(citys)
}

$("#add-city").on("click", function (event) {
    event.preventDefault();
    const cityInput = $("#city-input").val().trim();
    citys.push(cityInput)
    renderButtons();


    $(".history").on("click", function (event) {
        event.preventDefault();
        const historyCity = $(".history").last().text()
        $("#city-input").val(historyCity);
        console.log(historyCity)

    })
})