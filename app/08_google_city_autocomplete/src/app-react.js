/**
 * Created by Peter on 25.01.2016.
 */
/** @jsx React.DOM */

(function() {
  'use strict';

  var Highlight = {
    componentDidUpdate: function() {
      var node = $(this.getDOMNode());
      node.slideUp();
      node.slideDown();
    }
  };
  var bookList = ["The Hobbit", "The Wheel of Time"];
  var Quiz = React.createClass({
    propTypes: {
      books: React.PropTypes.array.isRequired
    },
    render: function() {
      return <div>
        {this.props.books.map(function(book) {
          return <Book title={book} />
        })}
        </div>;
    },
    mixins: [Highlight]
  });

  var Book = React.createClass({
    propTypes: {
      title: React.PropTypes.string.isRequired
    },
    render: function() {
      return <div><h4>{this.props.title}</h4></div>;
    },
    mixins: [Highlight]
  });

  React.render(<Quiz books={bookList}/>,
    document.getElementById('react-container'));

})();