import './Modal.css';
import { createPortal } from 'react-dom';
import React, { useEffect } from 'react';
const modalRoot = document.querySelector('#modalRoot');

export default function Modal({ bigPhoto, togleModal }) {
  useEffect(() => {
    window.addEventListener('keydown', modalKeydown);

    return () => window.removeEventListener('keydown', modalKeydown);
  });

  const modalKeydown = e => {
    console.log('~ e', e);
    if (e.code === 'Escape') {
      return togleModal();
    }
  };

  const handleOverlay = e => {
    if (e.target === e.currentTarget) {
      return togleModal();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleOverlay}>
      <div className="Modal">
        <img src={bigPhoto} alt="" />
      </div>
    </div>,
    modalRoot,
  );
}
