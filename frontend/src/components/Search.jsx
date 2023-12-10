import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Navigate, useNavigate } from 'react-router-dom';

export const Search = () => {

  const navigate=useNavigate();
  const [prompt,setPrompt]=useState('');
  const handleSearch =()=>{

  }
  return (
    <div className='flex justify-center items-center space-x-5'>
    <input 
    type="text"
     name="" 
     id="" 
     onChange={(e)=>{
      setPrompt(e.target.value);
     }}
     placeholder='Search'
    className=' outline-none h-[50%] text-black text-center font-semibold p-1'
    />
    <FaSearch
    className='cursor-pointer'
    onClick={()=>{
      prompt?navigate(`?search=${prompt}`):navigate('/');}}
    />
    </div>
  )
}
