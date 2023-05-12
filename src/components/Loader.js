import React from 'react';
import { MoonLoader } from 'react-spinners';

const Loader = ({ isLoading, color, message = '' }) => {
  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex flex-col items-center justify-center z-50 text-white'>
      <MoonLoader
        loading={isLoading}
        color={color}
        speedMultiplier={0.5}
        size={50}
      />
      <p className='mt-3 font-semibold text-xl'>{message}</p>
    </div>
  );
};

export default Loader;
