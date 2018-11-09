import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import conditionActions from 'actions/conditionActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './Condition.css';

class Condition extends PureComponent {
  handleConditionActions = (args = {}) => {
    if (!args.type) { return; }
    if (args.type === 'setRadius') {
      if (!args.value) { return; }
      this.props.setRadius(args.value);
    }
    if (args.type === 'updateCuisine') {
      const cuisines = this.props.condition.cuisines;
      const cuisineIndex = cuisines.findIndex((cuisine) => {
        return cuisine.label === args.value.label;
      });
      cuisines[cuisineIndex] = args.value;
      this.props.setCuisines(cuisines);
    }
  }

  handleOnChangeRadiusAction = (e) => {
    this.handleConditionActions({ value: e.target.value, type: 'setRadius' });
  }

  handleOnSearchAction = () => {
    this.handleConditionActions({ type: 'submit' });
  }

  handleCuisineSelection = (e, cuisine) => {
    cuisine.selected = e.target.checked;
    this.handleConditionActions({ type: 'updateCuisine', value: cuisine });
  }

  renderCuisineCheckboxes = () => {
    return this.props.condition.cuisines.map((cuisine, key) => {
      return (
        <div key={`cuisine_${key}`} className="form-check mr-2">
          <label className="form-check-label">
            <input className="form-check-input" type="checkbox" checked={cuisine.selected} onChange={(e) => { this.handleCuisineSelection(e, cuisine); }} /> { cuisine.label }
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
        <div className="form-group mb-2">
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
          <button type="submit" className="btn btn-primary btn-sm mb-2" onClick={this.handleOnSearchAction}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  condition: state.condition,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setRadius: conditionActions.setRadius,
    setCuisines: conditionActions.setCuisines,
  }, dispatch);

Condition.propTypes = {
  condition: PropTypes.object,
  setRadius: PropTypes.func.isRequired,
  setCuisines: PropTypes.func,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Condition);
