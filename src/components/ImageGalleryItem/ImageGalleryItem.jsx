import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.module';

export const ImageGalleryItem = ({
  galleryItem: { webformatURL, largeImageURL, tags },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <GalleryItem className="gallery-item" onClick={toggleModal}>
        <GalleryImg src={webformatURL} alt={tags} />
      </GalleryItem>
      {isModalOpen && (
        <Modal
          largeImageURL={largeImageURL}
          alt={tags}
          onCloseModal={toggleModal}
        />
      )}
    </>
  );
};