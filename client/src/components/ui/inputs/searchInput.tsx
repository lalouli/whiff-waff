import React from 'react'
import Image from 'next/image';
import VectorIcon from '../../../../public/searchIcon.svg'
import { searchInputProps } from '../../../types/inputsType';

const SearchInput: React.FC < searchInputProps> = ({onSearch}) => {
  
    return (
      <div className='relative w-full h-full text-gray-600  bg-transparent'>
        <input 
            type={'search'}
            name={'search'}
            placeholder={'Search for everything...'}
            onChange={e => onSearch(e.target.value)}
            className='bg-transparent w-fulll text-[#6C7FA7]  placeholder:text-[#6C7FA7] placeholder:font-poppins h-full pl-10 lg:pl-16 text-sm md:text-md lg:text-xl focus:outline-none'
        />
        <div className='w-5 lg:w-8 min-h-1 absolute left-4 xl:top-5 md:top-4 lg:left-5'>
            <Image src={VectorIcon } alt='vector icon'/>
        </div>
      </div>
    );
}

export default SearchInput