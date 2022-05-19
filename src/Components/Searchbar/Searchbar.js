// import { Notification } from 'react-pnotify';
import './Searchbar.css';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function Searchbar({ searchValue }) {
  const [value, setValue] = useState('');

  // togleNotifi = () => {
  //   return this.setState(prev => ({ notifi: !prev.notifi }));
  // };

  const onChange = e => {
    const { value } = e.target;
    setValue(value.toLowerCase());
  };

  const onSubmit = e => {
    e.preventDefault();

    if (value.trim('') === '') {
      // this.togleNotifi();
      // return setTimeout(() => {
      //   return this.togleNotifi();
      // }, 100);
      return toast.error('Введите что-то в поиск');
    }

    searchValue(value);

    setValue('');
  };

  return (
    <header className="Searchbar">
      <form className="Form" onSubmit={onSubmit}>
        <button type="submit" className="Button">
          <span className="Button-label">Search</span>
        </button>

        <input
          className="Input"
          type="text"
          value={value}
          autoComplete="off"
          placeholder="Search images and photos"
          onChange={onChange}
        />
      </form>
      {/* {notifi && (
          <Notification
            type="error"
            title="Error"
            text="Что-то пошло не так"
            animateIn="bounceInLeft"
            animateOut="bounceOutRight"
            delay={2500}
            shadow={true}
            hide={true}
            nonblock={false}
            desktop={false}
          />
        )} */}
    </header>
  );
}
