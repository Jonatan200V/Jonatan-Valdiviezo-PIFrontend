import {
  ALLTEMPERAMENTS,
  ALLDOGS,
  FILTERTEMPERAMENTS,
  INPUT,
  FILTERWEIGHT,
  ORDER,
  DBDOG,
  ALLDOGSDBAPI,
  SELECTFILTERALL,
  PAGE_DOG,
} from '../../services/variables';
import {
  ADD_DOG,
  DELETE_DOG,
  RESET_DATE,
  UPDATE_DOG,
} from '../actions/ActionsFiltered';

const initialState = {
  inputSearch: '',
  selectFilter: [],
  temperaments: [],
  selectTemperament: 'Temperaments',
  selectWeight: 'Weight',
  order: '',
  dogApiDb: 'all-dog',
  allDogs: [],
  values: {
    value1: 0,
    value2: 8,
    count: 1,
  },
};

const reducer = (state = initialState, action) => {
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

      const search =
        dog.dog_name.toLowerCase().indexOf(state.inputSearch.toLowerCase()) !==
        -1;

      const includeTemperaments = dog.temperament.includes(
        state.selectTemperament
      );
      if (
        state.selectTemperament === 'Temperaments' &&
        state.selectWeight === 'Weight' &&
        state.inputSearch.length > 0
      ) {
        //Retornamos lo escrito
        return search;
      }
      if (
        state.selectTemperament === 'Temperaments' &&
        state.selectWeight !== 'Weight' &&
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
        state.selectTemperament !== 'Temperaments' &&
        state.selectWeight === 'Weight' &&
        state.inputSearch.length > 0
      ) {
        return includeTemperaments && search;
      }
      if (
        state.selectTemperament !== 'Temperaments' &&
        state.selectWeight !== 'Weight' &&
        state.inputSearch.length > 0
      ) {
        if (weightParse >= weightMin && weightParse <= weightMax) {
          //Retornamos lo escrito
          return includeTemperaments && search;
        }
        return '';
      }
      if (
        state.selectTemperament !== 'Temperaments' &&
        Number(state.selectWeight) === 100 &&
        weightParse >= Number(state.selectWeight)
      ) {
        return includeTemperaments;
      }
      if (
        state.selectTemperament === 'Temperaments' &&
        Number(state.selectWeight) === 100 &&
        weightParse >= Number(state.selectWeight)
      ) {
        return dog;
      }
      if (
        state.selectTemperament !== 'Temperaments' &&
        state.selectWeight === 'Weight'
      ) {
        return includeTemperaments;
      }

      if (
        state.selectTemperament !== 'Temperaments' &&
        state.selectWeight !== 'Weight'
      ) {
        if (weightParse >= weightMin && weightParse <= weightMax) {
          //Retornamos lo escrito
          return includeTemperaments;
        }
        return '';
      }

      if (
        state.selectTemperament === 'Temperaments' &&
        state.selectWeight !== 'Weight'
      ) {
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
      let search = state.allDogs.filter((dog) => {
        const weigth = dog.dog_weight.split('-')[0];
        const weightParse = Number(weigth);
        const includeTemperaments = dog.temperament?.includes(payload);
        //Nos fijamos si hay algo escrito en el input
        const search =
          dog.dog_name
            .toLowerCase()
            .indexOf(state.inputSearch.toLocaleLowerCase()) !== -1;
        if (
          Number(state.selectWeight) === 100 &&
          state.inputSearch.length > 0 &&
          payload !== 'Temperaments'
        ) {
          if (weightParse >= Number(state.selectWeight)) {
            return includeTemperaments && search;
          }
          return '';
        }
        if (
          Number(state.selectWeight) === 100 &&
          state.inputSearch.length > 0 &&
          payload === 'Temperaments'
        ) {
          if (weightParse >= Number(state.selectWeight)) {
            return search;
          }
          return '';
        }
        if (
          state.inputSearch.length > 0 &&
          payload !== 'Temperaments' &&
          state.selectWeight !== 'Weight'
        ) {
          if (weightParse >= weightMin && weightParse <= weightMax) {
            return includeTemperaments && search;
          }
          return '';
        }
        if (
          payload === 'Temperaments' &&
          state.inputSearch.length > 0 &&
          state.selectWeight !== 'Weight'
        ) {
          if (weightParse >= weightMin && weightParse <= weightMax) {
            return search;
          }
          return '';
        }
        if (payload === 'Temperaments' && state.inputSearch.length > 0) {
          return search;
        }
        if (
          Number(state.selectWeight) === 100 &&
          weightParse >= Number(state.selectWeight)
        ) {
          return dog;
        }
        if (state.selectWeight !== 'Weight') {
          console.log('hola desde la linea 171');
          if (weightParse >= weightMin && weightParse <= weightMax) {
            if (payload === 'Temperaments') {
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
        if (payload === 'Temperaments') {
          return state.allDogs;
        }
        return includeTemperaments;
      });

      if (state.dogApiDb === 'dog-database') {
        search = search.filter((dog) => dog.dog_db === true);
      }
      if (state.dogApiDb === 'dog-api') {
        search = search.filter((dog) => dog.dog_db === false);
      }
      if (state.order === 'a-z') {
        search = orderAlphabetically(search, -1, 1);
        return {
          ...state,
          selectTemperament: payload,
          selectFilter: search,
          values: {
            ...state.values,
            value1: 0,
            value2: 8,
            count: 1,
          },
        };
      }
      if (state.order === 'z-a') {
        search = orderAlphabetically(search, 1, -1);
        return {
          ...state,
          selectTemperament: payload,
          selectFilter: search,
          values: {
            ...state.values,
            value1: 0,
            value2: 8,
            count: 1,
          },
        };
      }
      if (state.order === 'weight-desc') {
        search = orderWeight(search, 1, -1);
        return {
          ...state,
          selectTemperament: payload,
          selectFilter: search,
          values: {
            ...state.values,
            value1: 0,
            value2: 8,
            count: 1,
          },
        };
      }
      if (state.order === 'weight-asc') {
        search = orderWeight(search, -1, 1);
        return {
          ...state,
          selectTemperament: payload,
          selectFilter: search,
          values: {
            ...state.values,
            value1: 0,
            value2: 8,
            count: 1,
          },
        };
      }
      return {
        ...state,
        selectTemperament: payload,
        selectFilter: search,
        values: {
          ...state.values,
          value1: 0,
          value2: 8,
          count: 1,
        },
      };
    }
    case INPUT: {
      let searchList = state.allDogs?.filter((dog) => {
        const weigth = dog.dog_weight.split('-')[0]; //Obtenemos el primer valor del string de weigth
        const weightParse = Number(weigth);

        //Si el temperamento esta en todos y el weight tiene valores ejemplo 20 y 40 entra
        const search =
          dog.dog_name.toLowerCase().indexOf(payload.toLowerCase()) !== -1;

        const includeTemperaments = dog.temperament?.includes(
          state.selectTemperament
        );
        if (
          state.selectTemperament === 'Temperaments' &&
          Number(weightMaxMin[0]) === 100
        ) {
          if (Number(weightMaxMin[0]) <= weightParse) {
            return search;
          }
        }
        if (
          state.selectTemperament !== 'Temperaments' &&
          Number(weightMaxMin[0]) === 100
        ) {
          if (Number(weightMaxMin[0]) <= weightParse) {
            return search && includeTemperaments;
          }
          return '';
        }
        if (
          state.selectTemperament === 'Temperaments' &&
          state.selectWeight !== 'Weight'
        ) {
          // compara el peso que este entre ciertos  valores
          if (weightParse >= weightMin && weightParse <= weightMax) {
            //Retornamos lo escrito
            return search;
          }
          return '';
        }
        //Si tienen temperamentos tambien
        if (
          state.selectTemperament !== 'Temperaments' &&
          state.selectWeight !== 'Weight'
        ) {
          if (weightParse >= weightMin && weightParse <= weightMax) {
            //Retornamos el temperamento incluido y lo escrito
            return search && includeTemperaments;
          }
          return '';
        }

        if (state.selectTemperament !== 'Temperaments') {
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
      if (state.order === 'a-z') {
        searchList = orderAlphabetically(searchList, -1, 1);
        return {
          ...state,
          inputSearch: payload,
          selectFilter: searchList,
          values: {
            ...state.values,
            value1: 0,
            value2: 8,
            count: 1,
          },
        };
      }
      if (state.order === 'z-a') {
        searchList = orderAlphabetically(searchList, 1, -1);
        return {
          ...state,
          inputSearch: payload,
          selectFilter: searchList,
          values: {
            ...state.values,
            value1: 0,
            value2: 8,
            count: 1,
          },
        };
      }
      if (state.order === 'weight-desc') {
        searchList = orderWeight(searchList, 1, -1);
        return {
          ...state,
          inputSearch: payload,
          selectFilter: searchList,
          values: {
            ...state.values,
            value1: 0,
            value2: 8,
            count: 1,
          },
        };
      }
      if (state.order === 'weight-asc') {
        searchList = orderWeight(searchList, -1, 1);
        return {
          ...state,
          inputSearch: payload,
          selectFilter: searchList,
          values: {
            ...state.values,
            value1: 0,
            value2: 8,
            count: 1,
          },
        };
      }
      return {
        ...state,
        inputSearch: payload,
        selectFilter: searchList,
        values: {
          ...state.values,
          value1: 0,
          value2: 8,
          count: 1,
        },
      };
    }
    case FILTERWEIGHT: {
      const weightMaxMin = payload.split('-');
      const weightMin = Number(weightMaxMin[0]);
      const weightMax = Number(weightMaxMin[1]);
      // const temperamentParser = Number(state.selectTemperament);

      let weightDogsFiltered = state.allDogs.filter((dog) => {
        const weigth = dog.dog_weight.split('-')[0];
        const weightParse = Number(weigth);
        //Cuando desmonto el weight y quiero ver todos pero estoy todavia en temperament entonces solo traigo los incluidos al temperamento
        const includeTemperaments = dog.temperament?.includes(
          state.selectTemperament
        );
        const search =
          dog.dog_name
            .toLowerCase()
            .indexOf(state.inputSearch.toLowerCase()) !== -1;
        // Cuando volvamos a weight preguntamos si hay temperamentos y hay escrito algo en el input
        if (
          payload === 'Weight' &&
          state.selectTemperament !== 'Temperaments' &&
          state.inputSearch.length > 0
        ) {
          return search && includeTemperaments;
        }
        if (
          state.inputSearch.length > 0 &&
          state.selectTemperament === 'Temperaments' &&
          Number(payload) === 100
        ) {
          if (weightParse >= Number(payload)) {
            return search;
          }
          return '';
        }
        if (
          state.inputSearch.length > 0 &&
          state.selectTemperament === 'Temperaments' &&
          payload === 'Weight'
        ) {
          return search;
        }
        if (
          state.inputSearch.length > 0 &&
          state.selectTemperament === 'Temperaments' &&
          payload !== 'Weight'
        ) {
          if (weightParse >= weightMin && weightParse <= weightMax) {
            return search;
          }
          return '';
        }
        if (
          payload === 'Weight' &&
          state.selectTemperament !== 'Temperaments'
        ) {
          return includeTemperaments;
        }
        if (
          payload === 'Weight' &&
          state.selectTemperament === 'Temperaments'
        ) {
          return state.allDogs;
        }
        if (
          weightParse >= weightMin &&
          weightParse <= weightMax &&
          state.selectTemperament !== 'Temperaments' &&
          state.inputSearch.length > 0
        ) {
          return search && includeTemperaments;
        }
        if (
          weightParse >= weightMin &&
          weightParse <= weightMax &&
          state.selectTemperament !== 'Temperaments'
        ) {
          return includeTemperaments;
        }
        if (
          Number(payload) === 100 &&
          weightParse >= weightMin &&
          state.selectTemperament !== 'Temperaments'
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
      if (state.order === 'a-z') {
        weightDogsFiltered = orderAlphabetically(weightDogsFiltered, -1, 1);
        return {
          ...state,
          selectWeight: payload,
          selectFilter: weightDogsFiltered,
          values: {
            ...state.values,
            value1: 0,
            value2: 8,
            count: 1,
          },
        };
      }
      if (state.order === 'z-a') {
        weightDogsFiltered = orderAlphabetically(weightDogsFiltered, 1, -1);
        return {
          ...state,
          selectWeight: payload,
          selectFilter: weightDogsFiltered,
          values: {
            ...state.values,
            value1: 0,
            value2: 8,
            count: 1,
          },
        };
      }
      if (state.order === 'weight-desc') {
        weightDogsFiltered = orderWeight(weightDogsFiltered, 1, -1);
        return {
          ...state,
          selectWeight: payload,
          selectFilter: weightDogsFiltered,
          values: {
            ...state.values,
            value1: 0,
            value2: 8,
            count: 1,
          },
        };
      }
      if (state.order === 'weight-asc') {
        weightDogsFiltered = orderWeight(weightDogsFiltered, -1, 1);
        return {
          ...state,
          selectWeight: payload,
          selectFilter: weightDogsFiltered,
          values: {
            ...state.values,
            value1: 0,
            value2: 8,
            count: 1,
          },
        };
      }
      return {
        ...state,
        selectWeight: payload,
        selectFilter: weightDogsFiltered,
        values: {
          ...state.values,
          value1: 0,
          value2: 8,
          count: 1,
        },
      };
    }
    case ORDER: {
      if (payload === 'a-z') {
        const order = orderAlphabetically(state.selectFilter, -1, 1);
        return { ...state, selectFilter: order, order: payload };
      }
      if (payload === 'z-a') {
        const order = orderAlphabetically(state.selectFilter, 1, -1);
        return { ...state, selectFilter: order, order: payload };
      }
      if (payload === 'weight-desc') {
        const order = orderWeight(state.selectFilter, 1, -1);
        return {
          ...state,
          selectFilter: order,
          order: payload,
        };
      }
      if (payload === 'weight-asc') {
        const order = orderWeight(state.selectFilter, -1, 1);
        return {
          ...state,
          selectFilter: order,
          order: payload,
        };
      }
      return state;
    }
    case DBDOG: {
      //-1 = 1 weight search
      if (payload === 'dog-database') {
        let dbDog = state.allDogs.filter((dog) => dog.dog_db === true);
        dbDog = filteredDbApiAll(dbDog);
        if (state.order === 'a-z') {
          dbDog = orderAlphabetically(dbDog, -1, 1);
          return {
            ...state,
            selectFilter: dbDog,
            dogApiDb: payload,
            values: {
              ...state.values,
              value1: 0,
              value2: 8,
              count: 1,
            },
          };
        }
        if (state.order === 'z-a') {
          dbDog = orderAlphabetically(dbDog, 1, -1);
          return {
            ...state,
            selectFilter: dbDog,
            dogApiDb: payload,
            values: {
              ...state.values,
              value1: 0,
              value2: 8,
              count: 1,
            },
          };
        }

        if (state.order === 'weight-desc') {
          dbDog = orderWeight(dbDog, 1, -1);
          return {
            ...state,
            selectFilter: dbDog,
            dogApiDb: payload,
            values: {
              ...state.values,
              value1: 0,
              value2: 8,
              count: 1,
            },
          };
        }
        if (state.order === 'weight-asc') {
          dbDog = orderWeight(dbDog, -1, 1);
          return {
            ...state,
            selectFilter: dbDog,
            dogApiDb: payload,
            values: {
              ...state.values,
              value1: 0,
              value2: 8,
              count: 1,
            },
          };
        }
        return {
          ...state,
          selectFilter: dbDog,
          dogApiDb: payload,
          values: {
            ...state.values,
            value1: 0,
            value2: 8,
            count: 1,
          },
        };
      }
      if (payload === 'dog-api') {
        let apiDog = state.allDogs.filter((dog) => dog.dog_db === false);
        apiDog = filteredDbApiAll(apiDog);
        if (state.order === 'a-z') {
          apiDog = orderAlphabetically(apiDog, -1, 1);
          return {
            ...state,
            selectFilter: apiDog,
            dogApiDb: payload,
            values: {
              ...state.values,
              value1: 0,
              value2: 8,
              count: 1,
            },
          };
        }
        if (state.order === 'z-a') {
          apiDog = orderAlphabetically(apiDog, 1, -1);
          return {
            ...state,
            selectFilter: apiDog,
            dogApiDb: payload,
            values: {
              ...state.values,
              value1: 0,
              value2: 8,
              count: 1,
            },
          };
        }

        if (state.order === 'weight-desc') {
          apiDog = orderWeight(apiDog, 1, -1);
          return {
            ...state,
            selectFilter: apiDog,
            dogApiDb: payload,
            values: {
              ...state.values,
              value1: 0,
              value2: 8,
              count: 1,
            },
          };
        }
        if (state.order === 'weight-asc') {
          apiDog = orderWeight(apiDog, -1, 1);
          return {
            ...state,
            selectFilter: apiDog,
            dogApiDb: payload,
            values: {
              ...state.values,
              value1: 0,
              value2: 8,
              count: 1,
            },
          };
        }
        return {
          ...state,
          selectFilter: apiDog,
          dogApiDb: payload,
          values: {
            ...state.values,
            value1: 0,
            value2: 8,
            count: 1,
          },
        };
      }
      if (payload === 'all-dog') {
        let dbApiDog = state.allDogs;
        dbApiDog = filteredDbApiAll(dbApiDog);
        if (state.order === 'a-z') {
          dbApiDog = orderAlphabetically(dbApiDog, -1, 1);
          return {
            ...state,
            selectFilter: dbApiDog,
            dogApiDb: payload,
            values: {
              ...state.values,
              value1: 0,
              value2: 8,
              count: 1,
            },
          };
        }
        if (state.order === 'z-a') {
          dbApiDog = orderAlphabetically(dbApiDog, 1, -1);
          return {
            ...state,
            selectFilter: dbApiDog,
            dogApiDb: payload,
            values: {
              ...state.values,
              value1: 0,
              value2: 8,
              count: 1,
            },
          };
        }

        if (state.order === 'weight-desc') {
          dbApiDog = orderWeight(dbApiDog, 1, -1);
          return {
            ...state,
            selectFilter: dbApiDog,
            dogApiDb: payload,
          };
        }
        if (state.order === 'weight-asc') {
          dbApiDog = orderWeight(dbApiDog, -1, 1);
          return {
            ...state,
            selectFilter: dbApiDog,
            dogApiDb: payload,
            values: {
              ...state.values,
              value1: 0,
              value2: 8,
              count: 1,
            },
          };
        }
        return {
          ...state,
          selectFilter: dbApiDog,
          dogApiDb: payload,
          values: {
            ...state.values,
            value1: 0,
            value2: 8,
            count: 1,
          },
        };
      }
      return {
        ...state,
        selectFilter: state.allDogs,
        dogApiDb: payload,
        values: {
          ...state.values,
          value1: 0,
          value2: 8,
          count: 1,
        },
      };
    }
    case ALLDOGSDBAPI: {
      return {
        ...state,
        allDogs: payload,
      };
    }
    case SELECTFILTERALL: {
      return {
        ...state,
        selectFilter: payload,
      };
    }
    case DELETE_DOG: {
      const newSelectFilter = state.selectFilter.filter(
        (dog) => dog.dog_id !== payload
      );
      const newAllDogs = state.selectFilter.filter(
        (dog) => dog.dog_id !== payload
      );
      return {
        ...state,
        selectFilter: newSelectFilter,
        allDogs: newAllDogs,
      };
    }
    case UPDATE_DOG: {
      let newSelectFilter = [...state.selectFilter];
      let updateSelectFilter = newSelectFilter.find(
        (dog) => dog.dog_id === payload.dog_id
      );
      updateSelectFilter.dog_name = payload.dog_name;
      updateSelectFilter.dog_weight = payload.dog_weight;
      updateSelectFilter.dog_height = payload.dog_height;
      updateSelectFilter.dog_lifeSpan = payload.dog_lifeSpan;
      return {
        ...state,
        selectFilter: newSelectFilter,
      };
    }
    case ADD_DOG: {
      const { inputCreate, imageDefault, inputTemperament } = payload;
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
      const ID = Math.max(...state.selectFilter.map((dog) => dog.dog_id)) + 1;
      console.log(temperaments);
      const newDog = {
        dog_id: ID,
        dog_name,
        dog_db,
        dog_height: `${dog_heightMin}-${dog_heightMax}`,
        dog_weight: `${dog_weightMin}-${dog_weightMax}`,
        dog_lifeSpan: `${dog_lifeSpanMin}-${dog_lifeSpanMax}`,
        dog_image: dog_image.length > 0 ? dog_image : imageDefault,
        temperament: temperaments,
      };
      return {
        ...state,
        allDogs: [...state.allDogs, newDog],
        selectFilter: [...state.selectFilter, newDog],
      };
    }
    case PAGE_DOG: {
      if (payload === '@page/next') {
        if (state.values.value2 < 8) state.values.value2 = 8;
        const val1 =
          state.values.value1 >= state.selectFilter.length - 8
            ? (state.values.value1 = 0)
            : state.values.value1 + 8;
        const val2 =
          state.values.value2 >= state.selectFilter.length
            ? 8
            : state.values.value2 + 8;
        if (state.values.value2 >= state.selectFilter.length && val2 === 8) {
          return {
            ...state,
            values: {
              ...state.values,
              value1: val1,
              value2: val2,
              count: 1,
            },
          };
        }
        return {
          ...state,
          values: {
            ...state.values,
            value1: val1,
            value2: val2,
            count: state.values.count + 1,
          },
        };
      }
      if (payload === '@page/prev') {
        let val1 =
          state.values.value1 <= 0
            ? state.selectFilter.length - 8
            : state.values.value1 - 8;
        const val2 =
          state.values.value2 <= 8
            ? state.selectFilter.length
            : state.values.value2 - 8;
        // Si val1 es igual o menor a 0 lo igual a 0 para que no me deje pantalla en blanco porque si no slice no sabe que cortar
        if (val1 <= 0) val1 = 0;
        if (state.values.value1 <= 0) {
          // storePage.mainDogs.values.value1 <= 0
          return {
            ...state,
            values: {
              ...state.values,
              value1: val1,
              value2: val2,
              count: Math.ceil(state.selectFilter.length / 8),
            },
          };
        }
        return {
          ...state,
          values: {
            ...state.values,
            value1: val1,
            value2: val2,
            count: state.values.count - 1,
          },
        };
      }
      return state;
    }
    case RESET_DATE: {
      return {
        ...state,
        inputSearch: '',
        selectTemperament: 'Temperaments',
        selectWeight: 'Weight',
        order: '',
        dogApiDb: 'all-dog',
        values: {
          value1: state.selectFilter.length - 8,
          value2: state.selectFilter.length,
          count: Math.ceil(state.selectFilter.length / 8),
        },
      };
    }
    default:
      return state;
  }
};
export default reducer;
