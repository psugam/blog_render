import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from './Search'
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import {URL} from '../../utils.js'



export const Menu = () => {
  
  const {user, setUser}=useContext(UserContext);
  const handleLogout=async()=>{
    try{
    const res=await axios.get(URL+'/auth/logout', {withCredentials:true});
      console.log(res);
      setUser(null);
  }catch(e){
      console.log(e);
    }
  }
  return (
    <>{
        !user && <div className=' bg-gray-300 text-white w-max flex flex-col items-center absolute top-12 right-8 border-gray-400 border-2 rounded-xl p-2' >
        <h3 className='text-black text-lg hover:text-gray-500 p-1 '>
            <Link to='/login'>
            Login
            </Link>
        </h3>
        <h3 className='text-black text-lg hover:text-gray-500 p-1'>
        <Link to='/register'>
        Register
        </Link>
        
        </h3>
        <Search/>
    </div>}
    {user && <div className=' bg-gray-300 text-white w-max flex flex-col items-center absolute top-12 right-8 border-gray-400 border-2 rounded-xl p-2' >
     <h3 className='text-black text-lg hover:text-gray-500 p-1 '>
         <Link to='/write'>
         Write
         </Link>
     </h3>
     <h3 className='text-black text-lg hover:text-gray-500 p-1'>
     <Link to='/profile/1'>
     Profile
     </Link>
     
     </h3>
     <h3 className='text-black text-lg hover:text-gray-500 p-1'
     >
     <Link to='/' onClick={handleLogout}>
     Logout
     </Link>
     
     </h3>
     <Search/>
 </div>
    }
   
    
    </>
  )
}
