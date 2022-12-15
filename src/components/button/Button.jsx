import React from 'react';
const Button = ({ valor, onClickEvent = null, name }) => {
  return (
    <button name={name} className='button__a' onClick={onClickEvent}>
      <span className='button__span' name='update'>
        {valor}
      </span>
      <i className='button__i'></i>
    </button>
  );
};

export default Button;
