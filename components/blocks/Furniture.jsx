import BaseApi from "@/lib/api/_base.api";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function Banner({ block, mediaHandler }) {
  const router = useRouter();
  const { furniture } = router.query;
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);

  // Function to fetch the data
  const fetchdata = useCallback(async () => {
    setLoading(true);
    try {
      const res = await BaseApi.get(
        `${
          process.env.NEXT_PUBLIC_TENANT_API
        }/api/contents/items/entries?page[size]=4&page[number]=${currentPage}&includes=blueprintData,mediaHandler&filter[taxonomies][product-category]=${
          furniture || ""
        }&filter[sites.id]=${process.env.NEXT_PUBLIC_MICROSITE_ID}`
      );
      setTotalItems(Math.ceil(parseInt(res?.data?.meta?.total) / 4));
      setProducts(res?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log("Err", error);
      setProducts([]);
      setLoading(false);
    }
  }, [currentPage, furniture]);

  useEffect(() => {
    fetchdata();
  }, [currentPage, furniture]);

  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div className="px-4 xl:px-32">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-wrap gap-3 items-center my-5">
          {products?.map((item, index) => (
            <div key={index} className="group mx-auto">
              <Image
                src={item?.attributes?.data?.main.image}
                width={100}
                height={100}
                alt={item?.attributes?.data?.main.image}
                className="h-[400px] w-[400px] group-hover:w-[402px] group-hover:h-[402px] object-cover rounded-xl "
              />
              <div className="bg-[#0C4A6E] group-hover:bg-white w-[400px] mx-auto my-5 rounded-xl border shadow-lg">
                <div className="flex justify-between items-center px-4 py-2 text-white">
                  <span className="group-hover:text-[#0C4A6E]">
                    {item?.attributes?.data?.main?.title}
                  </span>
                  <span className="group-hover:text-black">
                    {item?.attributes?.data?.main?.price}
                  </span>
                </div>
                <div className="flex justify-between items-center px-4 py-2 text-[#D3D3D3]">
                  <div
                    className="group-hover:text-[#555555]"
                    dangerouslySetInnerHTML={{
                      __html: item?.attributes?.data?.main.description,
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-[#D3D3D3] group-hover:text-[#0C4A6E]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <nav className="flex items-center justify-center" aria-label="Pagination">
        <button
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <span className="sr-only">Previous</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {[...Array(totalItems)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              className={`relative inline-flex items-center px-4 py-2.5 border text-sm font-medium ${
                page === currentPage
                  ? "bg-[#0C4A6E] text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          onClick={nextPage}
        >
          <span className="sr-only">Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
}
