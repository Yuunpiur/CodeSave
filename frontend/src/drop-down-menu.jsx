import { IoMdArrowDropdown } from "react-icons/io";
import "./main.css";
import { useState } from "react";

const DropDownMenu = () => {
  const [activateMenu, setActivateMenu] = useState(false);
  return (
    <>
      <div className="language-picker bg-[#EEE5E9] rounded-[50px] pr-1 pl-1 h-full w-[100px] pl-2  jersey-25-regular flex items-center justify-around h-full">
        <p>Language</p>
        <button
          className="cursor-pointer"
          onClick={() => setActivateMenu(!activateMenu)}
        >
          <IoMdArrowDropdown />
        </button>
      </div>
    </>
  );
};

export default DropDownMenu;
