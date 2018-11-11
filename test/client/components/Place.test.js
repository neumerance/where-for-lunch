import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Place, { TestPlaceComponent } from 'client/components/Place/Place';
import * as factory from './fixtures/Place';
import configureStore from 'redux-mock-store';

const setup = () => {
  const props = {
    params: { id: factory.place.id },
    selectedPlace: factory.place,
    setPlace: jest.fn(),
    fetching: jest.fn(),
  }

  const enzymeWrapper = shallow(<TestPlaceComponent {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('Place component', () => {
  const { enzymeWrapper } = setup();

  it('should have title', () => {
    expect(enzymeWrapper.find('h4').text()).toEqual(factory.place.name);
    expect(enzymeWrapper.find('div.categories > span').length).toEqual(factory.place.categories.length);
    expect(enzymeWrapper.find('ul.contacts > li.address').text()).toEqual(factory.place.location.display_address.join(' '));
  });
});

const mockStore = configureStore();

describe('connected Place component', () => {
  let store;
  let wrapper;
  let httpMock;

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    store = mockStore({ 
      place: { 
        selectedPlace: {} 
      } 
    });
    httpMock.onGet(`http://localhost:3001/api/places/${factory.place.id}`).reply(200, factory.place);
    wrapper = mount(<Provider store={store}><Place params={{ id: factory.place.id }} /></Provider>);
  });

  it ('should renders place data', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
