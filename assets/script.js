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

function renderButtons() {
    $("#searchHistory").empty();
    for (let i = 0; i < citys.length; i++) {
        const a = $("<button>");
        a.addClass("city-btn");
        a.attr("data-name", citys[i]);
        a.text(citys[i]);
        $("#searchHistory").append(a)
        const cityInput = $("#city-input").val().trim();
        citys.push(cityInput)

    }
}

$(document).on("click", ".city-btn", getWeatherInfo);
renderButtons();
function getWeatherInfo() {





    var city = $("#city-input").val().trim();
    var APIKey = "07a20a4e47e01a7a29d322ba253e32a7";
    var weatherQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
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

        $("#searchHistory").append("<button id='cityHistory'>")
        $("#cityHistory").text(cityName)

    })



}

function renderButtons() {
    $("#searchHistory").empty();
    for (let i = 0; i < citys.length; i++) {
        const a = $("<button>");
        a.addClass("city-btn");
        a.attr("data-name", citys[i]);
        a.text(citys[i]);
        $("#searchHistory").append(a)
    }
}

$("#add-city").on("click", function (event) {
    event.preventDefault();
    const cityInput = $("#city-input").val().trim();
    citys.push(cityInput)
    renderButtons();
})

