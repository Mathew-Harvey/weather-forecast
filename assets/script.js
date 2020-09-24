var APIKey = "07a20a4e47e01a7a29d322ba253e32a7";
var city = ""


$("#add-city").on("click",function(event) {
    event.preventDefault();

    let cityInput = $("#city-input").val()
    city = cityInput





var weatherQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey
$.ajax({
    url: weatherQueryURL,
    method: "GET"
}).then(function (response) {

    var lat = response.coord.lat
    var long = response.coord.lon
    var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=" + APIKey

    $.ajax({
        url: uvQueryURL,
        method: "GET"
    }).then(function (response) {

        var UVDiv = $("<div id='UV'>")
        var UV = "UV Index: " + response.value
        var pSix = $("<p>").text(UV)
        UVDiv.append(pSix)
        $("#current-weather").append(UVDiv)

        console.log(UV)
    });

    var cityNameDiv = $("<div id='cityName'>")
    var timeDateDiv = $("<div id='timeDate'>")
    var tempCelciusDiv = $("<div id='tempCelcius'>")
    var humidityDiv = $("<div id='humidity'>")
    var windSpeedDiv = $("<div id='windSpeed'>")



    var cityName = response.name
    var timeDate = moment().format('MMMM Do YYYY, h:mm:ss a')
    var tempCelcius = "Temperature: " + ((response.main.temp - 273.15).toFixed(0))
    var humidity = "Humidity: " + (response.main.humidity)
    var windSpeed = "Wind Speed: " + (response.wind.speed)


    var pOne = $("<p>").text(cityName)
    var pTwo = $("<p>").text(timeDate)
    var pThree = $("<p>").text(tempCelcius)
    var pFour = $("<p>").text(humidity)
    var pFive = $("<p>").text(windSpeed)

    cityNameDiv.append(pOne)
    timeDateDiv.append(pTwo)
    tempCelciusDiv.append(pThree)
    humidityDiv.append(pFour)
    windSpeedDiv.append(pFive)

    $("#current-weather").append(cityNameDiv)
    $("#current-weather").append(timeDateDiv)
    $("#current-weather").append(tempCelciusDiv)
    $("#current-weather").append(humidityDiv)
    $("#current-weather").append(windSpeedDiv)

})
})