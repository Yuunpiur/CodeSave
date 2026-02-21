import "./main.css";
import "./drop-down-menu";
import DropDownMenu from "./drop-down-menu";

const CodePage = () => {
  return (
    <div class="parent-container w-screen h-screen bg-[#2B303A]">
      <div className="header w-full h-[7%] bg-[#D64933] mb-5">
        <div className="logo w-full h-full jersey-25-regular flex flex-column items-center justify-left ">
          <div className="text ml-1 text-[50px]">CodeSave</div>
        </div>
        <div className="settings"></div>
      </div>

      <div className="main  flex flex-row justify-around items-center p-3 h-[90%] w-[100%]">
        <div className="code-space h-[100%] w-[70%]">
          <div className="code-space-header m-2 h-[5%] w-[100%] flex gap-[2rem]">
            <DropDownMenu />
            <input
              className="code-link bg-[#D8D8D8] rounded-[50px] h-full p-4 w-[500px] text-gray-500 jersey-25-regular"
              type="text"
              value={"Type something for the link to appear..."}
            />
          </div>
          <div className="code-editor  bg-white  rounded-[15px] h-[90%] w-[100%]"></div>
        </div>

        <div className="version-history h-[100%] w-[20%]">
          <div className="button-container h-[5%] m-2 flex justify-end">
            <button className="save-button bg-[#EEE5E9] rounded-[50px] h-[35px] w-[100px] jersey-25-regular tracking-widest">
              SAVE
            </button>
          </div>
          <div className="all-versions bg-[#7C7C7C] rounded-[15px] h-[90%]">
            <div className="version-1">
              <div className="version-name"></div>
              <div className="created-date"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
