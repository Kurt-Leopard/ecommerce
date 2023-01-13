import React, { useState, useEffect, } from 'react';
import Image from 'next/image';
export default function S3 ({slice}) {
  const [servicesOffered, setUpperHeaderMenu] = useState([
    { name: "Software Development", },
    { name: "SaaS", },
    { name: "Enterprise", },
    { name: "Apps", },
    { name: "Website", },
  ]);
  const [images, setImages] = useState([
    { src: "/mockups/wingzone.jpg"},
    { src: "/mockups/mimosa.jpg"}
  ])
  const [active, setActive] = useState('Software Development')

  return (
    <div className='flex my-8 mr-8'>
      <div className='flex flex-col justify-center items-center w-full lg:h-[600px] h-full lg:mx-0 bg-red-700'>
        <div className='flex md:flex-row flex-col-reverse justify-between items-center xxl:min-w-[1345px] xl:min-w-[1260px] max-w-full '>
          <div className='flex md:flex-row flex-col items-center w-[600px] top-0 right-0'>
            <div className='relative m-4 md:w-[260px] md:h-[500px] w-[260px] h-[500px]'>
              <Image
                src={'/mockups/wingzone_mobilea.jpg'}
                alt="image"
                className=' rounded-[20px] shadow-md'
                fill
              />
            </div>
            <div className='relative m-4 md:w-[260px] md:h-[500px] w-[260px] h-[500px]'>
              <Image
                src={'/mockups/wingzone_mobileb.jpg'}
                alt="image"
                className=' rounded-[20px] shadow-md'
                fill
              />
            </div>
          </div>
          <div className='flex flex-col justify-center items-start md:m-0 m-12'>
            <div className='lg:text-[30px] text-[35px] font-bold text-white '>
              {`Restaurant Online Food Ordering`}
            </div>
            <div className='flex flex-col md:w-[650px] w-full'>
              <div
                className={`
                  text-white text-xl my-4 md:px-0 border-b-2 border-transparent slide-line-hover tracking-normal cursor-pointer hover:underline
                  `}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quam leo, lacinia porta tincidunt et, tempus et mi. Nullam congue viverra augue, quis tristique felis luctus ut.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:block hidden triangle-red"  />
    </div>
    
  )
}