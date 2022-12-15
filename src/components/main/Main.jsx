import { useSelector } from 'react-redux';
import { dogApiDb, orderAlpha, weight } from '../../services/selectarray';

const Main = ({ onHandleSubmit, onHandleChange, state, search }) => {
  const store = useSelector((state) => state.filterDogs);

  return (
    <div className='home__height'>
      {store.user.length > 0 ? (
        <div className='home__welcome'>
          Bienvenido {store.user[0]?.user_name}{' '}
        </div>
      ) : null}
      <div className='home__container'>
        <form className='home__form' onSubmit={onHandleSubmit}>
          <input
            className='home__input'
            name='input'
            value={state.inputSearch}
            type='text'
            onChange={onHandleChange}
            placeholder='Search race'
          />
          <button className='home__button'>{search}</button>
        </form>
        <div className='home__div'>
          <select
            className='home__select'
            name='select-temperament'
            onChange={onHandleChange}
          >
            <option className='home__option' value={state.selectTemperament}>
              {state.selectTemperament}
            </option>
            <option className='home__option' value={'Temperaments'}>
              Temperaments
            </option>
            {state.temperaments?.map((temp) => (
              <option
                className='home__option'
                key={temp.temperament_id}
                value={temp.temperament_name}
              >
                {temp.temperament_name}
              </option>
            ))}
          </select>
          <select
            className='home__select'
            name='select-weight'
            onChange={onHandleChange}
          >
            <option className='home__option' value={state.selectWeight}>
              {state.selectWeight === 'Weight'
                ? state.selectWeight
                : `${state.selectWeight}KG`}
            </option>
            <option className='home__option' value='Weight'>
              Weight
            </option>
            {weight?.map((kg) => (
              <option className='home__option' value={kg} key={kg}>
                {kg}KG
              </option>
            ))}
          </select>
          <select
            className='home__select'
            name='select-order'
            onChange={onHandleChange}
          >
            <option className='home__option' value='order'>
              Order
            </option>
            {orderAlpha?.map((order) => (
              <option className='home__option' value={order} key={order}>
                {order}
              </option>
            ))}
            <option className='home__option' value='weight-asc'>
              Weight Asc
            </option>
            <option className='home__option' value='weight-desc'>
              Weight Desc
            </option>
          </select>
          <select
            className='home__select'
            name='select-api-db'
            onChange={onHandleChange}
          >
            <option className='home__option' value={state.dogApiDb}>
              {state.dogApiDb.replace('d', 'D')}
            </option>
            {dogApiDb?.map((apiDog) => (
              <option
                className='home__option'
                value={apiDog.name}
                key={apiDog.name}
              >
                {apiDog.value}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Main;
