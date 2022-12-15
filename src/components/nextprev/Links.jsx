import React from 'react';
import { Link } from 'react-router-dom';
import All from '../all/All';

const Links = ({ dogInfo }) => {
  return (
    <div className='detail__links'>
      {dogInfo?.slice(0, 1)?.map((dog) => (
        <Link
          key={dog.dog_id}
          to={`/dog/${dog.dog_id}`}
          className='links detail__link-button'
        >
          <div className='detail__linkabsolute'>Prev</div>
          <img src={dog.dog_image} alt={dog.dog_name} loading='lazy' />
        </Link>
      ))}
      <All />
      {dogInfo?.slice(1, 2)?.map((dog) => (
        <Link
          key={dog.dog_id}
          to={`/dog/${dog.dog_id}`}
          className='links detail__link-button'
        >
          <div className='detail__linkabsolute'>Next</div>
          <img src={dog.dog_image} alt={dog.dog_name} loading='lazy' />
        </Link>
      ))}
    </div>
  );
};

export default Links;
