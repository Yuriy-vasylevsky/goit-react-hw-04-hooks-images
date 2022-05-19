import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

import Searchbar from './Components/Searchbar/Searchbar';
import ImageGalleryItem from './Components/ImageGalleryItem/ImageGalleryItem';
import ImageGallery from './Components/ImageGallery/ImageGallery';
// import Button from './Components/Button/Button';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [value, setValue] = useState('');
  // const [error, setError] = useState(true);

  const searchValue = value => {
    setValue(value);
  };

  return (
    <div className="App">
      <Searchbar searchValue={searchValue} />
      <ImageGallery>
        <ImageGalleryItem searchValue={value} />
      </ImageGallery>
      <ToastContainer autoClose={2000} />
    </div>
  );
}
