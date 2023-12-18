import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import getImage from 'services/api';
import styles from './App.module.css';

const App = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalShow, setModalShow] = useState({});
  const [loadMore, setLoadMore] = useState(false);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchText === '') return;

      setIsLoading(true);
      setLoadMore(false);
      setGallery([]);
      setPage(1);

      const newGallery = await getImage(searchText, 1);

      if (newGallery.length > 0) {
        setGallery(newGallery);
        setIsLoading(false);
        setLoadMore(newGallery.length >= 12);
      } else {
        setIsLoading(false);
        setLoadMore(false);
      }
    };

    fetchData();
  }, [searchText]);

  useEffect(() => {
    const fetchData = async () => {
      if (page === 1 || searchText === '') return;

      const newGallery = await getImage(searchText, page);

      setGallery(prevGallery => [...prevGallery, ...newGallery]);

      setIsLoading(false);
      setLoadMore(newGallery.length >= 12);
    };

    fetchData();
  }, [page, searchText]);

  const handleInput = async searchText => {
    setPage(1);
    setSearchText(searchText);
  };

  const showModal = modalShow => {
    setIsShowModal(true);
    setModalShow(modalShow);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={styles.App}>
      <Searchbar handleInput={handleInput} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {gallery.length > 0 && (
            <ImageGallery showModal={showModal} gallery={gallery} />
          )}
          {isShowModal && <Modal closeModal={closeModal} img={modalShow} />}
          {loadMore && <Button onClick={handleLoadMore} />}
        </>
      )}
    </div>
  );
};

export default App;
