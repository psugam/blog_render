import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProfilePosts from '../components/ProfilePosts'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../contexts/UserContext'
import { URL } from '../../utils'
import axios from 'axios'
import HomePosts from '../components/HomePosts.jsx'

import { Navigate, useNavigate } from 'react-router-dom'

export const ProfilePage = () => {
  const {user, setUser} =useContext(UserContext);
  const [loader, setLoader] = useState(false);
  //console.log(search);
  const [posts, setPosts] = useState([]);
  const [noresult, setNoresult] = useState(false);
  const navigate=useNavigate();

  const fetchPosts = async () => {
    try {
      setLoader(true);
      let res = await axios.get(URL + "/post/user/" + user._id);
      if (res.data.length === 0) {
        setNoresult(true);
      } else {
        setNoresult(false);
      }
      setPosts(res.data);
      //  console.log(posts);
     // setPosts(posts.sort(sortByDate))
    } catch (e) {
      console.log(e);
    }
    setLoader(false);
  };
  const handleDeleteUser=async()=>{
    try{
      if(user!==null){
        const res= await axios.delete(URL +'/users/'+user._id);
        setUser(null);
        console.log(res);
        navigate('/');
      }

    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [user]);


  return (
    <div>
        <Navbar/>
        
        <div className='px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse space-x-10 '>
            <div className='flex flex-col md:w-[70%] w-full'>
               <h1 className=' text-2xl font-semibold mb-4 md:mt-10 sm:mt-10 text-center'>Your Posts</h1>
                
               {
                posts ?( posts.map((post, id)=>{
                 return <HomePosts key={post._id} post={post}/>
                // console.log(post._id)
                })
                ):(
                  <div className='w-full'>
                  <img src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=740&t=st=1701966506~exp=1701967106~hmac=31c4667cc3f2343a7b9cb9262b68c4b95d140a0c42831def53c8bee89b6b509b" alt="Posts not found" />
                </div>
                )
               }
            </div>
            {
             user===null ? '': <div className='flex flex-col space-y-4 md:w-[30%] w-full'>
              <h1 className='text-2xl font-semibold mb-4 text-center'>Profile</h1>
              <input 
              type="text"
              placeholder={`@${user.username}`} 
              onLoad={(e)=>{
               e.target.value=`${user.username}`
              }}
              
              className='outline-none px-4 py-2 text-gray-500'
              />
             <input 
              type="email"
              placeholder='sugam@pokharel.com' 
              className='outline-none px-4 py-2 text-gray-500'
             />
              <input 
              type="password"
              placeholder='password' 
              className='outline-none px-4 py-2 text-gray-500'
             />
             <div className='flex items-center space-x-4 mt-8 '>
                <button className='p-2 text-gray-300 bg-gray-600 rounded-full hover:bg-gray-300 hover:text-gray-600'>
                  Update
                </button>
                <button 
                className='p-2 text-gray-300 bg-gray-600 rounded-full hover:bg-gray-300 hover:text-gray-600'
                onClick={handleDeleteUser}
                >
                  Delete
                </button>
             </div>
          </div>
            }
          
        </div>
        <Footer/>
    </div>
  )
}
