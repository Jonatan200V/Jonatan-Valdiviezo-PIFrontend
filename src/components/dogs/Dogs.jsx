import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { github, linkedin, perfil } from '../../icons';
import {
  addFavoritesDogs,
  deleteFavoriteDogs,
} from '../../redux/actions/ActionsFiltered';
import { PAGE_DOG } from '../../services/variables';
import Button from '../button/Button';
const Dogs = ({ result }) => {
  const [loading, setLoading] = useState(true);
  const refIcon = useRef();
  const dispatch = useDispatch();
  const storePage = useSelector((state) => state);
  useEffect(() => {
    if (result.length > 0) {
      setLoading(false);
    }
    if (storePage.filterDogs.user[0]?.user_favorits === null) {
    } else {
      if (storePage.filterDogs.user[0]?.user_favorits.length > 0) {
        for (
          let indexStore = 0;
          indexStore < storePage.filterDogs.user[0]?.user_favorits?.length;
          indexStore++
        ) {
          for (
            let indexResult = 0;
            indexResult < result.length;
            indexResult++
          ) {
            if (
              result[indexResult].dog_id ===
              storePage.filterDogs.user[0]?.user_favorits[indexStore].dog_id
            ) {
              result[indexResult].favorits = true;
            }
          }
        }
      }
    }
  }, [result]);
  const handleNext = () => {
    dispatch({ type: PAGE_DOG, payload: '@page/next' });
  };
  const handlePrev = () => {
    dispatch({ type: PAGE_DOG, payload: '@page/prev' });
  };
  const handleClick = async (evt) => {
    const { id } = evt.target;
    const addFavorit = storePage.mainDogs.allDogs.findIndex(
      (dog) => dog.dog_id === Number(id)
    );
    const addFavoritUser = storePage.mainDogs.allDogs.find(
      (dog) => dog.dog_id === Number(id)
    );
    if (evt.target.classList.contains('select')) {
      dispatch(deleteFavoriteDogs(id));
      await fetch(
        `https://apidog-2.vercel.app/user/${storePage.filterDogs.user[0].user_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_favorits: id,
          }),
        }
      );
      if (result[addFavorit].favorits !== undefined) {
        result[addFavorit].favorits = false;
      }
      return evt.target.classList.remove('select');
    }
    if (storePage.filterDogs.user.length === 0) {
      const $div = document.querySelector('.dog__loading');
      const $cartel = document.querySelector('.dog__cartel');
      $div.classList.add('animation_loading');
      $cartel.classList.add('cartel_loading');
      setTimeout(() => {
        $div.classList.remove('animation_loading');
        $cartel.classList.remove('cartel_loading');
      }, 4000);
      return;
    }
    const dogFavorit = result.filter((dog) => dog.dog_id === Number(id));
    evt.target.classList.add('select');
    dispatch(addFavoritesDogs(dogFavorit));
    await fetch(
      `https://apidog-2.vercel.app/user/${storePage.filterDogs.user[0].user_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_favorits: JSON.stringify(addFavoritUser),
        }),
      }
    );
  };
  const handleClickShow = () => {
    const $div = document.querySelector('.dog__a');
    const $container = document.querySelector('.dog__redsocial');
    $div.classList.toggle('linksview');
    $container.classList.toggle('exit');
    console.log('hola removido');
  };

  return (
    <div className='dog'>
      <div className='dog__cartel'>
        <div className='dog__warning'>To add favorites please login</div>
        <div className='dog__loading'></div>
      </div>
      <div className='dog__container'>
        <div className='dog__redsocial' onClick={handleClickShow}>
          <div className='dog__perfil'>{perfil}</div>
          <div className='dog__a'>
            <a
              className='dog__alinks'
              href='https://www.linkedin.com/in/jonatan-valdiviezo2205/'
              target='_blank'
              rel='noreferrer'
            >
              {linkedin}
            </a>
            <a
              className='dog__alinks'
              href='https://github.com/Jonatan200V'
              target='_blank'
              rel='noreferrer'
            >
              {github}
            </a>
          </div>
        </div>
        {result.length === 0 && loading === true ? (
          <div className='loader'></div>
        ) : null}
        {result.length === 0 && loading === false ? (
          <h1 className='dog__h1'>No hay razas de perros para mostrar</h1>
        ) : null}
        {result
          ?.slice(
            storePage.mainDogs.values.value1,
            storePage.mainDogs.values.value2
          )
          ?.map((dog) => (
            <div className='dog__div' key={dog.dog_id}>
              <h2 className='dog__h2'>{dog.dog_name}</h2>
              <div className='dog__divdog'>
                <Link to={`/dog/${dog.dog_id}`}>
                  <div className='dog__absolute'>
                    <h2 className='dog__temperament'>
                      Temperaments: {dog.temperament?.slice(0, 3).join(', ')}
                    </h2>
                    <h2 className='dog__temperament'>
                      {dog.temperament?.slice(3)?.join(', ')}
                    </h2>

                    <div className='dog__weight'>
                      Weight Min: {dog.dog_weight?.split('-')[0]}KG | Weight
                      Max: {dog.dog_weight?.split('-')[1]}
                      KG
                    </div>
                  </div>
                  <img
                    className='dog__img'
                    src={dog.dog_image}
                    alt={dog.dog_name}
                    loading='lazy'
                    width={'400px'}
                  />
                </Link>
                {dog?.favorits === true ? (
                  <div ref={refIcon} className='dog__div-i '>
                    <div
                      id={dog.dog_id}
                      onClick={handleClick}
                      className='dog__i select'
                    >
                      🧡
                    </div>
                  </div>
                ) : (
                  <div ref={refIcon} className='dog__div-i '>
                    <div
                      id={dog.dog_id}
                      onClick={handleClick}
                      className='dog__i'
                    >
                      🧡
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
      <div className='dog__carruzel'>
        <Button name={'prev'} onClickEvent={handlePrev} valor={'Prev'} />
        <div className='dog__page'>
          {`${storePage.mainDogs.values.count}/${Math.ceil(result.length / 8)}`}{' '}
          Pages
        </div>
        <Button name={'next'} onClickEvent={handleNext} valor={'Next'} />
      </div>
    </div>
  );
};

export default Dogs;
