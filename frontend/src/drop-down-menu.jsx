import { IoMdArrowDropdown } from "react-icons/io";
import "./main.css";
import { useState } from "react";

const DropDownMenu = () => {
  const [activateMenu, setActivateMenu] = useState(false);
  const programmingLanguages = [
    "JavaScript",
    "Python",
    "Java",
    "C",
    "C++",
    "C#",
    "TypeScript",
    "Ruby",
    "PHP",
    "Swift",
    "Kotlin",
    "Go",
    "Rust",
    "R",
    "Scala",
    "Dart",
    "Perl",
    "Haskell",
    "Lua",
    "MATLAB",
  ];

  return (
    <>
      <div className="language-picker bg-[#EEE5E9] rounded-[50px] pr-1  h-full w-25 pl-2  jersey-25-regular flex items-center justify-around relative">
        <p>Language</p>
        <button
          className="cursor-pointer"
          onClick={() => setActivateMenu(!activateMenu)}
        >
          <IoMdArrowDropdown />
        </button>
        {activateMenu ? (
          <div className="menu w-25 h-125 absolute bg-white left-0 top-full border border-black rounded-[10px] flex flex-col overflow-y-auto">
            {programmingLanguages.map((element, index) => (
              <button
                className="w-full h-7.5 hover:bg-gray-300 rounded-[10px] cursor-pointer"
                key={index}
              >
                {element}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DropDownMenu;
