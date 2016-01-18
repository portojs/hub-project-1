/**
 * Created by Peter on 18.01.2016.
 */
var http = require("http");
var username = "peterkrevenets";

function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " in JavaScript";
  console.log(message);
}

//Connect to the API URL (https://teamtreehouse.com/username.json)
var request = http.get("http://teamtreehouse.com/" + username + ".json", function(response) {
  console.dir(response);
  //Read the data
  //Parse the data
  //Print the data
});
