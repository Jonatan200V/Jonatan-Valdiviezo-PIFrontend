import React from 'react';
import { Link } from 'react-router-dom';

const All = () => {
  return (
    <Link to='/home' className='detail__divrandom detail__link-button'>
      <div className='detail__linkabsolute'>All</div>
      <div>
        <div className='detail__white'></div>
        <div className='detail__white'></div>
      </div>
      <div>
        <div className='detail__white'></div>
        <div className='detail__white'></div>
      </div>
      <div>
        <div className='detail__white'></div>
        <div className='detail__white'></div>
      </div>
    </Link>
  );
};

export default All;
