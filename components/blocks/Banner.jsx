import Image from "next/image";
import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useState } from "react";
import categoryDetails from "@/lib/preBuildScripts/static/categoryDetails.json";
import { useRouter } from "next/router";

export default function Banner({ block, mediaHandler }) {
  const [category] = useState(
    categoryDetails?.taxonomyTerms.map((item) => item.id) || []
  );
  const router = useRouter();
  const handleCategory = (category) => {
    router.push({
      pathname: router.pathname, // Keep the current path
      query: { ...router.query, furniture: category }, // Add the query parameter
    });
  };
  return (
    <div className="px-24 flex items-center justify-center relative">
      <Swiper
        className="object-cover w-full"
        modules={[Navigation, A11y]}
        slidesPerView={1}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
      >
        {block?.main?.images.map((item, index) => (
          <SwiperSlide key={index} className="relative pb-12">
            <Image
              src={item}
              alt="Banner"
              width={100}
              height={100}
              className="min-h-[750px] w-screen"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex-col gap-2  items-center absolute bottom-[0px] z-10 left-1/2 transform -translate-x-1/2 w-1/2 mb-5 shadow-md rounded-md px-5  pb-5 bg-white">
        <small className="uppercase font-semibold">Category</small>
        <div className="w-full flex">
          <Swiper
            className="flex gap-2 w-full"
            modules={[Navigation, A11y]}
            slidesPerView={4}
            spaceBetween={10}
          >
            {category.map((categoryItem) => (
              <SwiperSlide key={categoryItem} className="flex items-center">
                <div
                  className="flex justify-center items-center gap-2 h-full hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => handleCategory(categoryItem)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    width="24"
                    height="24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                    />
                  </svg>
                  <span>{`${categoryItem}`}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="p-3 bg-[#0C4A6E] text-white w-[150px] rounded-md">
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
}
