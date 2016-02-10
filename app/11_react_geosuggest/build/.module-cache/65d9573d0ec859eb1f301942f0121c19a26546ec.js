var React = require('react'),
  Geosuggest = require('./src/Geosuggest.jsx');

var App = React.createClass({displayName: "App",
  /**
   * Render the example app
   */
  render: function() {
    var fixtures = [
      {label: 'Old Elbe Tunnel, Hamburg', location: {lat: 53.5459, lng: 9.966576}},
      {label: 'Reeperbahn, Hamburg', location: {lat: 53.5495629, lng: 9.9625838}},
      {label: 'Alster, Hamburg', location: {lat: 53.5610398, lng: 10.0259135}}
    ];

    return (
      React.createElement("div", null, 
        React.createElement(Geosuggest, {
          placeholder: "Start typing!", 
          initialValue: "Hamburg", 
          fixtures: fixtures, 
          onSuggestSelect: this.onSuggestSelect, 
          location: new google.maps.LatLng(53.558572, 9.9278215), 
          radius: "20"})
      )
    )
  },

  /**
   * When a suggest got selected
   * @param  {Object} suggest The suggest
   */
  onSuggestSelect: function(suggest) {
    console.log(suggest);
  }
});

React.render(React.createElement(App, null), document.getElementById('app'));