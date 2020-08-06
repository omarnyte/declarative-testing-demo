import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import { configure } from 'enzyme';
import fetchMock from 'fetch-mock';
import { mount } from 'enzyme';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

configure({ adapter: new Adapter() });

function getInputByLabelText(wrapper, labelText) {
  const labelElement = wrapper.findWhere((node) => {
    return node.type() === "label" && node.text() === labelText
  });
  const labelId = labelElement.prop('htmlFor');

  return wrapper.find(`input[id="${labelId}"]`);
}

const mockGeolocation = {
  getCurrentPosition: jest.fn()
    .mockImplementation((success) => Promise.resolve(success({
      coords: {
        latitude: 100,
        longitude: 50
      }
    })))
};

describe('the weather application', () => {
  beforeEach(() => {
    global.navigator.geolocation = mockGeolocation;
    fetchMock.get(/api.openweathermap.org\/data\/2.5\/weather/, {
      main: {
        temp: 291.65,
      }
    })
  });

  afterEach(() => {
    fetchMock.restore()
  });

  test('clicking the Fahrenheit option displays the weather in Fahrenheit', async () => {
    // fetchMock configured in beforeEach
    const wrapper = mount(<App />);

    const fahrenheitInput = getInputByLabelText(wrapper, 'F');
    fahrenheitInput.simulate('change');

    await ReactTestUtils.act(async () => {
      await fetchMock.flush();
    });
    wrapper.update();

    expect(wrapper.find('h1').text()).toEqual('66°')
  });

  test('clicking the Celcius option displays the weather in Celcius', async () => {
    // fetchMock configured in beforeEach
    const wrapper = mount(<App />);

    const celciusInput = getInputByLabelText(wrapper, 'C');
    celciusInput.simulate('change');

    await ReactTestUtils.act(async () => {
      await fetchMock.flush();
    });
    wrapper.update();

    expect(wrapper.find('h1').text()).toEqual('19°')
  });
});
