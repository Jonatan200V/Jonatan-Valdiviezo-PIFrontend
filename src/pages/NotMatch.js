import React from 'react';

const NotMatch = () => {
  return (
    <div className='error'>
      <span className='error__span'>ERROR 404 Page Not Found</span>
      <img
        className='error__img'
        src='../assets/PageNotFound.jpg'
        alt='Error404'
        loading='lazy'
      />
    </div>
  );
};

export default NotMatch;
