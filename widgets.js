var Item = React.createClass({
  render: function(){
    return (
      <li onClick={this.props.onClick}>{this.props.name}</li>
    );
  }
});

var AutoComplete = React.createClass({
  getInitialState: function() {
    return { charsTyped: '' };
  },
  handleChange: function(event) {
    event.preventDefault();
    this.setState({charsTyped: event.target.value});
  },
  handleClick: function(name){
    this.setState({charsTyped: name});
  },
  render: function() {
    var searchString = "^" + this.state.charsTyped.toLowerCase();
    var items = this.props.items.filter(function(item) {
      return item.toLowerCase().match(searchString);
    });

    return (
      <div>
        <input
          type="text"
          placeholder="some name"
          onChange={ this.handleChange }
          value={this.state.charsTyped }
        />
        <ul>
          { items.map(function(item, idx) {
            return (<Item onClick={this.handleClick.bind(this, item)} name={item}/>)
          }.bind(this)) }
        </ul>
      </div>
    );
  }
});

React.render(
  <AutoComplete items={
    ['Honest Abe', 'Tricky Dick', 'Slick Willy', 'Old Hickory', 'Tiny Tim']
  } />,
  document.getElementById('auto-complete')
);


var WeatherClock = React.createClass({
  getInitialState: function () {
    return { currentTime: new Date() };
  },

  componentDidMount: function () {
    this.timer = setInterval(this.tick, 1000);
  },

  componentWillUnmount: function () {
    clearInterval(this.timer);
  },

  tick: function () {
    this.setState({ currentTime: new Date() });
  },

  render: function () {
    return (
      <div>
        <pre>{ this.state.currentTime.toString() }</pre>
        <Weather />
      </div>
    );
  }
});

var Weather = React.createClass({
  getInitialState: function () {
    return {weatherConditions: {}};
  },
  componentDidMount: function () {
    // this.setState
    ajax(
      "get",
      "http://api.openweathermap.org/data/2.5/weather?zip=94103,us",
      this.ajaxReturned
    );
  },
  ajaxReturned: function (responseText) {
    var responseJSON = JSON.parse(responseText);
    this.setState({ weatherConditions: responseJSON.main });
  },
  render: function() {
    return (
      <ul>
        { Object.keys(this.state.weatherConditions).map(function(key) {
          return <li key={ key }>{ key }: { this.state.weatherConditions[key] }</li>
        }.bind(this)) }
      </ul>
    );
  }

});

var ajax = function (method, url, callback) {
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE ) {
         if(xhr.status == 200){
            callback(xhr.responseText);
         }
         else if(xhr.status == 400) {
            alert('There was an error 400')
         }
         else {
             alert('something else other than 200 was returned')
         }
      }
  }
  xhr.open(method, url, true);
  xhr.send();
};

React.render(
  <WeatherClock />,
  document.getElementById('weather-clock')
);
