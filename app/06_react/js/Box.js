/**
 * Created by Peter on 24.01.2016.
 */

var Box = React.createClass( {
  getDefaultProps: function() {
    return {
      colorIndex: -1,
      colors: "Red,DarkMagenta,Salmon,Chartreuse"
    }
  },
  getInitialState: function() {
    return {
      backgroundColor: "blue",
      height: 200,
      width: 200
    }
  },
  update: function() {
    this.setProps({colorIndex: this.props.colorIndex + 1});
  },
  componentWillReceiveProps: function(nextProps) {
    var color = this.props.colors.split(',')[nextProps.colorIndex];
    if(!color) {this.setProps({colorIndex: 0})}
    this.setState({backgroundColor: color});
  },
  render: function() {
    return <div style={this.state} onClick={this.update}></div>;
  }
});