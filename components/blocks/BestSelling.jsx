import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import BaseApi from "@/lib/api/_base.api";

export default function BestSelling({ block, mediaHandler }) {
  const [bestSelling, setBestSelling] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  // Create a reference for Swiper
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setActiveSlide(swiper.activeIndex); // Update active slide index
  };

  const fetchData = async () => {
    try {
      const res = await BaseApi.get(
        `${
          process.env.NEXT_PUBLIC_TENANT_API
        }/api/contents/items/entries?page=[size]=8page[number]=1&includes=blueprintData,mediaHandler&filter[taxonomies][product-category]=${""}&filter[sites.id]=${
          process.env.NEXT_PUBLIC_MICROSITE_ID
        }`
      );
      setBestSelling(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="px-32 grid grid-cols-2 h-[100vh] items-center">
      <div className="flex flex-col">
        <div className="text-[98px]">{block?.main?.title}</div>
        <button className="border hover:border-[#0C4A6E] w-1/3 py-5">
          {block?.main?.button}
        </button>
      </div>
      <div className="relative">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)} // Store the Swiper instance in the ref
          spaceBetween={50}
          slidesPerView={2}
          onSlideChange={handleSlideChange}
        >
          {bestSelling?.map((item, index) => {
            const isActive = activeSlide === index;
            return (
              <SwiperSlide key={index}>
                <Image
                  src={item?.attributes?.data?.main.image}
                  width={100}
                  height={100}
                  alt={item?.attributes?.data?.main.image}
                  className={`${
                    isActive ? "h-[500px] w-[500px]" : "h-[400px] w-[400px]"
                  } group-hover:w-[402px] group-hover:h-[402px] object-cover rounded-xl `}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="absolute bottom-0 left-0 right-0 flex justify-end  z-20">
          <div className="w-[400px] flex items-center justify-center gap-2 pl-4">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="border p-2 rounded-full bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="border p-2 rounded-full bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
