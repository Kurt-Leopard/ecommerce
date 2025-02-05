import Jsona from "jsona";
const dataFormatter = new Jsona();
import PAGEAPI from "@/lib/api/pages/request";
import CONTENTAPI from "@/lib/api/content/request";
import { sortBlocks } from "@/lib/services/globalService";
import { iterateBlock, iteratePage } from "@/lib/services/propService";
import { useRouter } from "next/router";
import { useState } from "react";
import ParentBlock from "@/components/page/ParentBlock";
import NotFound from "@/components/page/NotFound";
import Article from "@/components/partials/pages/Article";
export default function DynamicPage() {
  const router = useRouter();
  const [page, setPage] = useState(null);
  const [blocks, setBlocks] = useState(null);
  const [error, setError] = useState(false);

  const url = router.asPath.split("?")[1] || "";
  let params = [];
  url.split("&").forEach((e) => {
    const z = e.split("=");
    params[z[0]] = z[1];
  });
  const {
    slug = null,
    expires = null,
    signature = null,
    contents = null,
  } = params;

  PAGEAPI.getFindPagesSwr(
    slug,
    `?include=blockContents.block,metaData&expires=${expires}&signature=${signature}`,
    {
      render: slug && expires && signature && !contents,
      expires,
      signature,
      onSuccess: async (res) => {
        const page = dataFormatter.deserialize(res.data);

        const blocksHandler =
          page?.blockContents?.map((e) => {
            return {
              key: e?.block?.component || null,
              order: e?.order || null,
              data: e?.data || null,
              blueprintData: e?.blueprintData || null,
            };
          }) || [];

        const blocks = sortBlocks(blocksHandler);

        setBlocks(await iterateBlock(blocks));
        setPage(await iteratePage(page));
      },
      onError: () => {
        setError(true);
      },
    }
  );

  CONTENTAPI.getContentsSwr(
    `/${contents}/entries/${slug}?include=metaData,content`,
    {
      render: slug && expires && signature && contents,
      expires,
      signature,
      onSuccess: async (res) => {
        const page = dataFormatter.deserialize(res.data);

        setPage(await iteratePage(page));
      },
      onError: () => {
        setError(true);
      },
    }
  );

  const Renderer = ({ page, blocks }) => {
    switch (page?.content?.id) {
      case "article":
        return <Article page={page} mediaHandler={page?.mediaHandler} />;
      default:
        return <ParentBlock page={page} blocks={blocks} />;
    }
  };

  return (
    <>
      {page || blocks ? (
        <Renderer page={page} blocks={blocks} />
      ) : (
        <>
          {error ? (
            <NotFound />
          ) : (
            <div className="w-full text-center py-[150px] md:py-[200px]">
              Loading...
            </div>
          )}
        </>
      )}
    </>
  );
}
