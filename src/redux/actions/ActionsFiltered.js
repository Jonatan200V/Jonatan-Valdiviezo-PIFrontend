export const ADD_FAVORITS = '@favorits/add';
export const DELETE_FAVORITS = '@favorits/delete';
export const USER_FAVORITS = '@favorits/user';
export const DELETE_DOG = '@dogstate/delete';
export const UPDATE_DOG = '@dogstate/update';
export const ADD_DOG = '@dogstate/add';
export const RESET_DATE = '@dogstate/reset';
const addFavoritesDogs = (dog) => {
  return {
    type: ADD_FAVORITS,
    payload: dog,
  };
};
const deleteFavoriteDogs = (id) => {
  return {
    type: DELETE_FAVORITS,
    payload: id,
  };
};
const userFavorit = (user) => {
  return {
    type: USER_FAVORITS,
    payload: user,
  };
};
const deleteDogState = (id) => {
  return {
    type: DELETE_DOG,
    payload: id,
  };
};
const updateDogState = (newDog) => {
  return {
    type: UPDATE_DOG,
    payload: newDog,
  };
};
const addDogState = (inputCreate, imageDefault, inputTemperament) => {
  return {
    type: ADD_DOG,
    payload: {
      inputCreate,
      imageDefault,
      inputTemperament,
    },
  };
};
const resetDogs = () => {
  return {
    type: RESET_DATE,
    payload: '',
  };
};
export {
  addFavoritesDogs,
  addDogState,
  deleteFavoriteDogs,
  userFavorit,
  deleteDogState,
  updateDogState,
  resetDogs,
};
