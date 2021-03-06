var APIKey = "07a20a4e47e01a7a29d322ba253e32a7";

const citys = ["Clear Search"];

var currentTime = function () {
    document.querySelector("#currentTime").innerHTML = "Local Time: " + moment().format('h:mm:ss a');
}
currentTime();
setInterval(currentTime, 1000);

$(document).on("click", ".city-btn", getWeatherInfo);
renderButtons();

$(function () {
    if (localStorage["currentWeatherIcon"] != null) {
        var contentsOfOldDiv = JSON.parse(localStorage["currentWeatherIcon"]);
        $("#currentWeatherIcon").html(contentsOfOldDiv);
    }
});
$(function () {
    if (localStorage["currentWeather"] != null) {
        var contentsOfOldDiv = JSON.parse(localStorage["currentWeather"]);
        $("#current-weather").html(contentsOfOldDiv);
    }
});
$(function () {
    if (localStorage["day1"] != null) {
        var contentsOfOldDiv = JSON.parse(localStorage["day1"]);
        $("#day1").html(contentsOfOldDiv);
    }
});
$(function () {
    if (localStorage["day2"] != null) {
        var contentsOfOldDiv = JSON.parse(localStorage["day2"]);
        $("#day2").html(contentsOfOldDiv);
    }
});
$(function () {
    if (localStorage["day3"] != null) {
        var contentsOfOldDiv = JSON.parse(localStorage["day3"]);
        $("#day3").html(contentsOfOldDiv);
    }
});
$(function () {
    if (localStorage["day4"] != null) {
        var contentsOfOldDiv = JSON.parse(localStorage["day4"]);
        $("#day4").html(contentsOfOldDiv);
    }
});
$(function () {
    if (localStorage["day5"] != null) {
        var contentsOfOldDiv = JSON.parse(localStorage["day5"]);
        $("#day5").html(contentsOfOldDiv);
    }
});
$(function () {
    if (localStorage["uv"] != null) {
        var contentsOfOldDiv = (localStorage["uv"]);
        $("#uv").html(contentsOfOldDiv);

    }
    // if (response.value < 3) {
    //         $("#uv").add("textarea").css("background-color", "#008000");
    //     }
    //     else if (response.value <= 5 && response.value >= 3) {
    //         $("#uv").add("textarea").css("background-color", "#FFFF00");
    //     }
    //     else if (response.value <= 7 && response.value >= 6) {
    //         $("#uv").add("textarea").css("background-color", "#FFA500");
    //     }
    //     else if (response.value <= 10 && response.value >= 8) {
    //         $("#uv").add("textarea").css("background-color", "#FF0000");
    //     }
    //     else
    //         $("#uv").add("textarea").css("background-color", "#EE82EE");

});

function getWeatherInfo() {
    $("#currentWeatherIcon").html("");
    $("#current-weather").html("");
    $("#uv").html("");
    $("#day1").html("");
    $("#day2").html("");
    $("#day3").html("");
    $("#day4").html("");
    $("#day5").html("");

    var citytosearch = $("#city-input").val().trim();

    var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citytosearch + "&appid=" + APIKey;
    $.ajax({
        url: weatherQueryURL,
        method: "GET"
    }).then(function (response) {
        var lat = response.coord.lat;
        var long = response.coord.lon;
        var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=" + APIKey;

        $.ajax({
            url: uvQueryURL,
            method: "GET"
        }).then(function (response) {

            var UVDiv = $("<div id='UV'>");
            var UV = "UV Index: " + response.value;
            var pSix = $("<p>").text(UV);
            UVDiv.append(pSix);
            $("#uv").append(UVDiv);

            function uvColor() {
                if (response.value < 3) {
                    $("#uv").add("textarea").css("background-color", "#008000");
                }
                else if (response.value <= 5 && response.value >= 3) {
                    $("#uv").add("textarea").css("background-color", "#FFFF00");
                }
                else if (response.value <= 7 && response.value >= 6) {
                    $("#uv").add("textarea").css("background-color", "#FFA500");
                }
                else if (response.value <= 10 && response.value >= 8) {
                    $("#uv").add("textarea").css("background-color", "#FF0000");
                }
                else
                    $("#uv").add("textarea").css("background-color", "#EE82EE");

                $(function () {
                    localStorage["uv"] = JSON.stringify($("#uv").html());
                });
            }
            uvColor();
        });

        var cityNameDiv = $("<div id='cityName'>");
        var timeDateDiv = $("<div id='timeDate'>");
        var tempCelciusDiv = $("<div id='tempCelcius'>");
        var humidityDiv = $("<div id='humidity'>");
        var windSpeedDiv = $("<div id='windSpeed'>");

        var cityName = response.name;
        var Date = moment().format('MMMM Do YYYY');
        var tempCelcius = "Temperature: " + ((response.main.temp - 273.15).toFixed(0)) + " C";
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

        $(function () {
            localStorage["currentWeather"] = JSON.stringify($("#current-weather").html());
        });
    })

    var forcastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citytosearch + "&appid=" + APIKey;
    $.ajax({
        url: forcastQueryURL,
        method: "GET"
    }).then(function (response) {

        //-- Day 1 [6]
        var iconURL = "https://openweathermap.org/img/wn/" + response.list[6].weather[0].icon + "@2x.png";

        var day1DateDiv = $("<div id='day1Date'>");
        var day1WeatherDiv = $('<img src="' + iconURL + '">');
        var day1TempCelciusDiv = $("<div id='day1TemCelcius'>");
        var day1HumidityDiv = $("<div id='day1Humidity'>");

        var day1Date = response.list[3].dt_txt;
        var day1DateShort = day1Date.slice(0, 10)
        var day1TempCelcius = "Temperature: " + ((response.list[6].main.temp - 273.15).toFixed(0)) + " C";
        var day1Humidity = "Humidity: " + (response.list[6].main.humidity) + " %";

        var ppOne = $("<p>").text(day1DateShort);
        var ppThree = $("<p>").text(day1TempCelcius);
        var ppFour = $("<p>").text(day1Humidity);

        day1DateDiv.append(ppOne);
        day1TempCelciusDiv.append(ppThree);
        day1HumidityDiv.append(ppFour);

        $("#day1").append(day1DateDiv);
        $("#day1").append(day1WeatherDiv);
        $("#day1").append(day1TempCelciusDiv);
        $("#day1").append(day1HumidityDiv);


        //-- Day 2 [13]
        var iconURL2 = "https://openweathermap.org/img/wn/" + response.list[13].weather[0].icon + "@2x.png";

        var day2DateDiv = $("<div id='day2Date'>");
        var day2WeatherDiv = $('<img src="' + iconURL2 + '">');
        var day2TempCelciusDiv = $("<div id='day2TemCelcius'>");
        var day2HumidityDiv = $("<div id='day2Humidity'>");

        var day2Date = response.list[13].dt_txt;
        var day2DateShort = day2Date.slice(0, 10);
        var day2TempCelcius = "Temperature: " + ((response.list[13].main.temp - 273.15).toFixed(0)) + " C";
        var day2Humidity = "Humidity: " + (response.list[13].main.humidity) + " %";

        var pppOne = $("<p>").text(day2DateShort);
        var pppThree = $("<p>").text(day2TempCelcius);
        var pppFour = $("<p>").text(day2Humidity);

        day2DateDiv.append(pppOne);
        day2TempCelciusDiv.append(pppThree);
        day2HumidityDiv.append(pppFour);

        $("#day2").append(day2DateDiv);
        $("#day2").append(day2WeatherDiv);
        $("#day2").append(day2TempCelciusDiv);
        $("#day2").append(day2HumidityDiv);


        //-- Day 3 [22]
        var iconURL3 = "https://openweathermap.org/img/wn/" + response.list[22].weather[0].icon + "@2x.png";

        var day3DateDiv = $("<div id='day3Date'>");
        var day3WeatherDiv = $('<img src="' + iconURL3 + '">');
        var day3TempCelciusDiv = $("<div id='day3TemCelcius'>");
        var day3HumidityDiv = $("<div id='day3Humidity'>");

        var day3Date = response.list[22].dt_txt;
        var day3DateShort = day3Date.slice(0, 10);
        var day3TempCelcius = "Temperature: " + ((response.list[22].main.temp - 273.15).toFixed(0)) + " C";
        var day3Humidity = "Humidity: " + (response.list[22].main.humidity) + " %";

        var ppppOne = $("<p>").text(day3DateShort);
        var ppppThree = $("<p>").text(day3TempCelcius);
        var ppppFour = $("<p>").text(day3Humidity);

        day3DateDiv.append(ppppOne);
        day3TempCelciusDiv.append(ppppThree);
        day3HumidityDiv.append(ppppFour);

        $("#day3").append(day3DateDiv);
        $("#day3").append(day3WeatherDiv);
        $("#day3").append(day3TempCelciusDiv);
        $("#day3").append(day3HumidityDiv);

        //-- Day 4 [30]
        var iconURL4 = "https://openweathermap.org/img/wn/" + response.list[30].weather[0].icon + "@2x.png";

        var day4DateDiv = $("<div id='day4Date'>");
        var day4WeatherDiv = $('<img src="' + iconURL4 + '">');
        var day4TempCelciusDiv = $("<div id='day4TemCelcius'>");
        var day4HumidityDiv = $("<div id='day4Humidity'>");

        var day4Date = response.list[30].dt_txt;
        var day4DateShort = day4Date.slice(0, 10)
        var day4TempCelcius = "Temperature: " + ((response.list[30].main.temp - 273.15).toFixed(0)) + " C";
        var day4Humidity = "Humidity: " + (response.list[30].main.humidity) + " %";

        var pppppOne = $("<p>").text(day4DateShort);
        var pppppThree = $("<p>").text(day4TempCelcius);
        var pppppFour = $("<p>").text(day4Humidity);

        day4DateDiv.append(pppppOne);
        day4TempCelciusDiv.append(pppppThree);
        day4HumidityDiv.append(pppppFour);

        $("#day4").append(day4DateDiv);
        $("#day4").append(day4WeatherDiv);
        $("#day4").append(day4TempCelciusDiv);
        $("#day4").append(day4HumidityDiv);


        //-- Day 5 [38]
        var iconURL5 = "https://openweathermap.org/img/wn/" + response.list[38].weather[0].icon + "@2x.png";

        var day5DateDiv = $("<div id='day5Date'>");
        var day5WeatherDiv = $('<img src="' + iconURL5 + '">');
        var day5TempCelciusDiv = $("<div id='day5TemCelcius'>");
        var day5HumidityDiv = $("<div id='day5Humidity'>");

        var day5Date = response.list[38].dt_txt;
        var day5DateShort = day5Date.slice(0, 10)
        var day5TempCelcius = "Temperature: " + ((response.list[38].main.temp - 273.15).toFixed(0)) + " C";
        var day5Humidity = "Humidity: " + (response.list[38].main.humidity) + " %";

        var ppppppOne = $("<p>").text(day5DateShort);
        var ppppppThree = $("<p>").text(day5TempCelcius);
        var ppppppFour = $("<p>").text(day5Humidity);

        day5DateDiv.append(ppppppOne);
        day5TempCelciusDiv.append(ppppppThree);
        day5HumidityDiv.append(ppppppFour);

        $("#day5").append(day5DateDiv);
        $("#day5").append(day5WeatherDiv);
        $("#day5").append(day5TempCelciusDiv);
        $("#day5").append(day5HumidityDiv);

        //-- Current weather icon
        var iconURL6 = "https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png";
        console.log(iconURL6)

        var currentWeatherIcon = $('<img src="' + iconURL6 + '">');

        $("#currentWeatherIcon").prepend(currentWeatherIcon);

        $(function () {
            localStorage["currentWeatherIcon"] = JSON.stringify($("#currentWeatherIcon").html());
        });
        $(function () {
            localStorage["current-weather"] = JSON.stringify($("#current-weather").html());
        });
        $(function () {
            localStorage["day1"] = JSON.stringify($("#day1").html());
        });
        $(function () {
            localStorage["day2"] = JSON.stringify($("#day2").html());
        });
        $(function () {
            localStorage["day3"] = JSON.stringify($("#day3").html());
        });
        $(function () {
            localStorage["day4"] = JSON.stringify($("#day4").html());
        });
        $(function () {
            localStorage["day5"] = JSON.stringify($("#day5").html());
        });
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
    }
}

$("#add-city").on("click", function (event) {
    event.preventDefault();
    const cityInput = $("#city-input").val().trim();
    citys.push(cityInput)
    renderButtons();

    $(".history").on("click", function (event) {
        event.preventDefault();
        const historyCity = $(this).text()
        $("#city-input").val(historyCity);
        getWeatherInfo();

    })
})