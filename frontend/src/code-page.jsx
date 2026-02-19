import "./main.css";

const CodePage = () => {
  return (
    <div class="parent-container w-full h-screen bg-[#2B303A]">
      <div className="header w-full h-20 bg-[#D64933]">
        <div className="logo">
          <div className="symbol"></div>
          <div className="text"></div>
        </div>
        <div className="settings"></div>
      </div>

      <div className="main w-[100%] h-[80%] flex flex-row justify-around items-center">
        <div className="code-space w-[65%] h-[100%] bg-red-500">
          <div className="code-space-header">
            <button className="language-picker"></button>
            <input className="code-link" type="text" />
          </div>
          <div className="code-editor w-[100%] h-[80%] bg-white"></div>
        </div>

        <div className="version-history h-[80%] w-[25%] bg-red-500">
          <button className="save-button"></button>
          <div className="all-versions h-[100%] w-[100%] bg-[#7C7C7C]">
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
