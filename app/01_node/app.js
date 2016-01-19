/**
 * Created by Peter on 18.01.2016.
 */
var https = require("https");
var username = "peterkrevenets";

function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " in JavaScript";
  console.log(message);
}

//Connect to the API URL (https://teamtreehouse.com/username.json)
var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response) {
  var body = "";
  //Read the data
  response.on("data", function(chunk) {
    body += chunk;
  });
  response.on("end", function() {
    var profile = JSON.parse(body);
    printMessage(username, profile.badges.length, profile.points.JavaScript);
  });
  //Parse the data
  //Print the data
});

request.on("error", function(error) {
  console.error(error.message);
});