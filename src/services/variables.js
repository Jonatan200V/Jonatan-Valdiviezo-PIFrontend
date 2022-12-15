const INITIAL_STATE_FORM = {
  dog_name: '',
  dog_heightMin: false,
  dog_heightMax: false,
  dog_weightMin: false,
  dog_weightMax: false,
  dog_lifeSpanMin: false,
  dog_lifeSpanMax: false,
  dog_image: '',
  dog_db: true,
  temperament_name: '',
};
const INITIAL_STATE_VARIABLES = {
  dogName: true,
  dogHeight: true,
  dogWeight: true,
  dogLifeSpan: true,
  formSend: true,
  temperamentsCreateOrSelect: true,
};

const INITIAL_STATE_LOGIN = {
  userName: true,
  userSurname: true,
  userEmail: true,
  userPassword: true,
  userPasswordConfirm: true,
  userSend: true,
};
const ALLTEMPERAMENTS = '@fetch/temperaments';
const ALLDOGS = '@fetch/dogs';
const FILTERTEMPERAMENTS = '@filter/temperaments';
const INPUT = '@filter/input';
const FILTERWEIGHT = '@filter/weight';
const ORDER = '@filter/order';
const DBDOG = '@filter/dbapidog';
const ALLDOGSDBAPI = '@filter/alldogdbapi';
const SELECTFILTERALL = '@filter/dog-all';
const PAGE_DOG = '@filter/page';
export {
  INITIAL_STATE_FORM,
  INITIAL_STATE_VARIABLES,
  INITIAL_STATE_LOGIN,
  ALLTEMPERAMENTS,
  ALLDOGS,
  FILTERTEMPERAMENTS,
  INPUT,
  FILTERWEIGHT,
  ORDER,
  DBDOG,
  PAGE_DOG,
  SELECTFILTERALL,
  ALLDOGSDBAPI,
};
