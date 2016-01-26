/**
 * Created by Peter on 25.01.2016.
 */
/** @jsx React.DOM */

(function() {
  'use strict';

  var bookList = ["The Hobbit", "The Wheel of Time"];
  var Quiz = React.createClass({
    render: function() {
      return <div>
        {this.props.books.map(function(book) {
          return <Book title={book} />
        })}
        </div>;
    }
  });

  var Book = React.createClass({
    render: function() {
      return <div><h4>{this.props.title}</h4></div>;
        }
  });

  React.render(<Quiz books={bookList}/>,
    document.getElementById('react-container'));

})();