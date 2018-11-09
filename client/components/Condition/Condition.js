import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Condition.css';

export default class Condition extends PureComponent {
  static propTypes = {
    condition: PropTypes.object,
    action: PropTypes.func,
  };

  handleOnBlurRadiusAction = (e) => {
    this.props.action({ value: e.target.value, type: 'setRadius' });
  }

  handleOnSearchAction = () => {
    this.props.action({ type: 'submit' });
  }

  handleCuisineSelection = (e, cuisine) => {
    cuisine.selected = e.target.checked;
    this.props.action({ type: 'updateCuisine', value: cuisine });
  }

  renderCuisineCheckboxes = () => {
    console.log('this.props.condition.cuisines', this.props.condition.cuisines);
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

  render() {
    return (
      <div className={`form-inline ${styles.searchForm} p-4`}>
        <div className="form-group mx-sm-3 mb-2">
          <label className="mr-3">Cuisines:</label>{this.renderCuisineCheckboxes()}
        </div>
        <div className="form-group mx-sm-3 mb-2">
          <label className="mr-3">Radius:</label>
          <input type="number" className="form-control" placeholder="Radius" onBlur={this.handleOnBlurRadiusAction} />
        </div>
        <button type="submit" className="btn btn-primary mb-2" onClick={this.handleOnSearchAction}>
          Search
        </button>
      </div>
    );
  }
}
