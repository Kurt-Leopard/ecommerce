import Image from "next/image";
import PageHeader from "@/components/slices/PageHeader";
import AboutPageSlice1 from "@/components/slices/AboutPageSlice1";
import AboutPageSlice2 from "@/components/slices/AboutPageSlice2";
import AboutPageSlice3 from "@/components/slices/AboutPageSlice3";
import vector from "@/public/img/vector.png";

export default function AboutPage () {
    const pageHeaderProps = {
        pageBackgroundImage: 'img/about_page_background.jpg',
    }

    return (
        <>
            <PageHeader pageBackgroundImage={pageHeaderProps.pageBackgroundImage}>
                <div className="py-4 px-8">
                    <div className="flex justify-center items-center mb-4 text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                        <p className="font-semibold text-[#E11C38] uppercase">
                            <span className='text-[#07336E]'>About </span>
                            Us
                        </p>
                        <Image
                            src={vector}
                            alt="vector"
                            className="mx-1 xl:px-0 px-4"
                            width={150}
                            height={24}
                        />
                    </div>
                    <p className='font-bold text-[#343434] text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl'>
                        State of EGL in the Philippines
                    </p>
                </div>
            </PageHeader>
            <div className="mt-12 md:mt-16 lg:mt-18 xl:mt-24 px-4 w-full xl:flex xl:justify-center">
                <div className="xl:w-[1345px] mx-4 mb-8 py-8 px-4">
                    <AboutPageSlice1 />
                    <AboutPageSlice2 />
                    <AboutPageSlice3 />
                </div>
            </div>
        </>
    )
  };
  