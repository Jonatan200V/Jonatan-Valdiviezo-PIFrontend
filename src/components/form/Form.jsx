import React from 'react';
import { deleteTemperament } from '../../icons';
import Button from '../button/Button';

const Form = ({
  handleSubmit,
  handleChange,
  handleChangeFiles,
  handleChangeTemperament,
  handleDeleteTemperament,
  inputTemperament,
  validations,
  inputCreate,
  successfully,
  store,
  responseBackend,
}) => {
  const {
    dog_name,
    dog_heightMin,
    dog_heightMax,
    dog_weightMin,
    dog_weightMax,
    dog_lifeSpanMin,
    dog_lifeSpanMax,
    temperament_name,
    dog_image,
  } = inputCreate;

  return (
    <form className='formdog__form' onSubmit={handleSubmit}>
      <div ref={successfully} className='formdog__success'>
        {responseBackend.message}
        {responseBackend.status === 500 ? (
          <img
            className='formdog__img'
            src='../assets/fail.jpg'
            alt='Race Created'
            loading='lazy'
          />
        ) : (
          <img
            className='formdog__img'
            src='../assets/successfully.gif'
            alt='Race Created'
            loading='lazy'
          />
        )}
      </div>
      <div className='formdog__div'>
        <input
          className='formdog__input'
          placeholder='Breed name'
          onChange={handleChange}
          value={dog_name}
          name='dog_name'
          type='text'
        />
        {validations.dogName ? null : (
          <span className='formdog__span'>
            The name cannot contain numbers and must have between 5 to 40
            letters
          </span>
        )}
      </div>
      <div className='formdog__div'>
        <div className='formdog__flex'>
          <input
            className='formdog__input'
            placeholder='Minimum height'
            onChange={handleChange}
            value={dog_heightMin}
            name='dog_heightMin'
            type='number'
          />
          <input
            className='formdog__input'
            placeholder='Maximum height'
            onChange={handleChange}
            value={dog_heightMax}
            name='dog_heightMax'
            type='number'
          />
        </div>
        {validations.dogHeight ? null : (
          <span className='formdog__span'>
            The height of the dog must have a minimum and maximum cannot have a
            value of 0 no decimal values
          </span>
        )}
      </div>
      <div className='formdog__div'>
        <div className='formdog__flex'>
          <input
            className='formdog__input'
            placeholder='Minimun weight'
            onChange={handleChange}
            value={dog_weightMin}
            name='dog_weightMin'
            type='number'
          />
          <input
            className='formdog__input'
            placeholder='Maximum weight'
            onChange={handleChange}
            value={dog_weightMax}
            name='dog_weightMax'
            type='number'
          />
        </div>
        {validations.dogWeight ? null : (
          <span className='formdog__span'>
            The weight of the dog must have a minimum and maximum can not have a
            value of 0 no decimal values
          </span>
        )}
      </div>
      <div className='formdog__div'>
        <div className='formdog__flex'>
          <input
            className='formdog__input'
            placeholder='Life expectancy Min'
            onChange={handleChange}
            value={dog_lifeSpanMin}
            name='dog_lifeSpanMin'
            type='number'
          />
          <input
            className='formdog__input'
            placeholder='Life expectancy Max'
            onChange={handleChange}
            value={dog_lifeSpanMax}
            name='dog_lifeSpanMax'
            type='number'
          />
        </div>
        {validations.dogLifeSpan ? null : (
          <span className='formdog__span'>
            Life expectancy cannot exceed 99 years they cannot have a value of 0
            no decimal values
          </span>
        )}
      </div>

      <input
        className='formdog__input'
        placeholder='Temperaments'
        onChange={handleChange}
        value={temperament_name}
        name='temperament_name'
        type='text'
      />

      <div className='formdog__temperaments'>
        <select className='home__select' onChange={handleChangeTemperament}>
          <option className='home__option'>Temperaments</option>
          {store?.map((temp) => (
            <option
              className='home__option'
              key={temp.temperament_id}
              value={temp.temperament_name}
            >
              {temp.temperament_name}
            </option>
          ))}
        </select>
        {inputTemperament.length > 0 ? (
          <div className='formdog__divflex'>
            {inputTemperament.map((temperament) => (
              <div className='formdog__divtemperament' key={temperament}>
                {temperament}
                <span
                  name={temperament}
                  onClick={() => handleDeleteTemperament(temperament)}
                  className='formdog__buttontemperament'
                >
                  {deleteTemperament}
                </span>
              </div>
            ))}
          </div>
        ) : null}

        {inputTemperament.length === 0 &&
        temperament_name.length === 0 &&
        validations.temperamentsCreateOrSelect === false ? (
          <div className='formdog__temperaments-span'>
            <span className='formdog__span'>
              "Select or create at least 1 temperament"
            </span>
          </div>
        ) : null}
      </div>
      <div className='formdog__files'>
        <span className='formdog__addfiles'>Add File</span>
        <input
          className='formdog__input formdog__three'
          onChange={handleChangeFiles}
          name='dog_images'
          type='file'
        />
      </div>
      {dog_image.length > 0 ? (
        <img
          className='formdog__images'
          src={dog_image}
          alt='image_dog'
          loading='lazy'
        />
      ) : (
        <img
          className='formdog__images'
          src='../assets/default.jpg'
          alt='image_default'
          loading='lazy'
        />
      )}
      <div className='formdog__button'>
        <Button valor='Send' name='Send' />
      </div>
      {validations.formSend ? null : (
        <span className='formdog__span formdog__send'>
          Please complete the fields with the requested information
        </span>
      )}
    </form>
  );
};

export default Form;
