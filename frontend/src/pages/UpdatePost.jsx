import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import { UserContext } from "../contexts/UserContext";
import { URL } from "../../utils";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { data } from "autoprefixer";

export const UpdatePost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [oldPost, setOldPost] = useState({});
  const postId = location.pathname.slice(8);
  // console.log(postId);
  // For single category
  const [cat, setCat] = useState("");
  // For category array
  const [cats, setCats] = useState([]);
  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCats(updatedCats);
  };
  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i);
    setCats(updatedCats);
  };

  const { user } = useContext(UserContext);
  const [title, setTitle] = useState(oldPost.title);
  const [subtitle, setSubtitle] = useState(oldPost.subtitle);
  const [file, setFile] = useState(oldPost.photo);
  const [content, setContent] = useState(oldPost.content);
  const [newCategories, setNewCategories]=useState(oldPost.categories);
  const getOldPost = async () => {
    try {
      const res = await axios.get(URL + "/post/" + postId);
      setOldPost(res.data);
    } catch (e) {
      console.log(e);
    }
  };


  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        URL + "/post/" + postId,
        {
          title,
          subtitle,
          photo: file,
          username: user.username,
          userId: user._id,
          categories: cats,
          content,
        },
        { withCredentials: true }
      );
      navigate("/posts/post/" + oldPost._id);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOldPost();
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-[110vh] px-6 md:px-[200px] mt-8 ">
        <h1 className="text-center font-bold md:text-2xl text-xl mt-8">
          Create a Post:
        </h1>
        <h2 className="text-center font-serif font-thin text-gray-400 mt-3">
          Edit any field:
        </h2>
        <form
          action=""
          className="w-full mt-5 flex flex-col space-y-4 md:space-y-8"
        >
          {/* Title input */}
          <input
            type="text"
            placeholder={oldPost.title}
            className="px-4 py-2 outline-none w-full font-thin font-mono text-4xl"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            
          />
         
          {/* Subtitle Input */}
          <input
            type="text"
            placeholder={oldPost.subtitle}
            className="px-4 py-2 outline-none w-full font-thin font-mono text-3xl"
            onChange={(e) => {
              setSubtitle(e.target.value);
            }}
          />

          {/* Image Input */}
          <label htmlFor="file" className="hidden">
            Upload Image
          </label>
          <input
            type="Text"
            placeholder={oldPost.photo}
            name="file"
            //   accept='.png, .jpg, .img, .jpeg,'
            className="px-4 py-2 outline-none w-full font-thin font-mono text-2xl"
            onChange={(e) => {
              setFile(e.target.value);
            }}
          />

          {/* For entering category */}
          <div className="flex flex-col ">
            <div className="flex items-center space-x-4 md:space-x-8 ">
              <input
                type="text"
                className="px-4 py-2 outline-none text-2xl"
                placeholder="Category"
                value={cat}
                onChange={(e) => {
                  setCat(e.target.value);
                }}
              />
              <div
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
                onClick={addCategory}
              >
                Add
              </div>
            </div>

            <div className="flex flex-row flex-wrap space-x-4">
              {cats.map((cat, i) => {
                return (
                  <div
                    key={i}
                    className="flex  align-center  mt-4 space-x-4 ml-3"
                  >
                    <div className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 py-1 rounded-md px-2">
                      <p>{cat}</p>
                      <p
                        className="border-black border-2 rounded-full p-2"
                        onClick={() => deleteCategory(i)}
                      >
                        <ImCross className="cursor-pointer" />
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <textarea
            name=""
            id=""
            cols="65"
            rows="10"
            className="outline-none  text-xl  mt-10 mb-[20px] font-semibold"
            placeholder={oldPost.content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button
            className="text-left bg-gray-700 w-max p-2 mt-2 rounded-lg text-gray-300 hover:bg-gray-300 hover:text-gray-700"
            onClick={handleUpdate}
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};
