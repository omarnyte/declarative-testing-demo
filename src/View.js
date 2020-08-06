import { CELSIUS, FAHRENHEIT } from './constants';
import React from 'react';
import './View.css';

function View ({ temperature, unit }) {
  const convertKelvinToUnit = (kelvin, unit) => {
    switch (unit) {
      case FAHRENHEIT:
        return Math.round(9 / 5 * (kelvin - 273) + 32)
      case CELSIUS:
        return Math.round(kelvin - 273.15)
      default:
        return Math.round(kelvin);
    }
  }

  return (
    <h1>{convertKelvinToUnit(temperature, unit)}°</h1>
  )
}

export default View;