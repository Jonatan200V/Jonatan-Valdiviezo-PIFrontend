import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import All from '../components/all/All';
import CardDetail from '../components/card-detail/CardDetail';
import Links from '../components/nextprev/Links';
import { getOneDog } from '../redux/actions/Actions';

const Detail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const ID = Number(id);
  useEffect(() => {
    if (store.fetchingDogs.dog.length > 0) {
      setLoading(false);
    }
    if (store.fetchingDogs.allDogs.length >= 0) {
      dispatch(getOneDog(id));
    }
    const $all = document.querySelector('#root');
    $all.classList.add('cut');
  }, []);
  let dogInfo = store.mainDogs.selectFilter.findIndex(
    (dog) => dog.dog_id === ID
  );
  const dogLinks = [];

  if (dogInfo === 0) {
    dogLinks.push(
      store.mainDogs.selectFilter[store.mainDogs.selectFilter.length - 1]
    );
    dogLinks.push(store.mainDogs.selectFilter[dogInfo + 1]);
  } else if (
    store.mainDogs.selectFilter[dogInfo].dog_id ===
    store.mainDogs.selectFilter[store.mainDogs.selectFilter.length - 1].dog_id
  ) {
    dogLinks.push(store.mainDogs.selectFilter[dogInfo - 1]);
    dogLinks.push(store.mainDogs.selectFilter[0]);
  } else {
    dogLinks.push(store.mainDogs.selectFilter[dogInfo - 1]);
    dogLinks.push(store.mainDogs.selectFilter[dogInfo + 1]);
  }
  useEffect(() => {
    document.title = store.mainDogs.selectFilter[dogInfo]?.dog_name;
  }, [dogInfo]);

  return (
    <div className='detail__divc'>
      {store.fetchingDogs.allDogs.length === 0 ? (
        store.fetchingDogs.dog.length === 0 && loading === true ? (
          <div className='loader'></div>
        ) : (
          <div>
            {store.fetchingDogs.dog.map((dog) => (
              <div key={dog.dog_id}>
                <CardDetail dog={dog} />
                <All />
              </div>
            ))}
          </div>
        )
      ) : (
        <>
          {store.mainDogs.selectFilter.length === 1 ? (
            <div>
              <div className='detail'>
                {[store.mainDogs.selectFilter[dogInfo]]?.map((dog) => (
                  <CardDetail dog={dog} key={dog.dog_id} />
                ))}
              </div>
              <All />
            </div>
          ) : (
            <div>
              <div className='detail'>
                {[store.mainDogs.selectFilter[dogInfo]]?.map((dog) => (
                  <CardDetail dog={dog} key={dog.dog_id} />
                ))}
              </div>
              <Links dogInfo={dogLinks} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Detail;
