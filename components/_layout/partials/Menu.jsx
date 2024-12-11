import globalData from "@/lib/preBuildScripts/static/globalData.json";
import Locales from "@/components/_layout/partials/Locales";
import persistentStore from "@/lib/store/persistentStore";
import Link from "next/link";
import globalState from "@/lib/store/globalState";
export default function Menu() {
  const ready = globalState((state) => state.ready);
  const locale = persistentStore((state) => state.locale);
  const { menus, locales } = globalData;
  const defaultLocale = locales.find((n) => n.is_default);
  const activeMenu =
    menus?.find((n) => n.locale === locale) ||
    menus.find((n) => n.locale === defaultLocale.code);
  const nodes = activeMenu?.parentNodes || [];

  const staticMenuItems = [
    { label: "Home", url: "/", target: "" },
    { label: "About", url: "/about", target: "" },
    { label: "Contact", url: "/contact", target: "" },
  ];
  return (
    <header className="py-[15px] z-[1000] sticky top-0 bg-white px-24">
      <div className="px-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="logo">
            <Link href="/">
              <div className="w-[200px] rounded-sm h-[70px] flex items-center justify-center p-[15px] font-semibold uppercase text-[25px]">
                <span className="text-[#0C4A6E]">E-</span>commerce
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <nav className="flex items-center gap-[80px] text-[16px] uppercase">
              {ready &&
                staticMenuItems.map((node, i) => {
                  return (
                    <Link href={node.url} key={i} target={node.target}>
                      {node.label}
                    </Link>
                  );
                })}
            </nav>
          </div>
          <div className="flex items-center justify-between">
            <nav className="flex items-center gap-[30px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                width="24" // Add width
                height="24" // Add height
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                width="24" // Add width
                height="24" // Add height
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                width="24" // Add width
                height="24" // Add height
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                />
              </svg>
            </nav>
          </div>
        </div>

        {/* {ready &&
        nodes.map((node, i) => {
          return (
            <Link href={node.url} key={i} target={node.target}>
              {node.label}
            </Link>
          );
        })}
      <Locales /> */}
      </div>
    </header>
  );
}
