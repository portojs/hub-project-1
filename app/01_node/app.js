/**
 * Created by Peter on 18.01.2016.
 */

var profile = require("./profile.js");
var users = process.argv.slice(2);
users.forEach(profile.get);
