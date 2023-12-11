import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../utils';
import HomePosts from '../components/HomePosts';

export const UserPosts = () => {
    const [posts, setPosts]=useState([]);
    const location=useLocation();
    const id=location.pathname.slice(6);

    const [noresult, setNoresult]=useState(true);
    const fetchPosts = async () => {
        try {
          //setLoader(true);
          let res = await axios.get(URL + "/post/user/" + id);
          if (res.data.length === 0) {
            setNoresult(true);
          } else {
            setNoresult(false);
          }
          setPosts(res.data);
            console.log(res.data);
         // setPosts(posts.sort(sortByDate))
        } catch (e) {
          console.log(e);
        }
       // setLoader(false);
      };
      useEffect(()=>{
            fetchPosts();
      }, [])

  return (
    <div>
        <Navbar/>
        
        {
        !noresult?
        posts!==null? 
            posts.map((post)=>{
                return<HomePosts key={post._id} post={post}/>
            })
            :<div className='text-center text-3xl font-serif my-10 '>Nothing to see here!</div>
            :<div className='text-center text-3xl font-serif my-10 '>Nothing to see here!</div>
        }
        <Footer/>

    </div>
  )
}
