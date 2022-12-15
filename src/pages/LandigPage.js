import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandigPage = () => {
  useEffect(() => {
    document.title = 'Landing';
  }, []);
  return (
    <div className='landing'>
      <Link className='link landing__link' to='/home'>
        Home
      </Link>
      <div className='landing__div'>
        <div>
          <img src='../assets/perro.jpg' alt='Lading' loading='lazy' />
        </div>
        <span className='landing__span'>
          Welcome to the puppy app you can see all the different breeds of dogs
          to know which one they like more and maybe in some future adopt one.
        </span>
      </div>
    </div>
  );
};

export default LandigPage;
