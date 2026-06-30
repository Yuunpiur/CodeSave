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
        <div className="auth-button-group">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="font-noto text-sm text-white bg-[#252525] border border-[#252525] p-1.5 me-5 rounded-md w-20 cursor-pointer hover:bg-[#ffb522] hover:border-[#ffb522] transition-all duration-150"
          >
            Sign Up
          </button>
          <button className="font-noto text-sm text-white bg-[#252525] border border-[#252525] p-1.5 rounded-md w-20 cursor-pointer hover:bg-[#ffb522] hover:border-[#ffb522] transition-all duration-150">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Library;
