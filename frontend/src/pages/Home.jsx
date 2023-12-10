import React, { useEffect, useState } from "react";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../../utils.js";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader.jsx";


export const Home = () => {


  const [loader, setLoader] = useState(false);
  const { search } = useLocation();
  //console.log(search);
  const [posts, setPosts] = useState([]);
  const [noresult, setNoresult] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoader(true);
      let res = await axios.get(URL + "/post" + search);
      if (res.data.length === 0) {
        setNoresult(true);
      } else {
        setNoresult(false);
      }
      setPosts(res.data);
    

    } catch (e) {
      console.log(e);
    }
    setLoader(false);
  };

  useEffect(() => {
    fetchPosts(); 
  }, [search]);

  return (
    <>

      <Navbar/>
      <div className="mx-[10%] ">
       
        {!loader? 
        !noresult ? (
          posts.map((post) => {
            return (
              //<div className="flex flex-col-reverse">
                  <HomePosts key={post._id} post={post} className="col-reverse" />
            
                
            );
          })
        ) : (
          <div>
            <h3 className="text-center font-semibold text-xl">
              No posts available
            </h3>
            <img
              src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=740&t=st=1701966506~exp=1701967106~hmac=31c4667cc3f2343a7b9cb9262b68c4b95d140a0c42831def53c8bee89b6b509b"
              alt=""
              className="w-[75%] flex mx-auto"
            />
          </div>
        ):
        <div className="w-full flex justify-center items-center"> <Loader /> </div>
       
      }
      </div>
      <Footer />
    </>
  );
};
