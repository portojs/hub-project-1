/**
 * Created by Peter on 06.02.2016.
 */

(function() {
  'use strict';

  //var Geosuggest = require('react-geosuggest'),
  //         React = require('react');
  require(['require', 'react-geosuggest'], function(require) {
    var Geosuggest = require('react-geosuggest');
  });

  var App = React.createClass({
    render: function() {
      var fixtures = [
        {label: 'Old Elbe Tunnel, Hamburg', location: {lat: 53.5459, lng: 9.966576}},
        {label: 'Reeperbahn, Hamburg', location: {lat: 53.5495629, lng: 9.9625838}},
        {label: 'Alster, Hamburg', location: {lat: 53.5610398, lng: 10.0259135}}
      ];

      return (
        <div>
          <Geosuggest
            placeholder="Start typing!"
            initialValue="Hamburg"
            fixtures={fixtures}
            onSuggestSelect={this.onSuggestSelect}
            location={new google.maps.LatLng(53.558572, 9.9278215)}
            radius="20" />
        </div>
      )
    },
    onSuggestSelect: function(suggest) {
      console.log(suggest);
    }
  });

  React.render(<App />, document.getElementById('app'));
})();