/**
 * Created by Peter on 25.01.2016.
 */
/** @jsx React.DOM */

(function() {
  'use strict';

  var SearchField = React.createClass({displayName: "SearchField",
    render: function() {
      return (React.createElement("input", {className: "new-search"}));
    }
  });

  React.render(React.createElement(SearchField, {data: "foo"}),
    document.getElementById('react-container'));

})();