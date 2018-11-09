import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';

class Lists extends React.PureComponent {
  thead() {
    const width120 = { width: 120 };
    return (
      <thead>
        <tr>
          <th style={width120}>Ratings</th>
          <th scope="col">Name</th>
          <th scope="col">Address</th>
        </tr>
      </thead>
    );
  }

  tbody() {
    return (
      <tbody>
        {this.rows()}
      </tbody>
    );
  }

  rows() {
    return this.props.place.places.map((place, key) => {
      return (
        <tr key={`place_${key}`}>
          <td>
            <StarRatingComponent name={`rate_${place.id}`} starCount={5} value={place.rating} editing={false} />
          </td>
          <td>{place.name}</td>
          <td>{place.address}</td>
        </tr>
      );
    });
  }

  render() {
    if (!this.props.place.places.length) { return null; }
    return (
      <table className="table table-hover table-dark">
        {this.thead()}
        {this.tbody()}
      </table>
    );
  }
}

const mapStateToProps = state => ({
  place: state.place,
});

Lists.propTypes = {
  place: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  {},
)(Lists);
