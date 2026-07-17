import { useState, useEffect } from "react";
import { getAllFolders } from "./utils/library.js";
import { useAccessToken } from "./auth-page.jsx";
import { useNavigate } from "react-router-dom";

const PAGES = ["Folders", "Files"];

const Library = () => {
  const navigate = useNavigate();
  const accessToken = useAccessToken((state) => state.accessToken);
  const updateAccessToken = useAccessToken((state) => state.updateAccessToken);

  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [animKey, setAnimKey] = useState(0);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [items, setItems] = useState([]);

  // fetch existing folders initially
  useEffect(() => {
    (async () => {
      const allFolders = await getAllFolders(accessToken);
    })();
  }, []);

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

  const handleAdd = () => {
    if (folderName.trim() === "") return;

    const newItem = {
      id: crypto.randomUUID(),
      name: folderName.trim(),
      type: pageIndex === 0 ? "folder" : "file",
      createdAt: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };

    setItems((prev) => [newItem, ...prev]);
    setFolderName("");
    setShowAddPopup(false);
  };

  // only show items that match the current page type
  const visibleItems = items.filter((item) =>
    pageIndex === 0 ? item.type === "folder" : item.type === "file",
  );

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
        .folders { }
        .files { 
                  width: 100%;
                  background-color: rgba(220, 220, 220, 0.4);
                  border: 1px solid #b5b5b5;
                  transition: all 150ms;
                  cursor: pointer;
                  padding: 20px 20px;
                  position: relative;
                  display: inline-block;
                  margin: 4px;
}

        .folders { 
                  width: 250px;
                  height: 150px;
        
                  background-color: rgba(220, 220, 220, 0.4);
                  border: 1px solid #b5b5b5;
                  transition: all 150ms;
                  cursor: pointer;
                  padding: 25px;
                  flex-shrink: 0;
                  position: relative;
                  display: inline-block;
                  margin: 4px;
}

        .files:hover, .folders:hover {
          border-color: rgba(220, 220, 220, 0.2);
        }
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

        <div
          onClick={() => setShowAddPopup(true)}
          className="add-folder-or-file-button p-2 w-10 h-10 bg-[#dcdcdc]/30 border border-[#b5b5b5] flex items-center justify-between cursor-pointer hover:border-[#dcdcdc]/20 transition-all duration-150"
        >
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

      {/* Folders / Files container */}
      <div
        className={`${visibleItems.length > 0 ? "folders-and-files-container h-[70%] border border-black mx-10 overflow-y-auto gap-2 p-3" : "folders-and-files-container h-[70%] border border-black mx-10 overflow-y-auto gap-2 p-3 flex justify-between items-center"}`}
      >
        {visibleItems.length > 0 ? (
          visibleItems.map((item) => (
            <div
              key={item.id}
              className={`${pageIndex == 0 ? "folders" : "files"} flex justify-around group relative`}
              onClick={() => {
                if (pageIndex == 1) {
                  navigate("/");
                }
              }}
            >
              {/* Delete button */}
              <button
                className="absolute top-2.5 right-2.5 w-6 h-6 rounded-md bg-transparent hover:bg-[#f55522]/15 border border-transparent hover:border-[#f55522]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-150 cursor-pointer text-[#f55522] text-[13px]"
                onClick={(e) => {
                  e.stopPropagation();
                  setItems((prev) => prev.filter((i) => i.id !== item.id));
                }}
              >
                ✕
              </button>

              <div className="text-[#252525] font-noto text-[17px] tracking-wide mb-15">
                {item.name}
              </div>
              <div className="text-[#575757] font-noto text-[11px] tracking-[0.14em] uppercase">
                {item.createdAt}
              </div>
            </div>
          ))
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#252525]/25 font-noto text-[13px] tracking-[0.14em] uppercase">
            No {PAGES[pageIndex].toLowerCase()} yet
          </div>
        )}
      </div>

      {/* Add Popup */}
      {showAddPopup && (
        <div className="w-screen h-screen absolute inset-0 flex items-center justify-center bg-[#252525]/50 backdrop-blur-sm z-1000 px-4">
          <div className="w-full max-w-85 bg-[#FFFFFF] border border-[#000000] overflow-hidden">
            <div className="px-5 md:px-7 pt-6 pb-5 border-b border-[#dcdcdc]/6">
              <div className="text-[11px] tracking-[0.18em] uppercase text-[#ffb522]/60 mb-1.5 font-noto">
                CodeSave
              </div>
              <h2 className="text-[24px] md:text-[26px] text-[#252525] tracking-wide font-noto font-normal">
                New {pageIndex === 0 ? "Folder" : "File"}
              </h2>
            </div>

            <div className="px-5 md:px-7 pt-5 pb-6">
              <label
                className="block text-[11px] tracking-[0.14em] uppercase text-[#ffb522]/70 mb-2 font-noto"
                htmlFor="item-name"
              >
                {pageIndex === 0 ? "Folder" : "File"} name
              </label>
              <input
                className="w-full bg-[#dcdcdc]/40 border border-[#000000] text-[#252525] text-sm px-3.5 py-2.5 outline-none focus:border-[#ffb522]/45 transition-colors font-noto tracking-wide"
                id="item-name"
                placeholder={
                  pageIndex === 0 ? "e.g. my-project" : "e.g. main.js"
                }
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                autoFocus
              />
              <p className="text-[11px] text-[#252525]/40 mt-1.5 tracking-wide">
                Give this {pageIndex === 0 ? "folder" : "file"} a meaningful
                name
              </p>
            </div>

            <div className="px-5 md:px-7 pb-6 flex gap-2.5">
              <button
                className="flex-1 bg-transparent border border-[#dcdcdc]/20 text-[#252525]/55 hover:border-[#dcdcdc]/45 hover:text-[#252525]/90 py-2.5 text-[15px] tracking-widest uppercase font-noto transition-all duration-150 cursor-pointer"
                onClick={() => {
                  setFolderName("");
                  setShowAddPopup(false);
                }}
              >
                Exit
              </button>
              <button
                className={`flex-1 bg-[#ffb522] hover:bg-[#ffd15b] border-none text-[#252525] py-2.5 text-[15px] tracking-widest uppercase font-noto font-medium transition-all duration-150 ${folderName.trim() === "" ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                disabled={folderName.trim() === ""}
                onClick={handleAdd}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
