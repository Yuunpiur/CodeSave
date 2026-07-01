import { IoMdArrowDropdown } from "react-icons/io";
import "./main.css";
import { useState } from "react";

const DropDownMenu = ({ sendDataToParent, programmingLanguage }) => {
  const [activateMenu, setActivateMenu] = useState(false);
  const [chosenProgrammingLanguage, setChosenProgrammingLanguage] =
    useState("C++");

  const monacoProgrammingLanguageCodes = {
    JavaScript: "javascript",
    Python: "python",
    Java: "java",
    "C++": "cpp",
  };

  return (
    <>
      <div className="language-picker bg-[#EEE5E9] pr-1  h-full w-25 pl-2  jersey-25-regular flex items-center justify-around relative z-999">
        <p>{programmingLanguage}</p>
        <button
          className="cursor-pointer"
          onClick={() => setActivateMenu(!activateMenu)}
        >
          <IoMdArrowDropdown />
        </button>
        {activateMenu ? (
          <div className="menu w-25 h-125 absolute bg-white left-0 top-full border border-black  flex flex-col overflow-y-auto">
            {Object.keys(monacoProgrammingLanguageCodes).map(
              (element, index) => (
                <button
                  className="w-full h-7.5 hover:bg-gray-300 cursor-pointer"
                  key={index}
                  onClick={(event) => {
                    console.log("drop down");
                    setChosenProgrammingLanguage(event.target.innerText);

                    sendDataToParent(
                      monacoProgrammingLanguageCodes[event.target.innerText],
                    );
                  }}
                >
                  {element}
                </button>
              ),
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DropDownMenu;
