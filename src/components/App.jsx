import { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PostsApiService from 'services/PostApiService';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

import { AppContent } from './App.module';

const postApiService = new PostsApiService();

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryPage, setGalleryPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    async function getGalleryItems() {
      await fetchGalleryItems(searchQuery, galleryPage);
    }

    getGalleryItems();    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, galleryPage]);

  const fetchGalleryItems = async (searchQuery, galleryPage) => {
    setLoading(true);
    setError(false);

    postApiService.query = searchQuery;
    postApiService.page = galleryPage;

    await postApiService.fetchPost()
      .then(data => {
        postApiService.hits = data.totalHits;

        const newData = data.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );
        const currentData = [...galleryItems, ...newData];

        setGalleryItems(galleryItems => [...galleryItems, ...newData]);

        if (!data.totalHits) {
          setLoading(false);
          setError(true);

          return toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        if (currentData.length >= data.totalHits) {
          setLoading(false);
          setIsButtonShow(false);
          setError(false);

          return;
        }

        if (galleryPage === 1) {
          toast.success(`Hooray! We found ${postApiService.hits} images.`);
        }

        setLoading(false);
        setIsButtonShow(true);
        setError(false);
      }).catch(() => {
        setLoading(false);
        setIsButtonShow(false);
        setError(true);

        return;
      });
  };

  const handleFormSubmit = (searchQuery) => {
    setSearchQuery(searchQuery);
    setGalleryItems([]);
    setGalleryPage(1);
  };

  const onLoadMore = () => {
    setGalleryPage(galleryPage => galleryPage + 1);
  };

  return (
    <AppContent>
      <Searchbar onSubmit={handleFormSubmit} />

      {error && <h2>Something went wrong! Please try again later and enter search word!</h2>}
      {!error && <ImageGallery galleryItems={galleryItems} />}
      {loading && <Loader />}
      {isButtonShow && <Button onClick={onLoadMore} />}

      {/* Additions  */}
      <ToastContainer autoClose={3000} theme="dark" />
    </AppContent>
  );
};