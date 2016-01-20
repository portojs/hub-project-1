/**
 * Created by Peter on 20.01.2016.
 */

var https = require("https");
var http = require("http");

//Print out messages
function printMessage(username, badgeCount, points) {
  var message = "User " + username + " has " + badgeCount + " total badge(s) and " + points + " in JavaScript";
  console.log(message);
}

//Print our error messages
function printError(error) {
  console.error(error.message);
}

function get(username) {
  //Connect to the API URL (https://teamtreehouse.com/username.json)
  var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response) {
    var body = "";
    //Read the data
    response.on("data", function(chunk) {
      body += chunk;
    });
    response.on("end", function() {
      if (response.statusCode === 200) {
        try {
          //Parse the data
          var profile = JSON.parse(body);
          //Print the data
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch(error) {
          //Parse error
          printError(error);
        }
      } else {
        //Status Code error
        printError({message: "There was an error getting the profile for " + username + " (" + http.STATUS_CODES[response.statusCode] + ")"});
      }
    });
  });

  //Connection error
    request.on("error", printError);
}

module.exports.get = get;
