import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const Map = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={props.coordinates}
  >
    <Marker
      position={props.coordinates}
    />
  </GoogleMap>,
);

export default Map;
