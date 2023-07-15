import React from 'react'
import Image from 'next/image';
import VectorIcon from '../../../../public/searchIcon.svg'
import { useState, ChangeEvent } from 'react';

const searchInput: React.FC = () => {

    const [value, setValue] = React.useState('Enter your search here');
    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {target} = e;
        setValue(target.value);
        console.log(value);
     };
    return (
      <div className='relative w-full text-gray-600'>
        <input 
            type={'search'}
            name={'search'}
            placeholder={value}
            className=' bg-CarbonGrey bg-opacity-20 w-64 sm:w-28 :md:w-40 lg:w-96 h-10 md:h-9 lg:h-10 px-10 pr-5  rounded-full text-sm focus:outline-none'
            onChange={searchHandler}
        />
        <button type='submit' className='absolute left-0 top-0 mt-3 ml-4'>
                <Image src={VectorIcon } alt='vector icon' width={15} />
        </button>
      </div>
    );
}

export default searchInput