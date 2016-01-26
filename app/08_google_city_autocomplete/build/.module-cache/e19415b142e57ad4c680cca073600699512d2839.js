/**
 * Created by Peter on 25.01.2016.
 */
/** @jsx React.DOM */

(function() {
  'use strict';

  var searchField = React.createClass({displayName: "searchField",
    render: function() {
      return React.createElement("input", {id: "new-search"}, "test")
    }
  });

  React.renderComponent(React.createElement("searchField", {data: "foo"}),
    document.getElementById('react-container'));

})();