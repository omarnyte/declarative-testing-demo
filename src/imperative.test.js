import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import { configure } from 'enzyme';
import fetchMock from 'fetch-mock';
import React from 'react';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

const mockGeolocation = {
  getCurrentPosition: jest.fn()
    .mockImplementation((success) => Promise.resolve(success({
      coords: {
        latitude: 100,
        longitude: 50
      }
    })))
};

beforeEach(() => {
    fetchMock.restore();
    global.navigator.geolocation = mockGeolocation;
});

describe('#getForecastForCoordinates', () => {
  test('fetches the weather', () => {
    const apiUrlRegEx = /api.openweathermap.org\/data\/2.5\/weather/; 
    const returnedJSON = {};
    fetchMock.get(apiUrlRegEx, returnedJSON);

    const wrapper = shallow(<App />);
    wrapper.instance().getForecastForCoordinates(50, 100);

    expect(fetchMock.called(apiUrlRegEx)).toBe(true);
  });
});

describe('the radio inputs', () => {
  describe('the Fahrenheit option', () => {
    test('its onChange function updates the unit in state to fahrenheit', () => {
      const wrapper = shallow(<App />);
      const fahrenheitInput = wrapper.find("input[id='fahrenheit']");
      fahrenheitInput.prop('onChange')();

      expect(wrapper.state('unit')).toEqual('fahrenheit')
    });
  })

  describe('the Celsius option', () => {
    test('its onChange function updates the unit in state to celcius', () => {
      const wrapper = shallow(<App />);
      const celsiusInput = wrapper.find("input[id='celsius']");
      celsiusInput.prop('onChange')();

      expect(wrapper.state('unit')).toEqual('celsius')
    });
  })
})

describe('the View component', () => {
  test('it passes the temperature to the View component', () => {
    const wrapper = shallow(<App />);
    const temp = 250;
    wrapper.setState({ weather: { temp }});

    expect(wrapper.find('View').prop('temperature')).toEqual(temp);
  });

  test('it passes the unit to the View component', () => {
    const wrapper = shallow(<App />);
    const unit = 'Some Unit of Measurement';
    wrapper.setState({ weather: { temp: 200 }, unit });

    expect(wrapper.find('View').prop('unit')).toEqual(unit);
  });
});
