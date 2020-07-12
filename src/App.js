import React from 'react';
import logo from './logo.svg';
import './App.css';

const CELCIUS = "celcius";
const FAHRENHEIT = "fahrenheit";

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      unit: "fahrenheit", 
      weather: null 
    }
  }

  getForecastForCoordinates(lat, long) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ weather: data.main })
      });
  }
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      this.getForecastForCoordinates(coords.latitude, coords.longitude)
    })
  }

  convertKelvinToUnit(kelvin, unit) {
    return Math.round(9/5 * (kelvin - 273) + 32)
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.weather && this.convertKelvinToUnit(this.state.weather.temp, this.state.unit)}</h1>
      </div>
    );
  }
}

export default App;
