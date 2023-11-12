import React from 'react';
import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

// Komponent ImageGalleryItem reprezentuje pojedynczy element galerii zdjęć.
// Przyjmuje dwa propsy: image - obiekt reprezentujący zdjęcie, onClick - funkcję obsługującą kliknięcie na zdjęcie.
const ImageGalleryItem = ({ image, onClick }) => (
  <li key={image.id} className={css.ImageGalleryItem}>
    <img
      src={image.webformatURL}
      alt=""
      className={css.ImageGalleryItemImage}
      onClick={onClick}
    />
  </li>
);

export default ImageGalleryItem;