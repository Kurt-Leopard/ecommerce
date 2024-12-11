import { paths, props } from "@/lib/props/page";
import dynamic from "next/dynamic";

export const getStaticPaths = paths;
export const getStaticProps = props;

const ParentBlock = dynamic(() =>
  import("../../components/page/ParentBlock").then((module) => module.default)
);

const FurnitureContent = dynamic(() =>
  import("../../components/page/FurnitureContent").then(
    (module) => module.default
  )
);

export default function DynamicPage({ page, blocks }) {
  // console.log("desc:", page?.content);
  const titleElement = (
    <h1 hidden className="hidden opacity-0 invisible">
      {page?.metaData?.title || page?.name}
    </h1>
  );
  const descriptionElement = (
    <>
      {page?.metaData?.description && (
        <p hidden className="hidden opacity-0 invisible">
          {page?.metaData?.description || page?.name}
        </p>
      )}
    </>
  );

  let ComponentToRender;

  switch (page?.content?.id) {
    case "items":
      ComponentToRender = FurnitureContent;
      break;

    default:
      ComponentToRender = ParentBlock;
      break;
  }

  return (
    <>
      {titleElement}
      {descriptionElement}
      <ComponentToRender page={page} blocks={blocks} />
    </>
  );
}
