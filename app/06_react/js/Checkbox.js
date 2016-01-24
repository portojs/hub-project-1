/**
 * Created by Peter on 24.01.2016.
 */

var Checkbox = React.createClass({
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
      <div>
        <input type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.checked} />
        <p>This box is {msg}</p>
      </div>
    );
  }
});