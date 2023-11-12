import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from 'components/app.module.css';
import { getUrlForPage } from 'consts/pixabay';
import { nanoid } from 'nanoid';

const App = () => {
  // Stan aplikacji
  const [query, setQuery] = useState('');  // Stan dla przechowywania zapytania
  const [images, setImages] = useState([]);  // Stan dla przechowywania listy obrazków
  const [page, setPage] = useState(1);  // Stan dla przechowywania numeru strony
  const [largeImageURL, setLargeImageURL] = useState('');  // Stan dla przechowywania URL dużego obrazka
  const [showModal, setShowModal] = useState(false);  // Stan do określania czy modal jest widoczny
  const [isLoading, setIsLoading] = useState(false);  // Stan do określania, czy trwa ładowanie danych

  // Obsługa przesłania nowego zapytania
  const handleQuerySubmit = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    fetchImages();
  };

  // Pobieranie danych z Pixabay API
  const fetchImages = () => {
    const url = getUrlForPage(query, page);
    setIsLoading(true);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Tworzenie nowej tablicy obrazków z unikalnymi kluczami
        const newImages = data.hits.map((hit) => ({
          ...hit,
          id: nanoid(),
        }));
        setImages((prevImages) => [...prevImages, ...data.hits]);
        setPage((prevPage) => prevPage + 1);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  };

  // Funkcja otwierająca modal z dużym obrazkiem
  const openModal = ({ largeImageURL }) => {
    setLargeImageURL(largeImageURL);
    setShowModal(true);
  };

  // Funkcja zamykająca modal
  const closeModal = () => {
    setLargeImageURL('');
    setShowModal(false);
  };

  // Obsługa przycisku "Load More" do wczytywania kolejnych obrazków
  const handleLoadMore = () => {
    fetchImages();
  };

  // Określenie czy przycisk "Load More" powinien być widoczny
  const isButtonVisible = images.length >= 12;

  // Struktura JSX komponentu
  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleQuerySubmit} />
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {isButtonVisible && !isLoading && (
        <Button onClick={handleLoadMore} isButtonVisible={isButtonVisible} />
      )}
      {showModal && <Modal largeImageURL={largeImageURL} onClose={closeModal} />}
    </div>
  );
};

export default App;