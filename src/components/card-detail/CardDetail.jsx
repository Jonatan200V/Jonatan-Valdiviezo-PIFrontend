import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { expresiones } from '../../services/selectarray';
import { INITIAL_STATE_VARIABLES } from '../../services/variables';
import Button from '../button/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteDogState,
  updateDogState,
} from '../../redux/actions/ActionsFiltered';
import { deleteTemperament } from '../../icons';
const CardDetail = ({ dog }) => {
  const [update, setUpdate] = useState(null);
  const [inputUpdate, setInputUpdate] = useState({
    dog_name: dog.dog_name,
    dog_height: dog.dog_height,
    dog_weight: dog.dog_weight,
    dog_lifeSpan: dog.dog_lifeSpan.split(' ')[0],
  });
  const [validations, setValidations] = useState(INITIAL_STATE_VARIABLES);
  const { dog_name, dog_height, dog_weight, dog_lifeSpan } = inputUpdate;
  const [responseBackend, setResponseBackend] = useState(null);
  const [response, setResponse] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const handleClickDelete = async () => {
    await fetch(`https://apidog-2.vercel.app/dogs/${dog.dog_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch(deleteDogState(dog.dog_id));
    navigate('/home');
  };
  const handleClick = () => {
    setUpdate(true);
  };
  const handleClickUpdate = async () => {
    if (!expresiones.name.test(dog_name)) {
      setTimeout(() => {
        setValidations({ ...validations, formSend: true });
      }, 4000);
      return setValidations({ ...validations, formSend: false });
    }
    if (!expresiones.passHW.test(dog_weight)) {
      setTimeout(() => {
        setValidations({ ...validations, formSend: true });
      }, 4000);
      return setValidations({ ...validations, formSend: false });
    }
    if (!expresiones.passHW.test(dog_height)) {
      setTimeout(() => {
        setValidations({ ...validations, formSend: true });
      }, 4000);
      return setValidations({ ...validations, formSend: false });
    }
    if (!expresiones.passA.test(dog_lifeSpan)) {
      setTimeout(() => {
        setValidations({ ...validations, formSend: true });
      }, 4000);
      return setValidations({ ...validations, formSend: false });
    }
    const res = await fetch(`https://apidog-2.vercel.app/dogs/${dog.dog_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dog_name,
        dog_height,
        dog_weight,
        dog_lifeSpan,
      }),
    });
    const data = await res.json();
    dispatch(
      updateDogState({
        dog_id: dog.dog_id,
        dog_name,
        dog_height,
        dog_weight,
        dog_lifeSpan,
      })
    );
    if (res.status !== 500) {
      const $div = document.querySelector('.detail__absolute');
      const $cartel = document.querySelector('.detail__update');
      $cartel.classList.add('block');
      $div.classList.add('mostrar');
      document.body.classList.add('body');
      setTimeout(() => {
        $div.classList.remove('mostrar');
        document.body.classList.remove('body');
        $cartel.classList.remove('block');
        navigate('/home');
      }, 2000);
      return setResponse(data.msg);
    }
    setResponseBackend(data.msg);
    setTimeout(() => {
      setResponseBackend(null);
    }, 4000);
  };
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputUpdate({
      ...inputUpdate,
      [name]: value,
    });
    const values = value.split('-');
    if (Number(values[0]) > Number(values[1])) {
      if (name === 'dog_height') {
        return setValidations({
          ...validations,
          dogHeight: false,
        });
      }
      if (name === 'dog_weight') {
        return setValidations({
          ...validations,
          dogWeight: false,
        });
      }
      if (name === 'dog_lifeSpan') {
        return setValidations({
          ...validations,
          dogLifeSpan: false,
        });
      }
    }
    switch (name) {
      case 'dog_name': {
        return expresiones.name.test(value) && value.trim().length !== 0
          ? setValidations({ ...validations, dogName: true })
          : setValidations({ ...validations, dogName: false });
      }
      case 'dog_height': {
        return expresiones.passHW.test(value)
          ? setValidations({ ...validations, dogHeight: true })
          : setValidations({ ...validations, dogHeight: false });
      }

      case 'dog_weight': {
        return expresiones.passHW.test(value)
          ? setValidations({ ...validations, dogWeight: true })
          : setValidations({ ...validations, dogWeight: false });
      }

      case 'dog_lifeSpan': {
        return expresiones.passA.test(value)
          ? setValidations({ ...validations, dogLifeSpan: true })
          : setValidations({ ...validations, dogLifeSpan: false });
      }

      default:
        return;
    }
  };
  const handleClickExit = () => {
    setUpdate(null);
  };
  const handleConfirm = (evt) => {
    const { name } = evt.target;
    switch (name) {
      case 'yes': {
        const $div = document.querySelector('.detail__confirm');
        document.body.classList.remove('body');
        $div.classList.remove('revelate');
        return handleClickDelete();
      }
      case 'no': {
        const $div = document.querySelector('.detail__confirm');
        document.body.classList.remove('body');
        return $div.classList.remove('revelate');
      }
      default:
        return;
    }
  };
  const handleClickConfirm = () => {
    const $div = document.querySelector('.detail__confirm');
    document.body.classList.add('body');
    $div.classList.add('revelate');
  };
  return (
    <div className='detail__container-x'>
      <div className='detail__confirm'>
        <p className='detail__cofirm-p'>
          ¿Are you sure you want to delete the dog?
        </p>
        <div className='detail__confirm-div'>
          <button
            name='yes'
            onClick={handleConfirm}
            className='detail__confirm-button'
          >
            Yes
          </button>
          <button
            name='no'
            onClick={handleConfirm}
            className='detail__confirm-button'
          >
            No
          </button>
        </div>
      </div>
      {update ? (
        <div className='detail__container'>
          <div className='detail__exit'>
            <button className='detail__button-exit' onClick={handleClickExit}>
              {deleteTemperament}
            </button>
          </div>
          <div className='detail__map' key={dog.dog_id}>
            <div className='detail__absolute'>
              <div className='detail__update'>
                {response}{' '}
                <div className='detail__updateimg'>
                  <img
                    className='formdog__img'
                    src='../assets/successfully.gif'
                    alt='succesfully'
                    loading='lazy'
                  />
                </div>
              </div>
            </div>
            <div className='detail__left'>
              <label>
                <span className='detail__span'>Height: </span>
                <input
                  name='dog_height'
                  className='detail__details'
                  value={dog_height}
                  onChange={handleChange}
                />
                {validations.dogHeight ? null : (
                  <div className='detail__warning'>
                    The minimum height cannot be greater than the maximum up to
                    999
                  </div>
                )}
              </label>
              <label>
                <span className='detail__span'>Weight: </span>
                <input
                  name='dog_weight'
                  className='detail__details'
                  value={dog_weight}
                  onChange={handleChange}
                />
              </label>
              {validations.dogWeight ? null : (
                <div className='detail__warning'>
                  The minimum height cannot be greater than the maximum up to
                  999
                </div>
              )}

              <label>
                <span className='detail__span'>Life Span: </span>
                <input
                  name='dog_lifeSpan'
                  className='detail__details'
                  value={dog_lifeSpan}
                  onChange={handleChange}
                />
              </label>
              {validations.dogLifeSpan ? null : (
                <div className='detail__warning'>
                  Life expectancy cannot be 0 and cannot exceed 99 years
                </div>
              )}

              <div className='detail__details'>
                Temperament: {dog.temperament?.slice(0, 3).join(', ')}
              </div>
              <div className='detail__details'>
                {dog.temperament?.slice(3).join(', ')}
              </div>
            </div>
            <div className='detail__right'>
              <input
                name='dog_name'
                className='detail__h2'
                value={dog_name}
                onChange={handleChange}
              />
              {validations.dogName ? null : (
                <div className='detail__warning'>
                  El nombre no puede estar vacio ni contener numeros
                </div>
              )}
              <div className='detail__image'>
                <img
                  className='detail__img'
                  src={dog.dog_image}
                  alt={dog.dog_name}
                  loading='lazy'
                />
              </div>
            </div>
          </div>
          <Button
            onClickEvent={handleClickUpdate}
            valor='Update'
            name='Update'
          />
          {validations.formSend ? null : (
            <div className='detail__warning form'>
              Please complete the fields with the requested information
            </div>
          )}
          {responseBackend ? (
            <div className='detail__warning'>{responseBackend}</div>
          ) : null}
        </div>
      ) : (
        <div>
          <div className='detail__map' key={dog.dog_id}>
            <div className='detail__left'>
              <div className='detail__details'>Height: {dog.dog_height} CM</div>
              <div className='detail__details'>Weight: {dog.dog_weight} KG</div>
              <div className='detail__details'>
                Life Span: {dog.dog_lifeSpan}
              </div>
              <div className='detail__details detail__temperamentactions'>
                Temperament: {dog.temperament?.join(', ')},
              </div>
              <div className='detail__details'></div>
            </div>
            <div className='detail__right'>
              <h2 className='detail__h2'>{dog.dog_name}</h2>
              <div className='detail__image'>
                <img
                  className='detail__img'
                  src={dog.dog_image}
                  alt={dog.dog_name}
                  loading='lazy'
                />
              </div>
            </div>
          </div>
          <div>
            {dog?.dog_db === true &&
            store.filterDogs?.user[0]?.user_role === 1 ? (
              <div className='detail__button'>
                <Button
                  valor={'Delete'}
                  name='Delete'
                  onClickEvent={handleClickConfirm}
                />
                <Button
                  valor={'Update'}
                  name='Update'
                  onClickEvent={handleClick}
                />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetail;
