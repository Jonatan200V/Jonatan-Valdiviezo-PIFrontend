import { useReducer } from 'react';
import { useSelector } from 'react-redux';
import {
  ALLTEMPERAMENTS,
  ALLDOGS,
  FILTERTEMPERAMENTS,
  INPUT,
  FILTERWEIGHT,
  ORDERALPHA,
  ORDERWEIGHT,
  DBDOG,
} from '../services/variables';
const initialState = {
  inputSearch: '',
  selectFilter: [],
  temperaments: [],
  selectTemperament: -1,
  selectWeight: 'weight',
  orderAZ: '',
  orderWeightState: '',
  dogApiDb: '',
};

const useFiltered = () => {
  const store = useSelector((state) => state.fetchingDogs);
  const reducer = (state, action) => {
    const { type, payload } = action;
    const orderAlphabetically = (order = [], value1, value2) => {
      return order?.sort((a, b) => {
        const dogNameA = a.dog_name.toLowerCase();
        const dogNameB = b.dog_name.toLowerCase();
        if (dogNameA < dogNameB) return value1; // 1 para ordenar de a-z
        if (dogNameA > dogNameB) return value2;
        return 0;
      });
    };
    const orderWeight = (filtered = [], value1, value2) => {
      return filtered.sort((a, b) => {
        const dogWeightA = a.dog_weight.split('-')[0];
        const dogWeightB = b.dog_weight.split('-')[0];
        if (Number(dogWeightA) < Number(dogWeightB)) return value1;
        if (Number(dogWeightA) > Number(dogWeightB)) return value2;
        return 0;
      });
    };
    const filteredDbApiAll = (dbApiAll) => {
      return dbApiAll.filter((dog) => {
        const weigth = dog.dog_weight.split('-')[0];
        const weightParse = Number(weigth);
        const allTemperament = Number(state.selectTemperament);

        const search =
          dog.dog_name
            .toLowerCase()
            .indexOf(state.inputSearch.toLowerCase()) !== -1;

        const includeTemperaments = dog.temperament.includes(
          state.selectTemperament
        );
        if (
          allTemperament === -1 &&
          state.selectWeight === 'weight' &&
          state.inputSearch.length > 0
        ) {
          //Retornamos lo escrito
          return search;
        }
        if (
          allTemperament === -1 &&
          state.selectWeight !== 'weight' &&
          state.inputSearch.length > 0
        ) {
          //Retornamos lo escrito
          if (weightParse >= weightMin && weightParse <= weightMax) {
            //Retornamos lo escrito
            return search;
          }
          return '';
        }
        if (
          allTemperament !== -1 &&
          state.selectWeight === 'weight' &&
          state.inputSearch.length > 0
        ) {
          return includeTemperaments && search;
        }
        if (
          allTemperament !== -1 &&
          state.selectWeight !== 'weight' &&
          state.inputSearch.length > 0
        ) {
          if (weightParse >= weightMin && weightParse <= weightMax) {
            //Retornamos lo escrito
            return includeTemperaments && search;
          }
          return '';
        }
        if (
          allTemperament !== -1 &&
          Number(state.selectWeight) === 100 &&
          weightParse >= Number(state.selectWeight)
        ) {
          return includeTemperaments;
        }
        if (
          allTemperament === -1 &&
          Number(state.selectWeight) === 100 &&
          weightParse >= Number(state.selectWeight)
        ) {
          return dog;
        }
        if (allTemperament !== -1 && state.selectWeight === 'weight') {
          return includeTemperaments;
        }

        if (allTemperament !== -1 && state.selectWeight !== 'weight') {
          if (weightParse >= weightMin && weightParse <= weightMax) {
            //Retornamos lo escrito
            return includeTemperaments;
          }
          return '';
        }

        if (allTemperament === -1 && state.selectWeight !== 'weight') {
          // compara el peso que este entre ciertos  valores
          if (weightParse >= weightMin && weightParse <= weightMax) {
            //Retornamos lo escrito
            return dog;
          }
          return '';
        }

        return dog;
      });
    };
    const weightMaxMin = state.selectWeight.split('-'); //Obtenemos el select seleccionado de weigth y lo dividimos en 2
    const weightMin = Number(weightMaxMin[0]);
    const weightMax = Number(weightMaxMin[1]);
    switch (type) {
      case ALLTEMPERAMENTS: {
        return {
          ...state,
          temperaments: [...payload],
        };
      }
      case ALLDOGS: {
        return {
          ...state,
          selectFilter: [...payload],
        };
      }
      case FILTERTEMPERAMENTS: {
        let search = store.allDogs.filter((dog) => {
          const weigth = dog.dog_weight.split('-')[0];
          const weightParse = Number(weigth);
          const includeTemperaments = dog.temperament.includes(payload);
          //Nos fijamos si hay algo escrito en el input
          const search =
            dog.dog_name
              .toLowerCase()
              .indexOf(state.inputSearch.toLocaleLowerCase()) !== -1;
          if (
            Number(state.selectWeight) === 100 &&
            state.inputSearch.length > 0 &&
            Number(payload) !== -1
          ) {
            if (weightParse >= Number(state.selectWeight)) {
              return includeTemperaments && search;
            }
            return '';
          }
          if (
            Number(state.selectWeight) === 100 &&
            state.inputSearch.length > 0 &&
            Number(payload) === -1
          ) {
            if (weightParse >= Number(state.selectWeight)) {
              return search;
            }
            return '';
          }
          if (
            state.inputSearch.length > 0 &&
            Number(payload) !== -1 &&
            state.selectWeight !== 'weight'
          ) {
            if (weightParse >= weightMin && weightParse <= weightMax) {
              return includeTemperaments && search;
            }
            return '';
          }
          if (Number(payload) === -1 && state.inputSearch.length > 0) {
            return search;
          }
          if (
            Number(state.selectWeight) === 100 &&
            weightParse >= Number(state.selectWeight)
          ) {
            return dog;
          }
          if (state.selectWeight !== 'weight') {
            console.log('hola desde la linea 171');
            if (weightParse >= weightMin && weightParse <= weightMax) {
              if (Number(payload) === -1) {
                //Traeme todas las razas que esten entre el peso y el temperamento este en todos
                return dog;
              }
              // Traeme las razas incluidas y que esten entre el peso
              return includeTemperaments;
            }
            return '';
          }
          if (state.inputSearch.length > 0) {
            return includeTemperaments && search;
          }
          if (Number(payload) === -1) {
            return store.allDogs;
          }
          return includeTemperaments;
        });

        if (state.dogApiDb === 'dog-database') {
          search = search.filter((dog) => dog.dog_db === true);
        }
        if (state.dogApiDb === 'dog-api') {
          search = search.filter((dog) => dog.dog_db === false);
        }
        if (state.orderAZ === 'a-z') {
          search = orderAlphabetically(search, -1, 1);
          return {
            ...state,
            selectTemperament: payload,
            selectFilter: search,
          };
        }
        if (state.orderAZ === 'z-a') {
          search = orderAlphabetically(search, 1, -1);
          return {
            ...state,
            selectTemperament: payload,
            selectFilter: search,
          };
        }
        if (state.orderWeightState === 'weight-desc') {
          search = orderWeight(search, 1, -1);
          return {
            ...state,
            selectTemperament: payload,
            selectFilter: search,
          };
        }
        if (state.orderWeightState === 'weight-asc') {
          search = orderWeight(search, -1, 1);
          return {
            ...state,
            selectTemperament: payload,
            selectFilter: search,
          };
        }
        return {
          ...state,
          selectTemperament: payload,
          selectFilter: search,
        };
      }
      case INPUT: {
        let searchList = store.allDogs?.filter((dog) => {
          const weigth = dog.dog_weight.split('-')[0]; //Obtenemos el primer valor del string de weigth
          const weightParse = Number(weigth);
          const allTemperament = Number(state.selectTemperament);
          //Si el temperamento esta en todos y el weight tiene valores ejemplo 20 y 40 entra
          const search =
            dog.dog_name.toLowerCase().indexOf(payload.toLowerCase()) !== -1;

          const includeTemperaments = dog.temperament.includes(
            state.selectTemperament
          );
          if (allTemperament === -1 && Number(weightMaxMin[0]) === 100) {
            if (Number(weightMaxMin[0]) <= weightParse) {
              return search;
            }
          }
          if (allTemperament !== -1 && Number(weightMaxMin[0]) === 100) {
            if (Number(weightMaxMin[0]) <= weightParse) {
              return search && includeTemperaments;
            }
            return '';
          }
          if (allTemperament === -1 && state.selectWeight !== 'weight') {
            // compara el peso que este entre ciertos  valores
            if (weightParse >= weightMin && weightParse <= weightMax) {
              //Retornamos lo escrito
              return search;
            }
            return '';
          }
          //Si tienen temperamentos tambien
          if (allTemperament !== -1 && state.selectWeight !== 'weight') {
            if (weightParse >= weightMin && weightParse <= weightMax) {
              //Retornamos el temperamento incluido y lo escrito
              return search && includeTemperaments;
            }
            return '';
          }

          if (allTemperament !== -1) {
            //Retornamos solo lo escrito e incluido en el temperamento sin saber el peso
            return search && includeTemperaments;
          }
          //Solo lo escrito
          return search;
        });
        if (state.dogApiDb === 'dog-database') {
          searchList = searchList.filter((dog) => dog.dog_db === true);
        }
        if (state.dogApiDb === 'dog-api') {
          searchList = searchList.filter((dog) => dog.dog_db === false);
        }
        if (state.orderAZ === 'a-z') {
          searchList = orderAlphabetically(searchList, -1, 1);
          return {
            ...state,
            inputSearch: payload,
            selectFilter: searchList,
          };
        }
        if (state.orderAZ === 'z-a') {
          searchList = orderAlphabetically(searchList, 1, -1);
          return {
            ...state,
            inputSearch: payload,
            selectFilter: searchList,
          };
        }
        if (state.orderWeightState === 'weight-desc') {
          searchList = orderWeight(searchList, 1, -1);
          return {
            ...state,
            inputSearch: payload,
            selectFilter: searchList,
          };
        }
        if (state.orderWeightState === 'weight-asc') {
          searchList = orderWeight(searchList, -1, 1);
          return {
            ...state,
            inputSearch: payload,
            selectFilter: searchList,
          };
        }
        return {
          ...state,
          inputSearch: payload,
          selectFilter: searchList,
        };
      }
      case FILTERWEIGHT: {
        const weightMaxMin = payload.split('-');
        const weightMin = Number(weightMaxMin[0]);
        const weightMax = Number(weightMaxMin[1]);
        const temperamentParser = Number(state.selectTemperament);

        let weightDogsFiltered = store.allDogs.filter((dog) => {
          const weigth = dog.dog_weight.split('-')[0];
          const weightParse = Number(weigth);
          //Cuando desmonto el weight y quiero ver todos pero estoy todavia en temperament entonces solo traigo los incluidos al temperamento
          const includeTemperaments = dog.temperament.includes(
            state.selectTemperament
          );
          const search =
            dog.dog_name
              .toLowerCase()
              .indexOf(state.inputSearch.toLowerCase()) !== -1;
          // Cuando volvamos a weight preguntamos si hay temperamentos y hay escrito algo en el input
          if (
            payload === 'weight' &&
            temperamentParser !== -1 &&
            state.inputSearch.length > 0
          ) {
            return search && includeTemperaments;
          }
          if (
            state.inputSearch.length > 0 &&
            temperamentParser === -1 &&
            Number(payload) === 100
          ) {
            if (weightParse >= Number(payload)) {
              return search;
            }
            return '';
          }
          if (
            state.inputSearch.length > 0 &&
            temperamentParser === -1 &&
            payload === 'weight'
          ) {
            return search;
          }
          if (
            state.inputSearch.length > 0 &&
            temperamentParser === -1 &&
            payload !== 'weight'
          ) {
            if (weightParse >= weightMin && weightParse <= weightMax) {
              return search;
            }
            return '';
          }
          if (payload === 'weight' && temperamentParser !== -1) {
            return includeTemperaments;
          }
          if (payload === 'weight' && temperamentParser === -1) {
            return store.allDogs;
          }
          if (
            weightParse >= weightMin &&
            weightParse <= weightMax &&
            temperamentParser !== -1 &&
            state.inputSearch.length > 0
          ) {
            return search && includeTemperaments;
          }
          if (
            weightParse >= weightMin &&
            weightParse <= weightMax &&
            temperamentParser !== -1
          ) {
            return includeTemperaments;
          }
          if (
            Number(payload) === 100 &&
            weightParse >= weightMin &&
            temperamentParser !== -1
          ) {
            return includeTemperaments;
          }
          if (Number(payload) === 100 && weightParse >= Number(payload)) {
            return dog;
          }
          if (weightParse >= weightMin && weightParse <= weightMax) {
            return dog;
          }
          return '';
        });
        if (state.dogApiDb === 'dog-database') {
          weightDogsFiltered = weightDogsFiltered.filter(
            (dog) => dog.dog_db === true
          );
        }
        if (state.dogApiDb === 'dog-api') {
          weightDogsFiltered = weightDogsFiltered.filter(
            (dog) => dog.dog_db === false
          );
        }
        if (state.orderAZ === 'a-z') {
          weightDogsFiltered = orderAlphabetically(weightDogsFiltered, -1, 1);
          return {
            ...state,
            selectWeight: payload,
            selectFilter: weightDogsFiltered,
          };
        }
        if (state.orderAZ === 'z-a') {
          weightDogsFiltered = orderAlphabetically(weightDogsFiltered, 1, -1);
          return {
            ...state,
            selectWeight: payload,
            selectFilter: weightDogsFiltered,
          };
        }
        if (state.orderWeightState === 'weight-desc') {
          weightDogsFiltered = orderWeight(weightDogsFiltered, 1, -1);
          return {
            ...state,
            selectWeight: payload,
            selectFilter: weightDogsFiltered,
          };
        }
        if (state.orderWeightState === 'weight-asc') {
          weightDogsFiltered = orderWeight(weightDogsFiltered, -1, 1);
          return {
            ...state,
            selectWeight: payload,
            selectFilter: weightDogsFiltered,
          };
        }
        return {
          ...state,
          selectWeight: payload,
          selectFilter: weightDogsFiltered,
        };
      }
      case ORDERALPHA: {
        if (payload === 'a-z') {
          const order = orderAlphabetically(state.selectFilter, -1, 1);
          return { ...state, selectFilter: order, orderAZ: payload };
        }
        if (payload === 'z-a') {
          const order = orderAlphabetically(state.selectFilter, 1, -1);
          return { ...state, selectFilter: order, orderAZ: payload };
        }
        return state;
      }
      case ORDERWEIGHT: {
        if (payload === 'weight-desc') {
          const order = orderWeight(state.selectFilter, 1, -1);
          return {
            ...state,
            selectFilter: order,
            orderWeightState: payload,
          };
        }
        if (payload === 'weight-asc') {
          const order = orderWeight(state.selectFilter, -1, 1);
          return {
            ...state,
            selectFilter: order,
            orderWeightState: payload,
          };
        }
        return state;
      }
      case DBDOG: {
        //-1 = 1 weight search
        if (payload === 'dog-database') {
          let dbDog = store.allDogs.filter((dog) => dog.dog_db === true);
          dbDog = filteredDbApiAll(dbDog);
          if (state.orderAZ === 'a-z') {
            dbDog = orderAlphabetically(dbDog, -1, 1);
            return {
              ...state,
              selectFilter: dbDog,
              dogApiDb: payload,
            };
          }
          if (state.orderAZ === 'z-a') {
            dbDog = orderAlphabetically(dbDog, 1, -1);
            return {
              ...state,
              selectFilter: dbDog,
              dogApiDb: payload,
            };
          }

          if (state.orderWeightState === 'weight-desc') {
            dbDog = orderWeight(dbDog, 1, -1);
            return {
              ...state,
              selectFilter: dbDog,
              dogApiDb: payload,
            };
          }
          if (state.orderWeightState === 'weight-asc') {
            dbDog = orderWeight(dbDog, -1, 1);
            return {
              ...state,
              selectFilter: dbDog,
              dogApiDb: payload,
            };
          }
          return {
            ...state,
            selectFilter: dbDog,
            dogApiDb: payload,
          };
        }
        if (payload === 'dog-api') {
          let apiDog = store.allDogs.filter((dog) => dog.dog_db === false);
          apiDog = filteredDbApiAll(apiDog);
          if (state.orderAZ === 'a-z') {
            apiDog = orderAlphabetically(apiDog, -1, 1);
            return {
              ...state,
              selectFilter: apiDog,
              dogApiDb: payload,
            };
          }
          if (state.orderAZ === 'z-a') {
            apiDog = orderAlphabetically(apiDog, 1, -1);
            return {
              ...state,
              selectFilter: apiDog,
              dogApiDb: payload,
            };
          }

          if (state.orderWeightState === 'weight-desc') {
            apiDog = orderWeight(apiDog, 1, -1);
            return {
              ...state,
              selectFilter: apiDog,
              dogApiDb: payload,
            };
          }
          if (state.orderWeightState === 'weight-asc') {
            apiDog = orderWeight(apiDog, -1, 1);
            return {
              ...state,
              selectFilter: apiDog,
              dogApiDb: payload,
            };
          }
          return {
            ...state,
            selectFilter: apiDog,
            dogApiDb: payload,
          };
        }
        if (payload === 'all-dog') {
          let dbApiDog = store.allDogs;
          dbApiDog = filteredDbApiAll(dbApiDog);
          if (state.orderAZ === 'a-z') {
            dbApiDog = orderAlphabetically(dbApiDog, -1, 1);
            return {
              ...state,
              selectFilter: dbApiDog,
              dogApiDb: payload,
            };
          }
          if (state.orderAZ === 'z-a') {
            dbApiDog = orderAlphabetically(dbApiDog, 1, -1);
            return {
              ...state,
              selectFilter: dbApiDog,
              dogApiDb: payload,
            };
          }

          if (state.orderWeightState === 'weight-desc') {
            dbApiDog = orderWeight(dbApiDog, 1, -1);
            return {
              ...state,
              selectFilter: dbApiDog,
              dogApiDb: payload,
            };
          }
          if (state.orderWeightState === 'weight-asc') {
            dbApiDog = orderWeight(dbApiDog, -1, 1);
            return {
              ...state,
              selectFilter: dbApiDog,
              dogApiDb: payload,
            };
          }
          return {
            ...state,
            selectFilter: dbApiDog,
            dogApiDb: payload,
          };
        }
        return {
          ...state,
          selectFilter: store.allDogs,
          dogApiDb: payload,
        };
      }
      default:
        return state;
    }
  };
  const [state, dispatchReducer] = useReducer(reducer, initialState);

  return {
    state,
    dispatchReducer,
  };
};

export default useFiltered;
