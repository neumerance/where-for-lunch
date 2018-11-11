import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Place, { TestPlaceComponent } from '../../../client/components/Place/Place';
import * as factory from '../fixtures/Place';
import configureStore from 'redux-mock-store';

const setup = () => {
  const props = {
    params: { id: factory.place.selectedPlace.id },
    selectedPlace: factory.place.selectedPlace,
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
    const selectedPlace = factory.place.selectedPlace;
    expect(enzymeWrapper.find('h4').text()).toEqual(selectedPlace.name);
    expect(enzymeWrapper.find('div.categories > span').length).toEqual(selectedPlace.categories.length);
    expect(enzymeWrapper.find('ul.contacts > li.address').text()).toEqual(selectedPlace.location.display_address.join(' '));
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
    httpMock.onGet(`http://localhost:3001/api/places/${factory.place.selectedPlace.id}`).reply(200, factory.place.selectedPlace);
    wrapper = mount(<Provider store={store}><Place params={{ id: factory.place.selectedPlace.id }} /></Provider>);
  });

  it ('should renders place data', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
