import React from 'react';
import css from 'components/Button/Button.module.css';

// Komponent Button reprezentuje przycisk "Load More" używany do wczytywania dodatkowych zdjęć.
// Przyjmuje dwa propsy: onClick - funkcję obsługującą kliknięcie, isButtonVisible - flagę określającą widoczność przycisku.
const Button = ({ onClick, isButtonVisible }) => (
  <button 
  type="button" 
  className={css.Button} 
  onClick={onClick}
  style={{ display: isButtonVisible ? 'block' : 'none' }}
  >
    Load More
  </button>
);

export default Button;
