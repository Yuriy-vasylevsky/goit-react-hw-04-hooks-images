import './ImageGalleryItem.css';
import { useState, useEffect } from 'react';
import apiServices from '../../services/services';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';
// import { Notification } from 'react-pnotify';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { toast } from 'react-toastify';

export default function ImageGalleryItem({ searchValue }) {
  const [arrSearchPhoto, setArrSearchPhoto] = useState([]);
  const [status, setStatus] = useState('idel');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentLargeImage, setCurrentLargeImage] = useState('');
  const [page, setPage] = useState(1);

  // componentDidUpdate(prevProps, prevState) {
  //   const { searchValue } = props;

  //   if (prevProps.searchValue !== searchValue) {
  //     setState({ status: 'pending' });

  //     apiServices
  //       .SearchPhoto(props.searchValue)
  //       .then(res => {
  //         if (res.length === 0) {
  //           toast.info('По данному запросу ничего не найдено');
  //           return setState({ status: 'idel' });
  //         }
  //         setState({ arrSearchPhoto: res, status: 'resolved' });
  //       })
  //       .catch(err => setState({ status: 'rejected' }));

  //     setState({ page: 1 });
  //   }
  // }

  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    setStatus('pending');
    apiServices
      .SearchPhoto(searchValue)
      .then(res => {
        if (res.length === 0) {
          toast.info('По данному запросу ничего не найдено');
          return setStatus('idel');
        }
        setArrSearchPhoto(res);
        setStatus('resolved');
      })
      .catch(err => setStatus('rejected'));

    setPage(1);
  }, [searchValue]);

  const changePage = () => {
    setPage(prev => prev + 1);
    apiServices
      .SearchPhoto(page)
      .then(res => {
        setArrSearchPhoto(prev => {
          return [...prev, ...res];
        });
      })
      .catch(err => setStatus('rejected'));
  };

  const onClickPhoto = e => {
    togleModal();
    return setCurrentLargeImage(e.currentTarget.dataset.nev);
  };

  const togleModal = () => {
    return setModalOpen(prev => !prev);
  };

  if (status === 'resolved') {
    return (
      <>
        {arrSearchPhoto.map(el => {
          return (
            <li className="ImageGalleryItem" key={el.webformatURL}>
              <img
                src={el.webformatURL}
                data-nev={el.largeImageURL}
                alt=""
                className="ImageGalleryItem-image"
                onClick={onClickPhoto}
              />
            </li>
          );
        })}
        {arrSearchPhoto && <Button changePage={changePage} />}
        {modalOpen && (
          <Modal bigPhoto={currentLargeImage} togleModal={togleModal} />
        )}
      </>
    );
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'idel') {
    return (
      <div>
        <p> Введите что-то в поиск</p>
      </div>
    );
  }

  if (status === 'rejected') {
    toast.info('ОЙ');

    // return (
    //   <Notification
    //     type="error"
    //     title="Error"
    //     text="Что-то пошло не так"
    //     animateIn="bounceInLeft"
    //     animateOut="bounceOutRight"
    //     delay={2500}
    //     shadow={true}
    //     hide={true}
    //     nonblock={false}
    //     desktop={false}
    //   />
    // );
  }
}
