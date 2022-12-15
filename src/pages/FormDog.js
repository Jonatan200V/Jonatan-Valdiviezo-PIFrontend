import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Form from '../components/form/Form';
import Header from '../components/Header/Header';
import { createDog, getAllTemperaments } from '../redux/actions/Actions';
import { addDogState, resetDogs } from '../redux/actions/ActionsFiltered';
import { imageDefault, expresiones } from '../services/selectarray';
import {
  FILTERTEMPERAMENTS,
  INITIAL_STATE_FORM,
  INITIAL_STATE_VARIABLES,
} from '../services/variables';

const FormDog = () => {
  const [inputCreate, setInputCreate] = useState(INITIAL_STATE_FORM);
  const [validations, setValidations] = useState(INITIAL_STATE_VARIABLES);
  const [inputTemperament, setInputTemperament] = useState([]);
  const [responseBackend, setResponseBackend] = useState({
    message: '',
    status: null,
  });
  const refSuccessfully = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    dog_name,
    dog_heightMin,
    dog_heightMax,
    dog_weightMin,
    dog_weightMax,
    dog_lifeSpanMin,
    dog_lifeSpanMax,
    temperament_name,
  } = inputCreate;
  const store = useSelector((state) => state);

  useEffect(() => {
    document.title = 'Form';
    if (store.filterDogs.user.length === 0) {
      navigate('/');
    }
    dispatch(getAllTemperaments(false, 'temperaments'));
  }, [dispatch]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (
      !expresiones.name.test(dog_name) ||
      !expresiones.passHW.test(`${dog_heightMin}-${dog_heightMax}`) ||
      !expresiones.passHW.test(`${dog_weightMin}-${dog_weightMax}`) ||
      !expresiones.passA.test(`${dog_lifeSpanMin}-${dog_lifeSpanMax}`) ||
      (inputTemperament.length === 0 && temperament_name.length === 0) ||
      dog_name.trim().length === 0
    ) {
      setTimeout(() => {
        setValidations({
          ...validations,
          formSend: true,
          temperamentsCreateOrSelect: true,
        });
      }, 4000);
      return setValidations({
        ...validations,
        formSend: false,
        temperamentsCreateOrSelect: false,
      });
    }
    const data = await dispatch(
      createDog(inputCreate, imageDefault, inputTemperament)
    );
    dispatch(addDogState(inputCreate, imageDefault, inputTemperament));
    if (data.payload.res.status === 201) {
      setResponseBackend({
        message: data.payload.data.msg,
        status: data.payload.res.status,
      });
      refSuccessfully.current.classList.add('formdog__successfully');
      document.body.classList.add('body');
      setInputCreate(INITIAL_STATE_FORM);
      dispatch(resetDogs());
      dispatch({ type: FILTERTEMPERAMENTS, payload: 'Temperaments' });
      setTimeout(() => {
        refSuccessfully.current.classList.remove('formdog__successfully');
        document.body.classList.remove('body');
        navigate('/home');
      }, 2000);
    } else {
      setResponseBackend({
        message: data.payload.data.msg,
        status: data.payload.res.status,
      });
      refSuccessfully.current.classList.add('formdog__bad-request');
      setTimeout(() => {
        refSuccessfully.current.classList.remove('formdog__bad-request');
      }, 5000);
    }
  };
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputCreate({
      ...inputCreate,
      [name]: value,
    });

    switch (name) {
      case 'dog_name': {
        return expresiones.name.test(value) && value.trim().length !== 0
          ? setValidations({ ...validations, dogName: true })
          : setValidations({ ...validations, dogName: false });
      }
      case 'dog_heightMax': {
        return expresiones.passHW.test(`${dog_heightMin}-${value}`) &&
          Number(value) > Number(dog_heightMin) &&
          Number(value) !== 0 &&
          Number(dog_heightMin)
          ? setValidations({ ...validations, dogHeight: true })
          : setValidations({ ...validations, dogHeight: false });
      }
      case 'dog_heightMin': {
        return expresiones.passHW.test(`${value}-${dog_heightMax}`) &&
          Number(value) < Number(dog_heightMax) &&
          Number(value) !== 0 &&
          Number(dog_heightMax) !== 0
          ? setValidations({ ...validations, dogHeight: true })
          : setValidations({ ...validations, dogHeight: false });
      }
      case 'dog_weightMax': {
        return expresiones.passHW.test(`${dog_weightMin}-${value}`) &&
          Number(value) > Number(dog_weightMin) &&
          Number(value) !== 0 &&
          Number(dog_weightMin) !== 0
          ? setValidations({ ...validations, dogWeight: true })
          : setValidations({ ...validations, dogWeight: false });
      }
      case 'dog_weightMin': {
        return expresiones.passHW.test(`${value}-${dog_heightMax}`) &&
          Number(value) < Number(dog_weightMax) &&
          Number(value) !== 0 &&
          Number(dog_weightMax) !== 0
          ? setValidations({ ...validations, dogWeight: true })
          : setValidations({ ...validations, dogWeight: false });
      }
      case 'dog_lifeSpanMax': {
        return expresiones.passA.test(`${dog_lifeSpanMin}-${value}`) &&
          Number(value) > Number(dog_lifeSpanMin) &&
          Number(value) !== 0 &&
          Number(dog_lifeSpanMin) !== 0
          ? setValidations({ ...validations, dogLifeSpan: true })
          : setValidations({ ...validations, dogLifeSpan: false });
      }
      case 'dog_lifeSpanMin': {
        return expresiones.passA.test(`${value}-${dog_lifeSpanMax}`) &&
          Number(value) < Number(dog_lifeSpanMax) &&
          Number(value) !== 0 &&
          Number(dog_lifeSpanMax) !== 0
          ? setValidations({ ...validations, dogLifeSpan: true })
          : setValidations({ ...validations, dogLifeSpan: false });
      }
      default:
        return;
    }
  };
  const handleChangeFiles = (evt) => {
    const element = evt.target;
    const file = element.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setInputCreate({ ...inputCreate, dog_image: reader.result.toString() });
    };
  };
  const handleChangeTemperament = (evt) => {
    const { value } = evt.target;
    if (value === 'Temperaments') return;
    const existTemperament = inputTemperament.find(
      (temperament) => temperament === value
    );
    if (!existTemperament) {
      setInputTemperament([...inputTemperament, value]);
    }
  };
  const handleDeleteTemperament = (temperamentName) => {
    console.log(temperamentName);
    const inputTemperamentDelete = inputTemperament.filter(
      (temperament) => temperament !== temperamentName
    );
    setInputTemperament([...inputTemperamentDelete]);
  };

  return (
    <div>
      <Header />
      <div className='formdog'>
        <Form
          responseBackend={responseBackend}
          handleChange={handleChange}
          handleChangeFiles={handleChangeFiles}
          handleSubmit={handleSubmit}
          handleChangeTemperament={handleChangeTemperament}
          handleDeleteTemperament={handleDeleteTemperament}
          inputTemperament={inputTemperament}
          inputCreate={inputCreate}
          validations={validations}
          successfully={refSuccessfully}
          store={store.fetchingDogs.allTemperaments}
        />
      </div>
      <Footer />
    </div>
  );
};

export default FormDog;
