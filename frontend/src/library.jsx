import { useEffect } from "react";
import { library } from "./utils/library.js";
import { useAccessToken } from "./auth-page.jsx";

const Library = () => {
  const accessToken = useAccessToken((state) => state.accessToken);
  const updateAccessToken = useAccessToken((state) => state.updateAccessToken);

  useEffect(() => {
    console.log(accessToken);
  }, [accessToken]);

  return (
    <div className="parent-container bg-[#FFFFFF]">
      <div className="header w-full h-[8%]  bg-[#fdfdfd] flex items-center justify-between px-4 ">
        <div className="logo font-noto text-[30px] md:text-[40px] text-[#252525] tracking-[0.18em] uppercase ">
          CodeSave
        </div>
      </div>
      {/* BACK AND FORWARD BUTTON, ANIMATION AT THE CENTER, ADD FOLDER/FILE BUTTON */}
      <div className="">
        <div className="previous-and-next-group h-[8%] w-full flex mt-10">
          <div className="previous-button p-5 bg-[#dcdcdc]/30 flex items-center justify-between me-1 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
          </div>
          <div className="next-button p-5 bg-[#dcdcdc]/30 flex items-center justify-between rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
            </svg>
          </div>
        </div>
        <div className="current-page-text"></div>
        <div className="add-folder-or-file-button"></div>
      </div>
    </div>
  );
};

export default Library;
