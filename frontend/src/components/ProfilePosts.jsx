import React from 'react'

const ProfilePosts = () => {
  return (
    <div className='w-full flex mt-8 space-x-4 space-y-5'>
      {/* left  */}
    <div className='w-[35%] h-[200px] flex align-center justify-center'>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" alt="Image" className='w-[60%]' />
    </div>

    {/* right  */}
    <div className='flex flex-col w-[75%] h-auto'>
    <h1 className='text-xl font-bold md:mb-2 mb-1 md:text-2xl '>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique, rerum.
    </h1>
    <div className='flex mb-2 text-sm font-semibold text-gray-500 items-center space-x-5'>
      <p>@psugam</p>
      <div className='flex space-x-2'>
        <p>
          2016-01-02
        </p>
        <p>
          12:13pm
        </p>
      </div>
    </div>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem expedita dolore minus facere placeat numquam ullam nemo reprehenderit sequi. Saepe et mollitia ab inventore consectetur facilis, aliquid quisquam explicabo sed? Unde ab, suscipit esse eveniet ipsum corrupti quo! Hic ut laudantium reprehenderit exercitationem suscipit perspiciatis consequatur accusamus non tempora blanditiis?</p>
    </div>

    </div>
  )
}

export default ProfilePosts