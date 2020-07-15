import { CELSIUS, FAHRENHEIT } from './constants';
import React from 'react';
import View from './View';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      unit: FAHRENHEIT,
      weather: null
    }
  }

  getForecastForCoordinates(lat, long) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ weather: data.main })
      });
  }

  async getGeoPosition() {
    return await new Promise((resolve, reject) => {
      function success({ coords }) {
        resolve(coords);
      }
      function error() {
        reject();
      }

      navigator.geolocation.getCurrentPosition(success, error);
    })
  }

  async componentDidMount() {
    const { latitude, longitude } = await this.getGeoPosition();
    this.getForecastForCoordinates(latitude, longitude)
  }

  render() {
    return (
      <div className="App">
        <div>
          <input
            checked={this.state.unit === FAHRENHEIT}
            id={FAHRENHEIT}
            name="unit"
            onChange={() => this.setState({ unit: FAHRENHEIT })}
            type="radio"
          />
          <label htmlFor={FAHRENHEIT}>F</label>

          <input
            checked={this.state.unit === CELSIUS}
            id={CELSIUS}
            name="unit"
            onChange={() => this.setState({ unit: CELSIUS })}
            type="radio"
          />
          <label htmlFor={CELSIUS}>C</label>

        </div>
          {this.state.weather && 
            <View
              temperature={this.state.weather.temp} 
              unit={this.state.unit}
            />
          }
      </div>
    );
  }
}

export default App;
