/**
 * Created by Peter on 20.01.2016.
 */

var https = require("https");
var http = require("http");

//Print out messages
function printMessage(username, badgeCount, points, topic) {
  var message = "User " + username + " has " + badgeCount + " total badge(s) and " + points + " in " + topic;
  console.log(message);
}

//Print our error messages
function printError(error) {
  console.error(error.message);
}

function get(details) {
  //Connect to the API URL (https://teamtreehouse.com/username.json)
  var username = details[1];
  var topic = details[0];
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
          for (var key in profile.points) {
            if (key.toLowerCase() === topic.toLowerCase()) {
              var points = profile.points[key];
            }
          }
          //Print the data
          printMessage(username, profile.badges.length, points, topic);
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
