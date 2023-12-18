import { useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = ({ img, closeModal }) => {
  const { largeImageURL, tags } = img;
  
  useEffect(() => {
    const handlePressESC = e => {
      if (e.code === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handlePressESC);
    return () => window.removeEventListener('keydown', handlePressESC);
  }, [closeModal]);

  return (
    <div className={styles.Overlay} onClick={() => closeModal()}>
      <div className={styles.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

export default Modal;
