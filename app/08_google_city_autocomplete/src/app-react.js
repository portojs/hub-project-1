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
    handleContinue: function() {
      this.setState(this.getInitialState());
    },
    handleAddGame: function() {
      routie('add');
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
              <input onClick={this.handleContinue} type="button" className="btn btn-default" value="Continue" />
            </div>
          </div>) : <span />
        }
        <div className="row">
          <div className="col-md-12">
            <input className="btn" onClick={this.handleAddGame} id="addGameButton" type="button" value="Add Game" />
          </div>
        </div>
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

  var AddGameForm = React.createClass({
    handleSubmit: function() {
      var data = {
        imageUrl: this.refs.getDOMNode().value
      };
      console.dir(data);
    },
    render: function() {
      return <div className="row">
                <div className="col-md-12">
                  <h1>Add Game</h1>
                  <form role="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <input ref="imageUrl" type="text" className="form-control" placeholder="Image Url" />
                    </div>
                    <div className="form-group">
                      <input ref="answer1" type="text" className="form-control" placeholder="Answer 1" />
                    </div>
                    <div className="form-group">
                      <input ref="answer2" type="text" className="form-control" placeholder="Answer 2" />
                    </div>
                    <div className="form-group">
                      <input ref="answer3" type="text" className="form-control" placeholder="Answer 3" />
                    </div>
                    <div className="form-group">
                      <input ref="answer4" type="text" className="form-control" placeholder="Answer 4" />
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                  </form>
                </div>
             </div>;
    }
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
        React.render(<Quiz data={data}/>,
          document.getElementById('appaloosa'));
    },
    'add': function() {
        React.render(<AddGameForm />,
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