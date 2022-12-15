import fetchDogs, { URL } from '../../services/services';

const GET_ALL_DOGS = '@dogs/all';
const GET_ONE_DOGS = '@dogs/one';
const GET_SEARCH_DOGS = '@dogs/search';
const POST_DOGS = '@dogs/create';
const GET_ALL_TEMPERAMENTS = '@temperament/all';
const getAllDogs = () => async (dispatch) => {
  const res = await fetch(`${URL}dogs`);
  const data = await res.json();
  // return data;
  console.log(res);
  return dispatch({
    type: GET_ALL_DOGS,
    payload: data,
  });
};
const getOneDog = (id) => async (dispatch) => {
  const data = await fetchDogs(id);
  return dispatch({
    type: GET_ONE_DOGS,
    payload: data,
  });
};
const getSearchDog =
  (id = false, value) =>
  async (dispatch) => {
    const data = await fetchDogs(id, value);
    return dispatch({
      type: GET_SEARCH_DOGS,
      payload: data,
    });
  };
const createDog =
  (inputCreate, imageDefault, inputTemperament) => async (dispatch) => {
    const {
      dog_name,
      dog_db,
      dog_heightMin,
      dog_heightMax,
      dog_weightMin,
      dog_weightMax,
      dog_lifeSpanMin,
      dog_lifeSpanMax,
      dog_image,
    } = inputCreate;
    let temperaments;
    const temperament_name = inputCreate.temperament_name.split(' ');
    if (inputCreate.temperament_name.length === 0) {
      temperaments = [...inputTemperament];
    } else if (inputTemperament.length === 0) {
      temperaments = [...temperament_name];
    } else {
      temperaments = [...inputTemperament, ...temperament_name];
    }
    console.log(temperaments);
    const res = await fetch(`${URL}dogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dog_name,
        dog_db,
        dog_height: `${dog_heightMin}-${dog_heightMax}`,
        dog_weight: `${dog_weightMin}-${dog_weightMax}`,
        dog_lifeSpan: `${dog_lifeSpanMin}-${dog_lifeSpanMax}`,
        dog_image: dog_image.length > 0 ? dog_image : imageDefault,
        temperament_name: temperaments,
      }),
    });
    const data = await res.json();
    console.log(res);
    console.log(data);
    return dispatch({
      type: POST_DOGS,
      payload: { data, res },
    });
  };
const getAllTemperaments =
  (id = false, value) =>
  async (dispatch) => {
    const data = await fetchDogs(id, value);
    return dispatch({
      type: GET_ALL_TEMPERAMENTS,
      payload: data,
    });
  };

export {
  getAllDogs,
  getOneDog,
  getSearchDog,
  createDog,
  getAllTemperaments,
  GET_ALL_TEMPERAMENTS,
  GET_ALL_DOGS,
  GET_ONE_DOGS,
  GET_SEARCH_DOGS,
  POST_DOGS,
};
