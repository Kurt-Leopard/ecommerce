import Image from "next/image";
import { useRouter } from "next/router";

export default function FurnitureContent({ page }) {
  const router = useRouter();

  const handleBack = () => {
    router.push("/ecommerce/");
  };
  return (
    <div className="fixed top-0 left-0 w-full flex items-end justify-center h-screen z-[1000]">
      <section className="border w-full rounded-t-xl h-[90vh] bg-white z-[1001] ">
        <div className="p-8 text-center uppercase text-xl font-mono">
          {page.id.replace(/-/g, " ")}
        </div>
        <div className="grid grid-cols-2 w-full">
          <Image
            src={page?.data?.main?.image}
            width={100}
            height={100}
            alt="page?.data?.main?.title"
            className="w-[700px] h-[700px] object-cover rounded-lg mx-auto"
          />
          <div>
            <div>{page?.data?.main?.title}</div>
            <div
              dangerouslySetInnerHTML={{
                __html: page?.data?.main?.description,
              }}
            />
          </div>
        </div>
      </section>
      <span
        className="inline-block  bg-black opacity-[.3]  w-full h-screen fixed top-0 left-0"
        onClick={() => handleBack()}
      ></span>
    </div>
  );
}
