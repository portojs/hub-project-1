/**
 * Created by Peter on 21.01.2016.
 */

var https = require("https");
var http = require("http");

//Print out the weather
function printWeather(location, weather) {
  console.log("Today it is " + weather.currently.temperature + " F at " + location + ".");
}

//Print out error message
function printError(error) {
  console.log("There was an error. " + error.message);
}

function get(details) {
  //Connect to the API URL (https://api.forecast.io/forecast/API/37.8267,-122.423)
  var request = https.get("https://api.forecast.io/forecast/0aeea7c01d5fbc8c67dc57d2aadca7ff/37.8267,-122.423", function(response) {
    var body = "";
    //Read the data
    response.on("data", function(chunk) {
      body += chunk;
    });
    response.on("end", function() {
      if (response.statusCode === 200) {
        try {
          //Parse the data
          var weather = JSON.parse(body);
          //Print the data
          printWeather("37.8267,-122.423", weather);
        } catch(error) {
          //Parse error
          printError(error);
        }
      } else {
        printError({message: "There was an error getting the weather. " + http.STATUS_CODES(response.statusCode)});
      }
    });
  });
}

module.exports.get = get;