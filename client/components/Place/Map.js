import React from 'react';
import PropTypes from 'prop-types';
import styles from './Place.css';

class Map extends React.PureComponent {
  componenDidMount() {
    this.initMap();
  }

  initMap() {
    console.log('google', google);
    google.maps.Map(document.getElementById('map'), { zoom: 8, center: this.props.coordinates });
  }

  render() {
    return (
      <div id="map" className={styles.map}></div>
    );
  }
}

Map.propTypes = {
  coordinates: PropTypes.object.isRequired,
};

export default Map;
