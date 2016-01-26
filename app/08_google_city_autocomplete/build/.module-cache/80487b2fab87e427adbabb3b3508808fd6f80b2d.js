/**
 * Created by Peter on 25.01.2016.
 */
/** @jsx React.DOM */

(function() {
  'use strict';

  var bookList = ["The Hobbit", "The Wheel of Time"];
  var Quiz = React.createClass({displayName: "Quiz",
    render: function() {
      return React.createElement("div", null, 
        this.props.books.map(function(book) {
          return React.createElement(Book, {title: book})
        })
        );
    }
  });

  var Book = React.createClass({displayName: "Book",
    render: function() {
      return React.createElement("div", null, React.createElement("h4", null, this.props.title));
        }
  });

  React.render(React.createElement(Quiz, {books: bookList}),
    document.getElementById('react-container'));

})();