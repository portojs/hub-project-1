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
  var Quiz = React.createClass({displayName: "Quiz",
    propTypes: {
      books: React.PropTypes.array.isRequired
    },
    render: function() {
      return React.createElement("div", null, 
        this.props.books.map(function(book) {
          return React.createElement(Book, {title: book})
        })
        );
    },
    mixins: [Highlight]
  });

  var Book = React.createClass({displayName: "Book",
    propTypes: {
      title: React.PropTypes.string.isRequired
    },
    render: function() {
      return React.createElement("div", null, React.createElement("h4", null, this.props.title));
    },
    mixins: [Highlight]
  });

  React.render(React.createElement(Quiz, {books: bookList}),
    document.getElementById('appaloosa'));

})();