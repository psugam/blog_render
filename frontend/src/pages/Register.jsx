import React, { useState } from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios';
import {URL} from '../../utils.js'

export const Register = () => {
  const [username, setUsername]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [error, setError]=useState(true);
const navigate=useNavigate();


  const handleRegister=async()=>{
    try{
      const res=await axios.post(URL+'/auth/register',{username, email, password});
      console.log(res);
    if(!res.data.username){
      navigate('/error/register');
    }
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      navigate('/login');
      

    }catch(e){
      setError(true);
      navigate('/error/register')
      console.log(e);

    }
  }
  return (
    <>
      <div className=' absolute top-[5%] right-[5%] text-4xl font-semibold'>
      <Link to='/' >
      X
      </Link>
      </div>
      <h1 className='text-left ml-5 text-3xl font-extrabold mt-7'>
      <Link to='/' >
      Sugam
      </Link>
        </h1>

    <div className='w-full flex justify-center items-center h-[100vh] '>
    <div className='flex flex-col justify-center items-center space-y-4 w-[70%] md:w-[60%] lg:w-[50%]'>
      
      <h1 className='text-2xl mb-6 font-bold uppercase font-serif'>Register</h1>
     
      <input
      type="text" 
      placeholder='username' 
      name="" 
      id=""
       className=' text-center w-full px-4 py-2 outline-none border-2 border-black rounded-3xl'
       onChange={(e)=>{
        setUsername(e.target.value);
       }}
       />

      <input
      type="email" 
      placeholder='email@email.com' 
      name="" 
      id=""
       className=' text-center w-full px-4 py-2 outline-none border-2 border-black rounded-3xl'
       onChange={(e)=>{
        setEmail(e.target.value);
       }}
       />

      <input 
      type="password" 
      placeholder='password' 
      className='text-center w-full px-4 py-2 outline-none border-2 border-black rounded-3xl'
      onChange={(e)=>{
        setPassword(e.target.value);
      }}
      />

      <button
      className=' h-10 w-full px-4 text-lg font-bold text-white bg-black rounded-3xl hover:bg-gray-200 hover:text-black'
      onClick={handleRegister}
      >
        Register
      </button>
      <div className='flex space-x-3 sm:flex-col md:flex-row lg:flex-row text-center'>
      <div> 
        Already Registered ?
        </div>
        <div>
        <Link to='/login'
       className=' text-gray-500'>
        Login
     </Link>
        </div>

      </div>

    </div>
  </div>
  </>
  )
}
