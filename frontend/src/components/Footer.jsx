import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='mt-8 w-full bg-gray-800 px-8 md:text-center lg:flex lg:justify-around text-sm md:text-md py-8 md:mt-8 text-gray-50 md:flex-col md:align-center md:space-y-3 lg:flex-row'>
     <div className='flex flex-col text-white'>
      <p>Featured Blogs</p>
      <p>Most viewed</p>
      <p>Reader's choice</p>
     </div>
     <div className='flex flex-col text-white'>
      <p>Forum</p>
      <p>Support</p>
      <p>Recent Ports</p>
     </div>

     <div className='flex flex-col text-white'>
      <p>Privacy Policy</p>
      <p>About Us</p>
      <p>Terms & Conditions</p>
     </div>

    </div>
    <p className=' text-center bg-gray-800 text-gray-50 pt-5'>All rights reserved:<b> 2023</b> by @psugam</p>
    </>
  )
}

export default Footer