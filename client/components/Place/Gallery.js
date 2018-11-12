import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';

class Gallery extends React.PureComponent {
  renderItems() {
    return this.props.place.photos.map((image, key) => {
      return (
        <div key={`gallery_${key}`}>
          <img src={image} />
        </div>
      );
    });
  }

  render() {
    return (
      <Carousel>{this.renderItems()}</Carousel>
    );
  }
}

Gallery.propTypes = {
  place: PropTypes.object.isRequired,
};

export default Gallery;
