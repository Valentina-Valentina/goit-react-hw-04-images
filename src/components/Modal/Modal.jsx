import { useEffect } from 'react';

import { Overlay, ModalContent } from './Modal.module';

export const Modal = ({ largeImageURL, alt, onCloseModal }) => {

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onCloseModal]);
  
  const handleBackdropClick = ({ target, currentTarget }) => {
    if (currentTarget === target) {
      onCloseModal();
    }
  };

  return (
    <Overlay className="overlay" onClick={handleBackdropClick}>
      <ModalContent className="modal">
        <img src={largeImageURL} alt={alt} />
      </ModalContent>
    </Overlay>
  );
}