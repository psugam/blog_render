import React from 'react'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export const Comment = ({comments}) => {
 // console.log(comments);
  return (
   <>
         <div className="flex flex-col mt-4 space-y-2">
          <h3 className="mt-6 mb-4 font-semibold ">Comments</h3>
          
              <div  className="px-2 py-2 bg-gray-300 rounded-lg border-b-2 border-gray-500">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-600">@psugam</h3>
                <div className="flex justify-center items-center space-x-4 ">
                  <div className="flex space-x-3">
                    <p>2016-01-02</p>
                    <p>12:13pm</p>
                    <p>
                      <MdEdit className="h-full" />
                    </p>
                    <p>
                      <MdDelete className="h-full" />
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-left ml-2 mr-2 mb-2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Repellendus, quae.
              </div>
            </div>

        
        </div>

        <div className="flex flex-col space-y-3">
          <h3 className="mt-6 mb-2 font-semibold">Write a comment: </h3>
          <div>
            <input
              type="text"
              className=" rounded-2xl w-full h-12 text-center"
              placeholder="Great article !!!"
            />
            <button className="bg-gray-500 p-3 rounded-3xl font-semibold hover:bg-gray-200 hover:text-gray-700">
              Comment
            </button>
          </div>
        </div>
   </>
  )
}
