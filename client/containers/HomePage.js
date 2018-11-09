import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Button from 'components/Button/Button';
import placeActions from 'actions/placeActions';
import conditionActions from 'actions/conditionActions';
// import Place from 'components/Place/Place';
import Condition from 'components/Condition/Condition';

class HomePage extends Component {
  componentDidMount() {
    console.log('props', this.props);
  }

  handleOnClick = () => {
    this.props.fetchPlaces(this.props.condition);
  }

  handleConditionActions = (args = {}) => {
    if (!args.type) { return; }
    if (args.type === 'setRadius') {
      if (!args.value) { return; }
      // if (!(args.value > 0)) { alert('Radius must be a positive number'); }
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
    if (args.type === 'submit') { this.handleOnClick(); }
  }

  render() {
    return (
      <div className="row">
        <Condition condition={this.props.condition} action={this.handleConditionActions}/>
      </div>
    );
  }

  coordinatesIsSet() {
    const { longitude, latitude } = this.props.condition;
    if (longitude && latitude) { return true; }
    return false;
  }
}

const mapStateToProps = state => ({
  condition: state.condition,
  place: state.place,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchPlaces: placeActions.fetchPlaces,
    setRadius: conditionActions.setRadius,
    setCuisines: conditionActions.setCuisines,
  }, dispatch);

HomePage.propTypes = {
  condition: PropTypes.object,
  place: PropTypes.object,
  fetchPlaces: PropTypes.func.isRequired,
  setRadius: PropTypes.func.isRequired,
  setCuisines: PropTypes.func,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
