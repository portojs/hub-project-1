/**
 * Created by Peter on 18.01.2016.
 */

var profile = require("./profile.js");
var details = process.argv.slice(2);
profile.get(details);
