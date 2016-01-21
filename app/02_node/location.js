/**
 * Created by Peter on 21.01.2016.
 */

var https = require("https");
var http = require("http");

function get() {
  var request = https.get("https://maps.googleapis.com/maps/api/js?key=AIzaSyClSCBQZCn7CIXqzrHk3mfJ43_BWTrPCuk&callback=initMap", function(response) {
    var body = "";
    response.on("data", function(chunk) {
      body += chunk;
    });
    response.on("end", function() {
      console.log(typeof body);
      //var googleMap = JSON.parse(body);
      //console.log("Google request: " + googleMap);
    })
  });
}

module.exports.get = get;