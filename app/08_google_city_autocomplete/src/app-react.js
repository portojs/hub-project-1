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

  var Quiz = React.createClass({
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
    handelContinue: function() {
      this.setState(this.getInitialState());
    },
    render: function() {
      return (<div>
        <div className="row">
          <div className="col-md-4">
            <img src={this.state.author.imageUrl} className="authorimage col-md-3" />
          </div>
          <div className="col-md-7">
              {this.state.books.map(function (b) {
                return <Book onBookSelected={this.handleBookSelected} title={b} />;
              }, this)}
          </div>
          <div className={"col-md-1" + this.state.bgClass}></div>
        </div>
        {this.state.showContinue ? (
          <div className="row">
            <div className="col-md-12">
              <input onClick={this.handleContinue} type="button" className="btn btn-default">Continue</input>
            </div>
          </div>) : <span />}
      </div>
      );
    }
  });

  var Book = React.createClass({
    propTypes: {
      title: React.PropTypes.string.isRequired
    },
    handleClick: function() {
      this.props.onBookSelected(this.props.title);
    },
    render: function() {
      return <div onClick={this.handleClick}>
              <h4>{this.props.title}</h4>
             </div>;
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

  React.render(<Quiz data={data}/>,
    document.getElementById('appaloosa'));

  //React.render(<Echo />, document.body);
  //
  //React.render(<Timer onInterval={function() {console.log('Tick');}} interval={1000} />,
  //  document.body);

})();