import React from 'react';
import css from 'components/Loader/loader.module.css'

// Komponent Loader reprezentuje wskaźnik ładowania.
// Składa się z kontenera (div) o klasie css.Loader i animowanego spinnera wewnątrz.
const Loader = () => (
  <div className={css.Loader}>
    <div className={css.LoaderSpinner} />
  </div>
);

export default Loader;
