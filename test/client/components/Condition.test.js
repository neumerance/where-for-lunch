import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Condition, { TestConditionComponent } from '../../../client/components/Condition/Condition';
import * as factory from '../fixtures/Condition';
import * as placeFactory from '../fixtures/Place';
import configureStore from 'redux-mock-store';

const setup = () => {
  const props = {
    condition: factory.condition,
    setRadius: jest.fn(),
    setCuisines: jest.fn(),
    setPlaces: jest.fn(),
    fetching: jest.fn(),
    place: placeFactory.place,
  }

  const enzymeWrapper = shallow(<TestConditionComponent {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('Place component', () => {
  const { enzymeWrapper } = setup();

  it('Should show disabled search button when coordinates is not set', () => {
    expect(enzymeWrapper.find('button[type="submit"]').props().disabled).toBeTruthy();
  });

  it('Should see a cuisine selection checkboxes', () => {
    expect(enzymeWrapper.find('#cuisine-selection input[type="checkbox"]').length).toEqual(factory.condition.cuisines.length);
  });

  it ('should renders condition', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
});
