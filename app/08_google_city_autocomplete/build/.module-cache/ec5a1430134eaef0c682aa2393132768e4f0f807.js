/**
 * Created by Peter on 25.01.2016.
 */
/** @jsx React.DOM */

(function() {
  'use strict';

  var Inner = React.createClass({displayName: "Inner",
    render: function() {
      return (React.createElement("h3", null, "Inner"));
    }
  });

  var Outer = React.createClass({displayName: "Outer",
    render: function() {
      return (
        React.createElement("div", null, 
          React.createElement("p", null, "Outer paragraph"), 
          React.createElement(Inner, null)
        ));
    }
  });

  React.render(React.createElement(Outer, null),
    document.getElementById('react-container'));

})();