import React, { useContext } from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { URL } from '../../utils';
import axios from 'axios'
import { UserContext } from '../contexts/UserContext';




export const Login = () => {
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const[error, setError]=useState(false);
  const navigate=useNavigate();
  const {setUser}=useContext(UserContext);

  const handleLogin =async()=>{
   try{
const res= await axios.post(URL+'/auth/login', {email, password}, {withCredentials:true});
  if(res.data===404){
    setError(true);
    setUser(null);
    navigate('/error/login')
    console.log(e);
  }  
  console.log(res);
  setUser(res.data);
  navigate('/');
 
   }catch(e){
      setError(true);
      setUser(null);
      navigate('/error/login')
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
      <div className=' bg-transparent text-left ml-5 text-3xl font-extrabold mt-7'>
        <Link to='/'>Sugam</Link>
      </div>

    <div className='w-full flex justify-center items-center h-[100vh] '>
      <div className='flex flex-col justify-center items-center space-y-4 w-[70%] md:w-[60%] lg:w-[50%]'>
        
        <h1 className='text-2xl mb-6 font-bold uppercase font-serif'>Login</h1>
       
        <input
        type="email" 
        placeholder='email@email.com' 
        name="" 
        id=""
         className=' text-center w-full px-4 py-2 outline-none border-2 border-black rounded-3xl'
        onChange={(e)=>{setEmail(e.target.value)}}
        />

        <input 
        type="password" 
        placeholder='password' 
        className='text-center w-full px-4 py-2 outline-none border-2 border-black rounded-3xl'
        onChange={(e)=>{setPassword(e.target.value)}}
        />

        <button
        className=' h-10 w-full px-4 text-lg font-bold text-white bg-black rounded-3xl hover:bg-gray-200 hover:text-black'
        onClick={handleLogin}
        >
          Login
        </button>
        <div className='flex space-x-3 sm:flex-col md:flex-row lg:flex-row'>
        <div> 
          New User ?
          </div>
          <div>
          <Link to='/register'
         className=' text-gray-500'>
          Register
       </Link>
          </div>

        </div>

      </div>
    </div>
    </>
    )
}
