import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import {Comment} from '../components/Comment.jsx'

import { UserContext } from '../contexts/UserContext';
import { useContext } from "react";
import { Link,useParams } from "react-router-dom";
import { URL } from "../../utils.js";
import axios from "axios";
import { comment } from "postcss";
import { Navigate, useNavigate } from "react-router-dom";
import { UpdatePost } from "./UpdatePost.jsx";


export const PostDetails = () => {


const navigate=useNavigate();

const {user}=useContext(UserContext);
  // const {user}=useContext(UserContext);
  const [details, setDetails]=useState({});
  const postId=useParams();
  const [editing, setEditing]=useState(false);
  const [comments, setComments]=useState([]);
  const [canedit, setCanedit]=useState(false);
  const [addComments, setAddComments]=useState('');
  const postCreator=details.userId;
    const [editCommentValue, setEditCommentValue]=useState([]);

  const handleNewComment=async()=>{
    try{
      const res=await axios.post(URL+'/comment/create/', {
        comment:addComments,
        author:user.username,
        postId:postId.id,
        userId:user._id,
      }
      )
      console.log(res);
      navigate('/posts/post/'+postId.id)
      
    }catch(e){
      console.log(e);
    }
  }


  const fetchPost=async()=>{

    try{
      const res=await axios.get(URL+'/post/'+postId.id);
      setDetails(res.data);
      // console.log(res.data);
      // console.log(details);
      // console.log(user);
    }catch(e){
      console.log(e);
    }
  }
  const fetchComments=async()=>{
    try{
      const res=await axios.get(URL+'/comment/post/'+postId.id);
  
      setComments(res.data);
    
    }catch(e){
      console.log(e);
    }
    }


    const handleDelete=async()=>{
      try{
        const res=await axios.delete(URL+'/post/'+postId.id);
        console.log(res);
        alert(res);
      }catch(e){
        console.log(e);
      }
    }

    const handleDeleteComment=async(e)=>{
      try{
        const res=await axios.delete(URL+'/comment/'+e);
        console.log(e);
        console.log(res);
        navigate('/posts/post/'+postId.id)
      }catch(e){
        console.log(e);
      }
    }
    const handleEditButton=()=>{
      setCanedit(!canedit);
    }

    const handleEditComment=async()=>{
      try{
       const id=editCommentValue._id;
       console.log(id);
        const res=await axios.put(URL+'/comment/'+id,{
          comment:addComments,
        });
        if(res.data.comment!==addComments){
          console.log('Comment Edit Failed')
        }
        else{
          console.log(res.data);
          navigate('/posts/post/'+editCommentValue.postId);
          setCanedit(false);
        }
        

      }catch(e){
console.log(e);
      }
    }


  useEffect(()=>{
fetchPost();
fetchComments();
  }, [postId]);




  return (
    <div>

      <Navbar />
      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl ">
           {details.title}
          </h1>
{/* { 
  <div className="flex items-center justify-center space-x-2 ">
  <p >
    <MdEdit  />
  </p>
  <p>
    <MdDelete />
  </p>
</div>
  
} */}


{
user===null ? '':
user._id!==postCreator? 
'':  <div className="flex items-center justify-center space-x-2 ">
<p >
  <Link to={`/update/`+postId.id}>
  <MdEdit  />
  </Link>
</p>
<p>
  <Link to='/'>
  <MdDelete onClick={handleDelete} />
  </Link>
</p>
</div>
}

         
        </div>
        <div className="flex items-center justify-start space-x-5 mt-2 md:mt-4">
          <div>@{details.username}</div>
          <div className="flex space-x-2">
            <p>{new Date(details.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(details.updatedAt).toString().slice(15, 24)}</p>
          </div>
        </div>
        <img
          src={details.photo}
          alt="Image"
          className="w-full mt-8 mx-auto rounded-2xl"
        />
        <p className="mx-auto mt-8 ">
     {details.content}
        </p>

        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div  className="flex justify-center items-center space-x-2 ">
            
           {
            details.categories? 
            details.categories.map((category, id)=>{
              return <div 
              key={id} 
              className="bg-gray-300 runded-large px-3 py-1"
              >
                <Link to={`/?search=${category}`}>{category}</Link>
                </div>
            }):console.log('LOL')
           }
             
            
                      </div>
        </div>

        <>
        
   {
      comments.map((comment, id)=>{
        return<div key={id} className="flex flex-col mt-4 space-y-2">
        
            <div  className="px-2 py-2 bg-gray-300 rounded-lg border-b-2 border-gray-500">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-600">@{comment.author}</h3>
              <div className="flex justify-center items-center space-x-4 ">
                <div className="flex space-x-3">
                  <p>{new Date(comment.updatedAt).toString().slice(0, 15)}</p>
                  <p>{new Date(details.updatedAt).toString().slice(15, 24)}</p>
              
              {
                user===null ? '':
                user._id===comment.userId ?
                  <>
                                    <p>
                    <MdEdit 
                    className="h-full cursor-pointer" 
                    onClick={()=>{
                      setEditCommentValue(comment);
                      handleEditButton();
                    }}

                    />
                  </p>
                  <p>
                    <MdDelete className="h-full cursor-pointer"
                      onClick={()=>{
                        handleDeleteComment(comment._id)
                      }}
                    
                    />
                  </p>
                  </>:''
              }

                </div>
              </div>
            </div>
            <div className="mt-3 text-left ml-2 mr-2 mb-2">
           {comment.comment}
            </div>
          </div>

      
      </div>
      })
      }
{
  canedit ? <div className="flex flex-col space-y-3">
  <h3 className="mt-6 mb-2 font-semibold">Edit your comment : </h3>
  <div>
    <input
      type="text"
      className=" rounded-2xl w-full h-12 text-center"
      placeholder=''
      onChange={(e)=>{
        setAddComments(e.target.value);
      }}
    />
    <button
    className="bg-gray-500 p-3 mt-3 rounded-3xl font-semibold hover:bg-gray-200 hover:text-gray-700"
    onClick={handleEditComment}
    >
      Edit Comment
    </button>
  </div>
</div> :''
}

        <div className="flex flex-col space-y-3">
          <h3 className="mt-6 mb-2 font-semibold">Write a comment: </h3>
          <div>
            <input
              type="text"
              className=" rounded-2xl w-full h-12 text-center"
              placeholder="Great article !!!"
              onChange={(e)=>{
                setAddComments(e.target.value);
              }}
            />
            <button
            className="bg-gray-500 p-3 mt-3 rounded-3xl font-semibold hover:bg-gray-200 hover:text-gray-700"
            onClick={handleNewComment}
            >
              Comment
            </button>
          </div>
        </div>
   </>


      </div>

      <Footer />
    </div>
  );
};
