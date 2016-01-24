/**
 * Created by Peter on 24.01.2016.
 */

var Checkbox = React.createClass({displayName: "Checkbox",
  getInitialState: function() {
    return {checked: true};
  },
  handleCheck: function() {
    this.setState({checked: !this.state.checked});
    console.log("Checkbox clicked");
  },
  render: function() {
    var msg;
    if (this.state.checked) {
      msg = "checked";
    } else {
      msg = "unchecked";
    }
    return (
      React.createElement("div", null, 
        React.createElement("input", {type: "checkbox", onChange: this.handleCheck, defaultChecked: this.state.checked}), 
        React.createElement("p", null, "This box is ", msg)
      )
    );
  }
});