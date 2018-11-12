import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import conditionActions from 'actions/conditionActions';
import PropTypes from 'prop-types';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { city: '' };
  }

  handleChange = (city) => {
    this.setState({ city });
  }

  handleSelect = (city) => {
    this.setState({ city });
    geocodeByAddress(city)
      .then(results => getLatLng(results[0]))
      .then((latLang) => {
        this.props.setLatLang({ latitude: latLang.lat, longitude: latLang.lng });
      })
      .catch(error => console.error('Error', error));
  }

  renderSuggestions(suggestions, getSuggestionItemProps) {
    const items = suggestions.map((suggestion, key) => {
      return (
        <a key={`suggestion_${key}`} {...getSuggestionItemProps(suggestion)} href="#" className="list-group-item list-group-item-action">{suggestion.description}</a>
      );
    });
    return (
      <div className="list-group">
        {items}
      </div>
    );
  }

  render() {
    const searchOptions = {
      types: ['(cities)'],
    };
    return (
      <PlacesAutocomplete
        value={this.state.city}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div className="width-100">
            <span>{this.props.condition.latitude}, {this.props.condition.longitude}</span>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input form-control width-100',
              })}
            />
            {this.renderSuggestions(suggestions, getSuggestionItemProps)}
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

const mapStateToProps = state => ({
  condition: state.condition,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setLatLang: conditionActions.setLatLang,
  }, dispatch);

LocationSearchInput.propTypes = {
  condition: PropTypes.object.isRequired,
  setLatLang: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocationSearchInput);
