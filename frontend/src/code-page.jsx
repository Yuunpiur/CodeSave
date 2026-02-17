import "./main.css";

const CodePage = () => {
  return (
    <>
      <div className="header">
        <div className="logo">
          <div className="symbol"></div>
          <div className="text"></div>
        </div>
        <div className="settings"></div>
      </div>

      <div className="main">
        <div className="code-space">
          <div className="code-space-header">
            <button className="language-picker"></button>
            <input className="code-link" type="text" />
          </div>
          <div className="code-editor font-bold text-red-900">HELLO</div>
        </div>

        <div className="version-history">
          <button className="save-button"></button>
          <div className="all-versions">
            <div className="version-1">
              <div className="version-name"></div>
              <div className="created-date"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodePage;
