/**
 * Created by Peter on 25.01.2016.
 */
(function() {
  'use strict';

  var locations = [];
  var input = document.getElementById('searchTextField');
  var options = {
    types: ['(cities)']
  };

  var autocomplete = new google.maps.places.Autocomplete(input, options);

  $("body").on("click", "button", function() {
    var location = $(this).closest("body").find("#searchTextField").val();
    locations.push(location);
    $("#show-location").html(locations.join(', '));
  });

})();