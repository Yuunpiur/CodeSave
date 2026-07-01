import { useState, useEffect } from "react";
import { library } from "./utils/library.js";
import { useAccessToken } from "./auth-page.jsx";

const PAGES = ["Folders", "Files"];

const Library = () => {
  const accessToken = useAccessToken((state) => state.accessToken);
  const updateAccessToken = useAccessToken((state) => state.updateAccessToken);

  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    console.log(accessToken);
  }, [accessToken]);

  const goNext = () => {
    if (pageIndex < PAGES.length - 1) {
      setDirection(1);
      setPageIndex((prev) => prev + 1);
      setAnimKey((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (pageIndex > 0) {
      setDirection(-1);
      setPageIndex((prev) => prev - 1);
      setAnimKey((prev) => prev + 1);
    }
  };

  return (
    <div className="parent-container bg-[#FFFFFF] h-screen">
      <style>{`
        @keyframes slide-from-bottom {
          from { transform: translateY(110%); opacity: 0; }
          to   { transform: translateY(0%);   opacity: 1; }
        }
        @keyframes slide-from-top {
          from { transform: translateY(-110%); opacity: 0; }
          to   { transform: translateY(0%);    opacity: 1; }
        }
        .anim-up   { animation: slide-from-bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .anim-down { animation: slide-from-top    0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}</style>

      <div className="header w-full bg-[#fdfdfd] flex items-center justify-between px-4 border">
        <div className="logo font-noto text-[30px] md:text-[40px] text-[#252525] tracking-[0.18em] uppercase">
          CodeSave
        </div>
      </div>

      <div className="mx-10 mt-15 mb-2 flex items-center justify-between">
        <div className="previous-and-next-group flex">
          <div
            onClick={goPrev}
            className="previous-button p-3 w-10 h-10 bg-[#dcdcdc]/30 border border-[#b5b5b5] flex items-center justify-between me-5 cursor-pointer hover:border-[#dcdcdc]/20 transition-all duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000000"
            >
              <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
          </div>
          <div
            onClick={goNext}
            className="next-button p-3 w-10 h-10 bg-[#dcdcdc]/30 border border-[#b5b5b5] flex items-center justify-between cursor-pointer hover:border-[#dcdcdc]/20 transition-all duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000000"
            >
              <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
            </svg>
          </div>
        </div>

        {/* Animated page label */}
        <div
          className="current-page-text-container font-noto text-[50px] md:text-[60px] text-[#252525] font-bold"
          style={{ overflow: "hidden", lineHeight: "1.1em", height: "1.1em" }}
        >
          <span
            key={animKey}
            className={direction === 1 ? "anim-up" : "anim-down"}
            style={{ display: "block" }}
          >
            {PAGES[pageIndex]}
          </span>
        </div>

        <div className="add-folder-or-file-button p-2 w-10 h-10 bg-[#dcdcdc]/30 border border-[#b5b5b5] flex items-center justify-between cursor-pointer hover:border-[#dcdcdc]/20 transition-all duration-150">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="30px"
            fill="#434343"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </div>
      </div>

      <div className="folders-and-files-container h-[70%] border border-black mx-10"></div>
    </div>
  );
};

export default Library;
