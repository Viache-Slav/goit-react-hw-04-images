import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  // Stan lokalny przechowujący aktualne zapytanie
  const [query, setQuery] = useState('');

  // Obsługa zmiany wartości w polu wyszukiwania
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Obsługa przesłania formularza - wywołanie przekazanej funkcji onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  // Struktura JSX komponentu Searchbar
  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};