/**
 * Created by Peter on 24.01.2016.
 */

var Board = React.createClass({
  propTypes: {
    count: function(props, propName) {
      if (typeof props[propName] !== "number") {
        return new Error("The count property must be a number.");
      }
      if (props[propName] > 100) {
        return new Error("Creating " + props[propName] + " notes is ridiculous!");
      }
    }
  },
  getInitialState: function() {
    return {
      notes: []
    };
  },
  nextId: function() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  },
  componentWillMount: function() {
    var self = this;
    if(this.props.count) {
      $.getJSON("http://baconipsum.com/api/?type=all-meat&sentences=" +
      this.props.count + "&start-with-lorem=1&callback=?", function(results) {
        results[0].split('. ').forEach(function(sentence) {
          self.add(sentence.substring(0,40));
        });
      });
    }
  },
  add: function(text) {
    var arr = this.state.notes;
    arr.push({id: this.nextId(), note: text});
    this.setState({notes: arr});
  },
  update: function(newText, id) {
    var arr = this.state.notes;
    arr[id].note = newText;
    this.setState({notes: arr});
  },
  remove: function(id) {
    var arr = this.state.notes;
    arr.splice(id, 1);
    this.setState({notes: arr});
  },
  eachNote: function(note, id) {
    return (
      <Note key={note.id}
        index={id}
        onChange={this.update}
        onRemove={this.remove}
      >{note.note}</Note>
    );
  },
  render: function() {
    return (<div className="board">
      {this.state.notes.map(this.eachNote)}
      <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
        onClick={this.add.bind(null, "New Note")} />
    </div>
    );
  }
});