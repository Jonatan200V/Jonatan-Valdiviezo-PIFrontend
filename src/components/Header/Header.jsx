import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { favorits, close, loggin } from '../../icons';
import { useDispatch, useSelector } from 'react-redux';
import { userFavorit } from '../../redux/actions/ActionsFiltered';
import { URL } from '../../services/services';
import { INITIAL_STATE_LOGIN } from '../../services/variables';

const expresiones = {
  name: /^[a-zA-ZÀ-ÿ\s]{5,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};
const Header = () => {
  const [user, setUser] = useState({
    user_name: '',
    user_surname: '',
    user_email: '',
    user_password: '',
    user_confirmPassword: '',
  });
  const [userExist, setUserExist] = useState({
    existUser_email: '',
    existUser_password: '',
  });
  const [validations, setValidations] = useState(INITIAL_STATE_LOGIN);
  const [responseBackend, setResponseBackend] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state.filterDogs.user);
  const storeDogs = useSelector((state) => state.mainDogs.selectFilter);
  const { existUser_email, existUser_password } = userExist;
  const {
    user_name,
    user_surname,
    user_email,
    user_password,
    user_confirmPassword,
  } = user;
  const {
    userName,
    userSurname,
    userEmail,
    userPassword,
    userPasswordConfirm,
    userSend,
  } = validations;
  const handleSubmitLoggin = async (evt) => {
    evt.preventDefault();
    const res = await fetch(`${URL}user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_email: existUser_email,
        user_password: existUser_password,
      }),
    });
    const data = await res.json();
    if (res.status === 500) {
      setTimeout(() => {
        setResponseBackend('');
      }, 4000);
      return setResponseBackend(data.msg);
    }
    if (data.user_favorits === null) {
      dispatch(userFavorit(data));
      handleClickClose();
      navigate('/favorits');
      return;
    }
    data.user_favorits = data.user_favorits.map((item) => JSON.parse(item));
    dispatch(userFavorit(data));
    handleClickClose();
    navigate('/favorits');
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (
      !expresiones.name.test(user_name) ||
      !expresiones.name.test(user_surname) ||
      !expresiones.email.test(user_email) ||
      !expresiones.password.test(user_password) ||
      !(user_password === user_confirmPassword) ||
      user_name.trim().length === 0 ||
      user_surname.trim().length === 0
    ) {
      setTimeout(() => {
        setValidations({
          ...validations,
          userSend: true,
        });
      }, 4000);
      return setValidations({
        ...validations,
        userSend: false,
      });
    }
    const res = await fetch(`${URL}user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name,
        user_surname,
        user_email,
        user_password,
      }),
    });
    const data = await res.json();
    if (res.status !== 200) {
      setResponseBackend(data.msg);
      setTimeout(() => {
        setResponseBackend('');
      }, 4000);
    } else {
      dispatch(userFavorit(data));
      handleClickClose();
    }
  };
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUser({
      ...user,
      [name]: value,
    });
    switch (name) {
      case 'user_name': {
        return expresiones.name.test(value) && value.trim().length > 0
          ? setValidations({ ...validations, userName: true })
          : setValidations({ ...validations, userName: false });
      }
      case 'user_surname': {
        return expresiones.name.test(value) && value.trim().length > 0
          ? setValidations({ ...validations, userSurname: true })
          : setValidations({ ...validations, userSurname: false });
      }

      case 'user_email': {
        return expresiones.email.test(value)
          ? setValidations({ ...validations, userEmail: true })
          : setValidations({ ...validations, userEmail: false });
      }
      case 'user_password': {
        return expresiones.password.test(value)
          ? setValidations({ ...validations, userPassword: true })
          : setValidations({ ...validations, userPassword: false });
      }
      case 'user_confirmPassword': {
        return value === user_password
          ? setValidations({ ...validations, userPasswordConfirm: true })
          : setValidations({ ...validations, userPasswordConfirm: false });
      }
      default:
        return;
    }
  };
  const handleChangeLoggin = (evt) => {
    const { name, value } = evt.target;
    setUserExist({
      ...userExist,
      [name]: value,
    });
  };
  const handleClick = () => {
    const $form = document.querySelector('.header__form-loggin');
    const $container = document.querySelector('.header__containerform');
    const $all = document.querySelector('#root');
    $all.classList.add('cut');
    $form.classList.add('logearse');
    if ($container !== null) {
      $container.classList.add('logearse');
    }
  };
  const handleClickClose = () => {
    const $form = document.querySelector('.header__form-loggin');
    const $container = document.querySelector('.header__containerform');
    const $all = document.querySelector('#root');
    const $formCreate = document.querySelector('.header__form');
    $form.classList.remove('logearse');
    $all.classList.remove('cut');
    if ($container !== null) {
      $container.classList.remove('logearse');
    }
    if ($formCreate !== null) {
      $formCreate.classList.remove('logearse');
    }
  };
  const handleClickCreate = () => {
    const $form = document.querySelector('.header__form-loggin');
    const $formCreate = document.querySelector('.header__form');
    $form.classList.remove('logearse');
    $formCreate.classList.add('logearse');
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(userFavorit(null));
    navigate('/');
    for (let indexStore = 0; indexStore < storeDogs.length; indexStore++) {
      if (storeDogs[indexStore].hasOwnProperty('favorits'))
        storeDogs[indexStore].favorits = false;
    }
  };
  const handleClickSession = () => {
    const $div = document.querySelector('.header__loading');
    const $cartel = document.querySelector('.header__cartel');
    $div.classList.add('animation_loading');
    $cartel.classList.add('cartel_loading');
    setTimeout(() => {
      $div.classList.remove('animation_loading');
      $cartel.classList.remove('cartel_loading');
    }, 4000);
  };
  return (
    <div className='header'>
      <Link className='link header__link' to='/home'>
        <img
          className='header__img'
          src='../assets/dog.png'
          alt='dog-header'
          loading='lazy'
          title='Home'
        />
      </Link>
      <div className='header__cartel'>
        <div className='header__warning'>
          To enter this route you need to login
        </div>
        <div className='header__loading'></div>
      </div>
      {store.length === 0 ? (
        <div className='header__session' onClick={handleClickSession}>
          <img
            className='header__img'
            src='../assets/page-form.png'
            alt='page-form'
            loading='lazy'
            title='Create Race'
          />
        </div>
      ) : (
        <Link className='link header__link' to='/form'>
          <img
            className='header__img'
            src='../assets/page-form.png'
            alt='page-form'
            loading='lazy'
            title='Create Race'
          />
        </Link>
      )}
      {store.length === 0 ? (
        <div
          title='Favorits'
          className='header__session'
          onClick={handleClickSession}
        >
          {favorits}
        </div>
      ) : (
        <Link className='header__link' title='Favorits' to='/favorits'>
          <div className='header__div-favorits'>
            <span className='header__favorits'>
              {store !== null
                ? store[0].user_favorits !== null
                  ? store[0].user_favorits.length
                  : 0
                : null}
            </span>
            {favorits}
          </div>
        </Link>
      )}

      <div className='header__loggin' title='Login' onClick={handleClick}>
        {loggin}
      </div>
      {store.length === 0 ? (
        <div className='header__containerform'>
          <form onSubmit={handleSubmitLoggin} className='header__form-loggin'>
            <div className='header__background'>
              <div className='header__button-div'>
                <button
                  className='header__button'
                  type='button'
                  onClick={handleClickClose}
                >
                  {close}
                </button>
              </div>
              <input
                onChange={handleChangeLoggin}
                className='header__input'
                placeholder='User'
                type='text'
                value={existUser_email}
                name='existUser_email'
              />
              <input
                onChange={handleChangeLoggin}
                className='header__input'
                placeholder='Password'
                type='password'
                value={existUser_password}
                name='existUser_password'
              />
              <div className='header__buttons'>
                <button
                  className='header__buttons-action'
                  onClick={handleClickCreate}
                  type='button'
                >
                  Create Account
                </button>
                <button className='header__buttons-action' type='submit'>
                  Loggin
                </button>
              </div>
              <div className='header__controller'>
                {responseBackend.length > 0 ? responseBackend : null}
              </div>
            </div>
          </form>
          <form onSubmit={handleSubmit} className='header__form '>
            <div className='header__background header__form-h'>
              <div className='header__button-div'>
                <button
                  className='header__button'
                  type='button'
                  onClick={handleClickClose}
                >
                  {close}
                </button>
              </div>
              <input
                value={user_name}
                className='header__input'
                name='user_name'
                onChange={handleChange}
                placeholder='Name'
                type='text'
              />
              {userName ? null : (
                <div className='header__controller'>
                  The name cannot contain numbers or spaces
                </div>
              )}
              <input
                value={user_surname}
                className='header__input'
                name='user_surname'
                onChange={handleChange}
                placeholder='SurName'
                type='text'
              />
              {userSurname ? null : (
                <div className='header__controller'>
                  The last name cannot contain numbers or spaces
                </div>
              )}

              <input
                value={user_email}
                className='header__input'
                name='user_email'
                onChange={handleChange}
                placeholder='Mail'
                type='email'
              />
              {userEmail ? null : (
                <div className='header__controller'>
                  Please enter a valid email
                </div>
              )}
              <input
                value={user_password}
                className='header__input'
                name='user_password'
                onChange={handleChange}
                placeholder='Password'
                type='password'
              />
              {userPassword ? null : (
                <div className='header__controller'>
                  The password must have a minimum of 4 characters and a maximum
                  of 12
                </div>
              )}
              <input
                value={user_confirmPassword}
                className='header__input'
                name='user_confirmPassword'
                onChange={handleChange}
                placeholder='Confirm Password'
                type='password'
              />
              {userPasswordConfirm ? null : (
                <div className='header__controller'>Passwords do not match</div>
              )}
              <button
                style={{ position: 'relative', zIndex: '40000000' }}
                className='header__buttons-action'
              >
                Create Acount
              </button>

              {userSend ? null : (
                <div className='header__controller'>
                  Complete the required fields to be able to register
                </div>
              )}
              {responseBackend.length > 0 ? (
                <div className='header__controller'>Existing mail</div>
              ) : null}
            </div>
          </form>
        </div>
      ) : (
        <div className='header__form-loggin header__logout'>
          <div className='header__background'>
            <div className='header__button-div'>
              <button
                className='header__button'
                type='button'
                onClick={handleClickClose}
              >
                {close}
              </button>
            </div>

            <button className='header__buttons-action' onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
