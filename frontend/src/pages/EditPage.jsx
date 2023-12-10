import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ImCross } from "react-icons/im";

export const EditPage = () => {
    // For single category
    const [cat, setCat]=useState('');
    // For category array
    const [cats, setCats]=useState([]);
    const addCategory=()=>{
      let updatedCats=[...cats];
      updatedCats.push(cat);
      setCats(updatedCats);
    }
    const deleteCategory=(i)=>{
        let updatedCats=[...cats]
        updatedCats.splice(i)
        setCats(updatedCats)

    }

  return (
    <>
    <Navbar/>
    <div className=' h-max overflow-none px-6 md:px-[200px] md:min-h-max mt-8 '>
    <h1 className='font-bold md:text-2xl text-xl mt-8'>Update the Post:</h1>
    <form 
    action=""
    className='w-full mt-5 flex flex-col space-y-4 md:space-y-8'
    >
        {/* Title input */}
        <input 
        type="text"
        placeholder='Title'
        className='px-4 py-2 outline-none w-full font-thin font-mono text-4xl'
        />

        {/* Subtitle Input */}
        <input 
        type="text"
        placeholder='Subtitle'
        className='px-4 py-2 outline-none w-full font-thin font-mono text-3xl'
        />

        {/* Image Input */}
        <label htmlFor="file" className='hidden'>Upload Image</label>
        <input 
        type="File"
        placeholder='Image'
        name='file'
        accept='.png, .jpg, .img, .jpeg,'
        className='px-4 py-2 outline-none w-full font-thin font-mono text-2xl'
        />

        {/* For entering category */}
            <div className='flex flex-col '>
                <div className='flex items-center space-x-4 md:space-x-8 '>
                        <input 
                        type="text"
                        className='px-4 py-2 outline-none text-2xl'
                        placeholder='Category'
                        value={cat}
                        onChange={(e)=>{setCat(e.target.value)}}
                        />
                    <div className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'
                    onClick={addCategory}
                    >
                        Add
                    </div>

                </div>

                <div className='flex flex-row flex-wrap space-x-4'>
                {
                    cats.map((cat, i)=>{
                        return <div className='flex  align-center  mt-4 space-x-4 ml-3'>
                        <div key={i}
                         className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 py-1 rounded-md px-2'>
                            <p>{cat}</p>
                            <p 
                            className='border-black border-2 rounded-full p-2'
                            onClick={()=>deleteCategory(i)}
                            >
                            <ImCross className='cursor-pointer' />
                            </p>
                            </div>
                          
                        </div>
                    })
               
                }
                </div>

            </div>
            <textarea 
    name="" 
    id="" 
    cols="65" 
    rows="10"
    className='outline-none  text-xl  md:mb-10 md:pb-10 mt-10 mb-[20px] font-semibold'
    placeholder='Text'
    />
    <button className='text-left bg-gray-700 w-max p-2 mt-2 rounded-lg text-gray-300 hover:bg-gray-300 hover:text-gray-700'>Update</button>

    </form>
  
    </div>
    <Footer/>
    </>
  )
}
