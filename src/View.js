import React from 'react';

const CELCIUS = "celcius";
const FAHRENHEIT = "fahrenheit";

function View ({ temperature, unit }) {
  const convertKelvinToUnit = (kelvin, unit) => {
    switch (unit) {
      case FAHRENHEIT:
        return Math.round(9 / 5 * (kelvin - 273) + 32)
      case CELCIUS:
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