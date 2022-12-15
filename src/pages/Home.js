import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dogs from '../components/dogs/Dogs';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Main from '../components/main/Main';
// import useFiltered from '../hooks/useFiltered';
import { search } from '../icons';
import {
  getAllDogs,
  getAllTemperaments,
  getSearchDog,
} from '../redux/actions/Actions';
import { userFavorit } from '../redux/actions/ActionsFiltered';
import {
  ALLTEMPERAMENTS,
  FILTERTEMPERAMENTS,
  INPUT,
  FILTERWEIGHT,
  DBDOG,
  ALLDOGSDBAPI,
  SELECTFILTERALL,
  ORDER,
} from '../services/variables';
const Home = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  // const { state } = useFiltered();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(getSearchDog(false, store.mainDogs.inputSearch));
  };
  useEffect(() => {
    document.title = 'Home';
    if (store.mainDogs.allDogs.length === 0) {
      dispatch({ type: SELECTFILTERALL, payload: store.fetchingDogs.allDogs });
    }
    if (store.fetchingDogs.allDogs.length === 0) {
      dispatch(getAllDogs());
    }
    if (store.fetchingDogs.allTemperaments.length === 0) {
      dispatch(getAllTemperaments(false, 'temperaments'));
    }
    if (store.mainDogs.allDogs.length === 0) {
      dispatch({ type: ALLDOGSDBAPI, payload: store.fetchingDogs.allDogs });
      dispatch({
        type: ALLTEMPERAMENTS,
        payload: store.fetchingDogs.allTemperaments,
      });
    }
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      dispatch(userFavorit(user[0]));
    }
    const $all = document.querySelector('#root');
    $all.classList.remove('cut');
  }, [
    dispatch,
    store.fetchingDogs.allDogs,
    store.fetchingDogs.allTemperaments,
  ]);
  const handleChange = (evt) => {
    const { value, name } = evt.target;
    switch (name) {
      case 'input': {
        return dispatch({ type: INPUT, payload: value });
      }
      case 'select-temperament': {
        return dispatch({ type: FILTERTEMPERAMENTS, payload: value });
      }
      case 'select-weight': {
        return dispatch({ type: FILTERWEIGHT, payload: value });
      }
      case 'select-order': {
        return dispatch({ type: ORDER, payload: value });
      }
      // case 'select-weightorder': {
      //   dispatch({ type: ORDERWEIGHT, payload: value });
      //   return;
      // }
      case 'select-api-db': {
        dispatch({ type: DBDOG, payload: value });
        return;
      }
      default:
        return value;
    }
  };
  return (
    <div className='home'>
      <Header />
      <Main
        state={store.mainDogs}
        onHandleSubmit={handleSubmit}
        onHandleChange={handleChange}
        search={search}
      />
      <Dogs result={store.mainDogs.selectFilter} />
      <Footer />
    </div>
  );
};

export default Home;
