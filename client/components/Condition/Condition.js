import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import conditionActions from '../../actions/conditionActions';
import placeActions from '../../actions/placeActions';
import LocationSearchInput from './LocationSearchInput';
import * as placeApi from '../../services/placeApi';

import styles from './Condition.css';

class Condition extends PureComponent {
  handleOnChangeRadiusAction = (e) => {
    if (!e.target.value) { return; }
    this.props.setRadius(e.target.value);
  }

  handleCuisineSelection = (e, cuisine) => {
    cuisine.selected = e.target.checked;
    const cuisines = this.props.condition.cuisines;
    const cuisineIndex = cuisines.findIndex((c) => {
      return c.label === cuisine.label;
    });
    cuisines[cuisineIndex] = cuisine;
    this.props.setCuisines(cuisines);
  }

  handleSearch = () => {
    this.props.fetching();
    placeApi.searchPlaces(this.props.condition).then((response) => {
      this.props.setPlaces({ places: response });
    });
  }

  renderCuisineCheckboxes = () => {
    return this.props.condition.cuisines.map((cuisine, key) => {
      return (
        <div key={`cuisine_${key}`} className="form-check mr-2">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              name={cuisine.label.toLowerCase()}
              checked={cuisine.selected}
              onChange={(e) => { this.handleCuisineSelection(e, cuisine); }} /> { cuisine.label }
          </label>
        </div>
      );
    });
  }

  renderRadiusDisplay() {
    const km = ((this.props.condition.radius || 1) / 1000).toFixed(2);
    return (
      <span className="ml-2">{km} kilometers</span>
    );
  }

  coordinatesIsSet() {
    const { longitude, latitude } = this.props.condition;
    if (longitude && latitude) { return true; }
    return false;
  }

  render() {
    return (
      <div className={`form-inline ${styles.searchForm} p-4`}>
        <div className="form-group width-100 mb-2">
          <LocationSearchInput />
        </div>
        <div id="cuisine-selection" className="form-group mb-2">
          <label className="mr-3">Cuisines:</label>{this.renderCuisineCheckboxes()}
        </div>
        <div className="form-group width-100 mb-2">
          <label className="width-100">
            <span className="mr-3">Radius:</span>
            <input type="range" min="100" max="40000" value={this.props.condition.radius} onChange={this.handleOnChangeRadiusAction} />
            {this.renderRadiusDisplay()}
          </label>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-sm mb-2" disabled={!this.coordinatesIsSet() || this.props.place.fetching} onClick={this.handleSearch}>
            {this.props.place.fetching ? 'Searching' : 'Search'}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  condition: state.condition,
  place: state.place,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setRadius: conditionActions.setRadius,
    setCuisines: conditionActions.setCuisines,
    setPlaces: placeActions.setPlaces,
    fetching: placeActions.fetching,
  }, dispatch);

Condition.propTypes = {
  condition: PropTypes.object,
  setRadius: PropTypes.func.isRequired,
  setCuisines: PropTypes.func.isRequired,
  setPlaces: PropTypes.func.isRequired,
  fetching: PropTypes.func.isRequired,
  place: PropTypes.object,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Condition);

export const TestConditionComponent = Condition;
