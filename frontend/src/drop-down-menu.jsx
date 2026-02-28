import { IoMdArrowDropdown } from "react-icons/io";
import "./main.css";
import { useState } from "react";

const DropDownMenu = ({ sendDataToParent }) => {
  const [activateMenu, setActivateMenu] = useState(false);
  const [chosenProgrammingLanguage, setChosenProgrammingLanguage] =
    useState("C++");
  const programmingLanguages = ["JavaScript", "Python", "Java", "C", "C++"];

  return (
    <>
      <div className="language-picker bg-[#EEE5E9] rounded-[50px] pr-1  h-full w-25 pl-2  jersey-25-regular flex items-center justify-around relative z-999">
        <p>{chosenProgrammingLanguage}</p>
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
                onClick={(event) => {
                  setChosenProgrammingLanguage(event.target.innerText);
                  sendDataToParent(event.target.innerText);
                }}
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
