/**
 * Created by Peter on 25.01.2016.
 */
/** @jsx React.DOM */

(function() {
  'use strict';

  var Inner = React.createClass({
    render: function() {
      return (<h3>Inner</h3>);
    }
  });

  var Outer = React.createClass({
    render: function() {
      return (
        <div>
          <p>Outer paragraph</p>
          <Inner />
        </div>);
    }
  });

  React.render(<Outer />,
    document.getElementById('react-container'));

})();