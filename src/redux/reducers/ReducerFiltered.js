import {
  DELETE_FAVORITS,
  ADD_FAVORITS,
  USER_FAVORITS,
} from '../actions/ActionsFiltered';

const initalState = {
  favorits: [],
  user: [],
};

const reducer = (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_FAVORITS: {
      payload[0].favorits = true;
      if (state?.user[0]?.user_favorits === null) {
        state = {
          ...state,
          user: [
            {
              ...state.user[0],
              user_favorits: [...payload],
            },
          ],
        };
        localStorage.setItem('user', JSON.stringify(state.user));
        return state;
      }

      state = {
        ...state,
        user: [
          {
            ...state.user[0],
            user_favorits: [...state?.user[0]?.user_favorits, ...payload],
          },
        ],
      };
      localStorage.setItem('user', JSON.stringify(state.user));
      return state;
    }
    case DELETE_FAVORITS: {
      let dogNotFavorit = state.user[0].user_favorits.find(
        (dog) => dog.dog_id === Number(payload)
      );
      dogNotFavorit.favorits = false;
      let newListFavorits = state.user[0].user_favorits.filter(
        (dog) => dog.dog_id !== Number(payload)
      );
      state = {
        ...state,
        user: [
          {
            ...state.user[0],
            user_favorits: [...newListFavorits],
          },
        ],
      };
      localStorage.setItem('user', JSON.stringify(state.user));
      return state;
    }
    case USER_FAVORITS: {
      if (payload === null) {
        return initalState;
      }
      state = {
        ...state,
        user: [payload],
      };
      localStorage.setItem('user', JSON.stringify(state.user));
      return state;
    }
    default:
      return state;
  }
};

export default reducer;
