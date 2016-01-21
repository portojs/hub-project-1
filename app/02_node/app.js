/**
 * Created by Peter on 21.01.2016.
 */

var weather = require("./weather.js");
var location = require("./location.js");
//var details = process.argv.slice(2);

location.get();
weather.get();