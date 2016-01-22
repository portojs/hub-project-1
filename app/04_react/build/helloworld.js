/**
 * Created by Peter on 21.01.2016.
 */

var HelloWorld = React.createClass({displayName: "HelloWorld",
  render: function() {
    return (
      React.createElement("div", null, 
      React.createElement("h1", null, "Hello World"), 
    React.createElement("p", null, "This is some text")
    )
    );
  }
});
React.render(React.createElement(HelloWorld, null), document.body);