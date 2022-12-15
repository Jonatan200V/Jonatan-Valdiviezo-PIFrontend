import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

const Favorits = () => {
  const store = useSelector((state) => state.filterDogs);
  const navigate = useNavigate();
  useEffect(() => {
    if (store.user.length === 0) {
      navigate('/');
    }
    document.title = 'Favorits';
  }, []);
  console.log(store);
  return (
    <div>
      <Header />
      <div className='favorits'>
        <div>
          {store.user.length > 0 &&
          (store.user[0]?.user_favorits === null ||
            store.user[0]?.user_favorits.length === 0) ? (
            <div className='favorits__welcome'>Now you can add favorites</div>
          ) : null}
        </div>
        <div className='favorits__container'>
          {store.user.length > 0
            ? store?.user[0]?.user_favorits === null
              ? null
              : store?.user[0]?.user_favorits?.map((dog) => (
                  <div className='favorits__card' key={dog.dog_id}>
                    <h2 className='favorits__h2'>{dog.dog_name}</h2>
                    <div className='favorits__flex'>
                      <div>
                        <img
                          className='favorits__img'
                          src={dog.dog_image}
                          alt={dog.dog_name}
                          loading='lazy'
                        />
                      </div>
                      <div className='favorits__stats'>
                        <div>Weight: {dog.dog_weight}</div>
                        <div>Height: {dog.dog_height}</div>
                        <div>Life Span: {dog.dog_lifeSpan}</div>
                      </div>
                      <div>Temperaments: {dog.temperament?.join(', ')}</div>
                    </div>
                  </div>
                ))
            : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Favorits;
