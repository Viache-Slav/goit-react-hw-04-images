import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from 'components/app.module.css';
import {getUrlForPage} from 'consts/pixabay';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    largeImageURL: '',
    showModal: false,
    isLoading: false,
  };

  // Funkcja do obsługi wprowadzonego zapytania i wywołania API
  handleQuerySubmit = query => {
    this.setState({ query, images: [], page: 1 }, () => {
      this.fetchImages();
    });
  };

  // Funkcja do pobierania danych z API Pixabay
  fetchImages = () => {
    const { query, page } = this.state;

    const url = getUrlForPage(query,page);

    this.setState({ isLoading: true });

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          page: prevState.page + 1,
          isLoading: false,
        }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        this.setState({ isLoading: false });
      });
  };

  // Funkcja do otwierania modalu z większym obrazkiem
  openModal = ({largeImageURL}) => {
    this.setState({ largeImageURL, showModal: true });
  };

  // Funkcja do zamykania modalu
  closeModal = () => {
    this.setState({ largeImageURL: '', showModal: false });
  };

  // Funkcja do obsługi przycisku "Load More"
  handleLoadMore = () => {
    this.fetchImages();
  };

  render() {
    const { images, isLoading, showModal, largeImageURL } = this.state;
    const isButtonVisible = images.length >= 12;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleQuerySubmit} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {isLoading && <Loader />}
        {isButtonVisible && !isLoading && (
          <Button onClick={this.handleLoadMore} isButtonVisible={isButtonVisible} />
        )}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}

export default App;
