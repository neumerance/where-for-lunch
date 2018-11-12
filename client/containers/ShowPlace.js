import React from 'react';
import PropTypes from 'prop-types';
import Place from '../components/Place/Place';

class ShowPlace extends React.Component {
  render() {
    return (
      <div className="show-place">
        <Place params={this.props.match.params} />
      </div>
    );
  }
}

ShowPlace.propTypes = {
  match: PropTypes.object,
};

export default ShowPlace;
