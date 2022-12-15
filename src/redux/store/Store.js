import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import fetchingReducer from '../reducers/Reducers';
import userReducer from '../reducers/ReducerFiltered';
import filteredReducer from '../reducers/ReducerMain';
const reducer = combineReducers({
  fetchingDogs: fetchingReducer,
  filterDogs: userReducer,
  mainDogs: filteredReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export { store };
