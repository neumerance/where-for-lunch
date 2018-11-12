import React from 'react';
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPlaceDetails } from '../../services/placeApi';
import placeActions from '../../actions/placeActions';
import Map from './Map';
import Gallery from './Gallery';
import styles from './Place.css';

class Place extends React.Component {
  componentDidMount() {
    this.props.fetching();
    getPlaceDetails(this.props.params.id).then((response) => {
      this.props.setPlace({ selectedPlace: response });
    });
  }

  renderCategories() {
    if (!this.props.selectedPlace.categories) { return null; }
    return this.props.selectedPlace.categories.map((category, key) => {
      return (
        <span key={`category_${key}`} className="badge badge-primary mr-1">{category.title}</span>
      );
    });
  }

  openingDisplay() {
    if (this.props.selectedPlace.is_closed) {
      return (
        <span className="badge badge-danger">CLOSED</span>
      );
    }
    return (
      <span className="badge badge-success">OPEN</span>
    );
  }

  render() {
    const place = this.props.selectedPlace;
    if (!place.id) { return null; }
    const coordinates = { lat: place.coordinates.latitude, lng: place.coordinates.longitude };
    return (
      <div className={styles.place}>
        <div className="row">
          <div className="col-sm-7">
            <span className="float-right">{this.openingDisplay()}</span>
            <h4>{place.name}</h4>
            <StarRatingComponent name={`rate_${place.id}`} starCount={5} value={place.rating} editing={false} />
            <div>{this.renderCategories()}</div>
            <ul className={styles.contacts}>
              <li>
                <span className="fa fa-home mr-2"></span>{place.location.display_address}
              </li>
              <li>
                <span className="fa fa-phone mr-2"></span>{place.display_phone}
              </li>
            </ul>
          </div>
          <div className="col-sm-5">
            <Map
              coordinates={coordinates}
              containerElement={<div style={{ height: `240px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </div>
        <div className="mt-3">
          <Gallery place={place} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedPlace: state.place.selectedPlace,
});

Place.propTypes = {
  params: PropTypes.object.isRequired,
  selectedPlace: PropTypes.object.isRequired,
  setPlace: PropTypes.func.isRequired,
  fetching: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setPlace: placeActions.setPlace,
    fetching: placeActions.fetching,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Place);
