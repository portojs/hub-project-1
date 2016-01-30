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

  var Quiz = React.createClass({displayName: "Quiz",
    propTypes: {
      data: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
      return this.props.data.selectGame();
    },
    render: function() {
      return React.createElement("div", null, 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-md-4"}, 
              React.createElement("img", {src: this.state.author.imageUrl, className: "authorimage col-md-3"})
            ), 
            React.createElement("div", {className: "col-md-7"}, 
              this.state.books.map(function(b) {
                return React.createElement(Book, {title: b});
              }, this)
            ), 
            React.createElement("div", {className: "col-md-1"})
          )
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

  var data = [
    {
      name: 'Mark Twain',
      imageUrl: '',
      imageSource: 'Wikimedia Commons',
      imageAttribution: 'Daniel Ogren',
      books: ['Tom Sawyer']
    },
    {
      name: 'J.K. Rowling',
      imageUrl: '',
      imageSource: 'Wikimedia Commons',
      imageAttribution: 'Daniel Ogren',
      books: ['Harry Potter and the Sorcerer\'s Stone']
    },
    {
      name: 'Stephen King',
      imageUrl: '',
      imageSource: 'Wikimedia Commons',
      imageAttribution: 'Pinguino',
      books: ['The Shining', 'IT']
    },
    {
      name: 'CHarles Dickens',
      imageUrl: '',
      imageSource: 'Wikimedia Commons',
      imageAttribution: 'Daniel Ogren',
      books: ['David Copperfield', 'The Tale of Two Cities']
    },
    {
      name: 'Joseph Conrad',
      imageUrl: '',
      imageSource: 'Wikimedia Commons',
      imageAttribution: 'Daniel Ogren',
      books: ['Heart of Darkness']
    },
    {
      name: 'William Shakespeare',
      imageUrl: '',
      imageSource: 'Wikimedia Commons',
      imageAttribution: 'Daniel Ogren',
      books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
    }
  ];

  data.selectGame = function() {
    var books = _.shuffle(this.reduce(function (p, c, i) {
        return p.concat(c.books);
    }, [])).slice(0,4);
    var answer = books[_.random(books.length-1)];
    return {
      books: books,
      author: _.find(this, function(author) {
        return author.books.some(function(title) {
          return title === answer;
        });
      })
    };
  };

  var Echo = React.createClass({displayName: "Echo",
    render: function() {
      return React.createElement("input", {type: "text", onChange: this.handleChange})
    },
    handleChange: function(e) {
      console.log(e.target.value);
    }
  });

  var Timer = React.createClass({displayName: "Timer",
    render: function() {
      return React.createElement("div", {style: {display: 'none'}})
    },
    componentDidMount: function() {
      setInterval(this.props.onInterval, this.props.interval);
    }
  });

  React.render(React.createElement(Quiz, {data: data}),
    document.getElementById('appaloosa'));

  React.render(React.createElement(Echo, null), document.body);

  React.render(React.createElement(Timer, {onInterval: function() {console.log('Tick');}, interval: 1000}),
    document.body);

})();