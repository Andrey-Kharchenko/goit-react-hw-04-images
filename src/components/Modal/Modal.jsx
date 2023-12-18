import { useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = ({ img, closeModal }) => {
  const { largeImageURL, tags } = img;

  const handlePressESC = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyPress = e => {
      handlePressESC(e);
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handlePressESC]);

  return (
    <div className={styles.Overlay} onClick={handlePressESC}>
      <div className={styles.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

export default Modal;