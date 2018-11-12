export const condition = {
  radius: 500,
  latitude: 0,
  longitude: 0,
  cuisines: [
    {
      label: 'American',
      selected: false,
    },
    {
      label: 'Japanese',
      selected: false,
    },
    {
      label: 'Chinese',
      selected: false,
    },
    {
      label: 'Mexican',
      selected: false,
    },
    {
      label: 'Italian',
      selected: false,
    },
    {
      label: 'Thai',
      selected: false,
    },
    {
      label: 'Filipino',
      selected: false,
    },
  ],
};

export const setupGoogleMock = () => {
  /*** Mock Google Maps JavaScript API ***/
  window.google ={
    maps:{
        Marker:class{},
        Map:class{ setTilt(){} fitBounds(){}},
        LatLngBounds:class{},
        places:{
            Autocomplete: class {},
            AutocompleteService:class{},
            PlacesServiceStatus: {
                INVALID_REQUEST: 'INVALID_REQUEST',
                NOT_FOUND: 'NOT_FOUND',
                OK: 'OK',
                OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
                REQUEST_DENIED: 'REQUEST_DENIED',
                UNKNOWN_ERROR: 'UNKNOWN_ERROR',
                ZERO_RESULTS: 'ZERO_RESULTS',
            },
            PlacesAutocomplete:{
                INVALID_REQUEST: 'INVALID_REQUEST',
                NOT_FOUND: 'NOT_FOUND',
                OK: 'OK',
                OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
                REQUEST_DENIED: 'REQUEST_DENIED',
                UNKNOWN_ERROR: 'UNKNOWN_ERROR',
                ZERO_RESULTS: 'ZERO_RESULTS',
            }
        },

        MarkerClusterer:class{},
        Geocoder:class{},
    }
  };
};