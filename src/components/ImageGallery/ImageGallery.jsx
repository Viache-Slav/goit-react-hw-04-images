import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from 'components/ImageGallery/ImageGallery.module.css';

// Komponent ImageGallery, odpowiedzialny za wyświetlanie listy obrazów
const ImageGallery = ({ images, onImageClick }) => (
  <ul className={css.ImageGallery}>
    {images.map((image, index) => (
      <ImageGalleryItem
        key={index}
        image={image}
        onClick={() => onImageClick(image)}
      />
    ))}
  </ul>
);

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};