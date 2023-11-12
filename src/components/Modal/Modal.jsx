import React, { useEffect, useState } from 'react';
import css from './Modal.module.css';

// Komponent Modal, odpowiedzialny za wyświetlanie powiększonego obrazu w modalu
const Modal = ({ largeImageURL, onClose }) => {
  // Stan dla śledzenia czy obraz jest powiększony
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  // Obsługa kliknięcia na obrazie, zmieniająca stan powiększenia obrazu
  const handleImageClick = () => {
    setIsImageExpanded(!isImageExpanded);
  };

  // Efekt używający hooka useEffect do obsługi zdarzenia klawisza Escape
  useEffect(() => {
    // Funkcja obsługująca naciśnięcie klawisza
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        onClose(); // Wywołanie funkcji onClose przekazanej jako prop
      }
    };

    // Dodanie nasłuchiwania na zdarzenie klawisza
    window.addEventListener('keydown', handleKeyPress);

    // Funkcja czyszcząca efekt (usuwanie nasłuchiwania) po zamknięciu komponentu
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]); // Efekt jest wywoływany ponownie tylko wtedy, gdy wartość onClose się zmieni

  // Renderowanie komponentu Modal z warstwą Overlay, obrazem i obsługą kliknięcia na overlay
  return (
    <div className={css.Overlay} onClick={onClose}>
      <div className={css.Modal}>
        <img
          className={css.Image}
          src={largeImageURL}
          alt="modal"
          onClick={handleImageClick}
        />
      </div>
    </div>
  );
};

export default Modal;

