import React from "react";
import { Link } from "react-router-dom";
import { PostDetails } from "../pages/PostDetails.jsx";


const HomePosts = ({ post }) => {
  return (
    <div className="w-full flex flex-col items-center  mt-8  space-y-5  md:flex-col md:items-center lg:flex-row lg:justify-around ">
      {/* left  */}
      <div className="w-[35%] h-[200px] flex align-center justify-center  md:w-full">
        <img src={post.photo} alt="Image" className="md:w-[70%] lg:w-[50%] lg:h-auto rounded-2xl" />
      </div>

      {/* right  */}
      <div className="flex flex-col w-[75%] h-auto md:w-full md:items-center lg:w-[75%] lg:items-start">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl ">
          <Link to={`/posts/post/` + post._id}>{post.title}</Link>
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center space-x-5">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(15, 24)}</p>
          </div>
        </div>
        <div className="md:flex md:items-center md:flex-col lg:block md:w-[70%]">
          {post.subtitle.slice(0, 250)}{" "}
          <p className="text-gray-500 text-sm font-semibold ">
            <Link to={`/posts/post/` + post._id}>...Read More</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePosts;

//https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png
