import {
  GET_ALL_DOGS,
  GET_ONE_DOGS,
  GET_SEARCH_DOGS,
  POST_DOGS,
  GET_ALL_TEMPERAMENTS,
} from '../actions/Actions';
const initalState = {
  allDogs: [],
  dog: [],
  dogFilter: [],
  dogCreated: {},
  allTemperaments: [],
};

const reducer = (state = initalState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_ALL_DOGS: {
      if (state.allDogs.length >= 0) {
        return {
          ...state,
          allDogs: payload,
        };
      }
      return state;
    }
    case GET_ALL_TEMPERAMENTS: {
      if (state.allTemperaments.length === 0) {
        return {
          ...state,
          allTemperaments: payload,
        };
      }
      return state;
    }
    case GET_ONE_DOGS:
      return {
        ...state,
        dog: [payload],
      };
    case GET_SEARCH_DOGS:
      return {
        ...state,
        dogFilter: payload,
      };
    case POST_DOGS: {
      // console.log(payload.msg);

      return {
        ...state,
        dogCreated: payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
