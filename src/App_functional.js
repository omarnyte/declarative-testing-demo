import { CELSIUS, FAHRENHEIT } from './constants';
import RadioInputField from './RadioInputField';
import React, { useEffect, useState } from 'react';
import View from './View';
import './App.css';

function App() {
  const [unit, setUnit] = useState(FAHRENHEIT);
  const [weather, setWeather] = useState(null);

  function getCurrentWeatherForCoordinates(lat, long) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)
      .then(response => response.json())
      .then(data => setWeather(data.main));
  }

  async function getGeoPosition() {
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

  useEffect(() => {
    async function getGeolocation() {
      const { latitude, longitude } = await getGeoPosition();
      getCurrentWeatherForCoordinates(latitude, longitude)
    }

    getGeolocation();
  }, [])


  return (
    <div className="App">
      <div>
        <RadioInputField
          checked={unit === FAHRENHEIT}
          id={FAHRENHEIT}
          groupName="unit"
          labelText="F"
          onChange={() => setUnit(FAHRENHEIT)}
          type="radio"
        />

        <RadioInputField
          checked={unit === CELSIUS}
          id={CELSIUS}
          groupName="unit"
          labelText="C"
          onChange={() => setUnit(CELSIUS)}
          type="radio"
        />

      </div>
      {weather &&
        <View
          temperatureInKelvin={weather.temp}
          unit={unit}
        />
      }
    </div>
  );
}

export default App;
