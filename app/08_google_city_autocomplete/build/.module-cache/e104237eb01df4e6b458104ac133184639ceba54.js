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
      return _.extend({
        bgClass: 'neutral',
        showContinue: false
      }, this.props.data.selectGame());
    },
    handleBookSelected: function(title) {
      var isCorrect = this.state.checkAnswer(title);
      this.setState({
        bgClass: isCorrect ? 'pass' : 'fail',
        showContinue: isCorrect
      });
    },
    handleContinue: function() {
      this.setState(this.getInitialState());
    },
    handleAddGame: function() {
      routie('add');
    },
    render: function() {
      return (React.createElement("div", null, 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-md-4"}, 
            React.createElement("img", {src: this.state.author.imageUrl, className: "authorimage col-md-3"})
          ), 
          React.createElement("div", {className: "col-md-7"}, 
              this.state.books.map(function (b) {
                return React.createElement(Book, {onBookSelected: this.handleBookSelected, title: b});
              }, this)
          ), 
          React.createElement("div", {className: "col-md-1" + this.state.bgClass})
        ), 
        this.state.showContinue ? (
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-md-12"}, 
              React.createElement("input", {onClick: this.handleContinue, type: "button", className: "btn btn-default", value: "Continue"})
            )
          )) : React.createElement("span", null), 
        
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-md-12"}, 
            React.createElement("input", {className: "btn", onClick: this.handleAddGame, id: "addGameButton", type: "button", value: "Add Game"})
          )
        )
      )
      );
    }
  });

  var Book = React.createClass({displayName: "Book",
    propTypes: {
      title: React.PropTypes.string.isRequired
    },
    handleClick: function() {
      this.props.onBookSelected(this.props.title);
    },
    render: function() {
      return React.createElement("div", {onClick: this.handleClick}, 
              React.createElement("h4", null, this.props.title)
             );
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
      }),
      checkAnswer: function(title) {
        return this.author.books.some(function(t) {
          return t === title;
        });
      }
    };
  };

  //var Echo = React.createClass({
  //  render: function() {
  //    return <input type="text" onChange={this.handleChange} />
  //  },
  //  handleChange: function(e) {
  //    console.log(e.target.value);
  //  }
  //});
  //
  //var Timer = React.createClass({
  //  propTypes: {
  //    onInterval: React.PropTypes.func.isRequired,
  //    interval: React.PropTypes.number.isRequired
  //  },
  //  render: function() {
  //    return <div style={{display: 'none'}}></div>
  //  },
  //  componentDidMount: function() {
  //    setInterval(this.props.onInterval, this.props.interval);
  //  }
  //});

  //var ControlledComponent = React.createClass({
  //  getInitialState: function() {
  //    return {
  //      init: 'init'
  //    };
  //  },
  //  handleChange: function(e) {
  //    this.setState({init: e.target.value});
  //  },
  //  render: function() {
  //    return <input type="test" value={this.state.init} onChange={this.handleChange} />
  //  }
  //});

  //var UncontrolledComponent = React.createClass({
  //  handleChange: function(e) {
  //    console.log(e.target.value);
  //  },
  //  render: function() {
  //    return (<div>
  //              <input ref="first" type="text" defaultValue="init" onChange={this.handleChange} />
  //              <input ref="second" type="text" />
  //              <button onClick={this.handleAdd}>Add</button>
  //              <input ref="result" type="text" />
  //            </div>);
  //  },
  //  componentDidMount: function() {
  //    this.refs.first.getDOMNode().value = 20;
  //  },
  //  handleAdd: function() {
  //    this.refs.result.getDOMNode().value = parseFloat(this.refs.first.getDOMNode().value)
  //    + parseFloat(this.refs.second.getDOMNode().value);
  //  }
  //});

  routie({
    '': function() {
        React.render(React.createElement(Quiz, {data: data}),
          document.getElementById('appaloosa'));
    }
  });


  //React.render(<Echo />, document.body);
  //
  //React.render(<Timer onInterval={function() {console.log('Tick');}} interval={1000} />,
  //  document.body);
  //React.render(<ControlledComponent />, document.body);
  //React.render(<UncontrolledComponent />, document.body);


})();