import React from 'react';
import View from './View';
import './App.css';

const CELCIUS = "celcius";
const FAHRENHEIT = "fahrenheit";

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
        console.log(data)
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
            checked={this.state.unit === CELCIUS}
            id={CELCIUS}
            name="unit"
            onChange={() => this.setState({ unit: CELCIUS })}
            type="radio"
          />
          <label htmlFor={CELCIUS}>C</label>

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
