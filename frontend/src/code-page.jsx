import { useNavigate } from "react-router-dom";
import "./main.css";
import "./drop-down-menu";
import DropDownMenu from "./drop-down-menu";
import { useEffect, useState, version } from "react";
import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import copyIcon from "./assets/IMAGES/ICONS/copy.svg";
import checkIcon from "./assets/IMAGES/ICONS/check.svg";
import {
  createNewCodeInfo,
  fetchSourceCodeInfo,
  updateSourceCodeInfo,
  checkIfIDExists,
} from "./utils/code-saving.js";

import {
  saveVersion,
  fetchVersionBlocks,
  fetchVersionBlockSourceCode,
  deleteVersionBlock,
} from "./utils/version-saving.js";

import {
  sendDataToCallBackUseStateVariable,
  debounceBlock,
  copyLink,
  checkSourceCode,
  disableButtonForTenSeconds,
} from "./utils/client-utils.js";

const CodePage = () => {
  const navigate = useNavigate();
  const [programmingLanguage, setProgrammingLanguage] = useState("javascript");
  const [sourceCode, setSourceCode] = useState("");
  const [liveSourceCode, setLiveSourceCode] = useState(""); //! For the undo button, this is where all the typed source code is saved, more advance than sourceCode usestate variable
  const [linkID, setLinkID] = useState(undefined);
  const { id: rawID } = useParams();
  const id = rawID ?? linkID ?? "";
  const [codeURL, setCodeURL] = useState("");
  const [copyIconPressed, setCopyIconPressed] = useState(false);
  const [saveButtonState, setSaveButtonState] = useState(id == "");
  const [savingLimitReached, setSavingLimitReached] = useState(false);
  const [saveButtonIsPressed, setSaveButtonIsPressed] = useState(false);
  const [versionName, setVersionName] = useState("");
  const [codeIsSaved, setCodeIsSaved] = useState(true); // ! cause code is not saved when the the setTimeout block is not yet executed
  const [versionBlocks, setVersionBlocks] = useState([]);
  const [codeReadOnly, setCodeReadOnly] = useState(false);
  const [deletePopupIsPressed, setDeletePopupIsPressed] = useState(false);
  const [verID, setVerID] = useState("");

  const options = {
    fontFamily: "'JetBrains Mono', Consolas, 'Courier New', monospace",
    fontSize: 16,
    readOnly: codeReadOnly,
  };

  // ! Check if the id is existing
  useEffect(() => {
    if (id) {
      (async () => {
        const IDEexist = await checkIfIDExists(id);
        if (!IDEexist) {
          navigate("/not-found");
        }
      })();
    }
  }, [id]);

  useEffect(() => {
    console.log("1");
  }, [sourceCode]);

  useEffect(() => {
    if (!id && sourceCode != "") {
      createNewCodeInfo(setLinkID, sourceCode, programmingLanguage);
      setSaveButtonState(false);
    }
  }, [sourceCode]);

  useEffect(() => {
    setCodeURL(`http://localhost:5173/${id}`);
    if (id && (sourceCode == "" || sourceCode == undefined)) {
      (async () => {
        await fetchSourceCodeInfo(
          id,
          setSourceCode,
          setProgrammingLanguage,
          setLiveSourceCode,
        );
      })();
      setLiveSourceCode(sourceCode);
    }
  }, [id]);

  useEffect(() => {
    if (id && sourceCode != "" && !codeReadOnly) {
      setLiveSourceCode(sourceCode);
      updateSourceCodeInfo(sourceCode, id);
    }
  }, [sourceCode]);

  useEffect(() => {
    checkSourceCode(sourceCode, setSaveButtonState, savingLimitReached, id);
  }, [sourceCode, id]);

  useEffect(() => {
    if (id) {
      fetchVersionBlocks(id, setVersionBlocks);
    }
  }, [id]);

  const debounceFunction = debounceBlock(2000);

  return (
    <>
      <div className="parent-container w-screen h-screen bg-[#0C0C0C] overflow-hidden">
        <div className="header w-full h-[6%] border-b border-white/10 flex items-center px-4 md:px-7">
          <div className="logo jersey-25-regular text-[30px] md:text-[30px] text-white tracking-[0.18em] uppercase">
            CodeSave
          </div>
        </div>

        <div className="main flex flex-col lg:flex-row justify-start lg:justify-around items-stretch p-3 md:p-4 h-[94%] w-full gap-3 md:gap-4 overflow-hidden">
          <div className="code-space flex flex-col h-[60%] lg:h-full w-full lg:w-[73%]">
            <div className="code-space-header mb-3 h-[5%] min-h-9 w-full flex gap-2 md:gap-4 items-center">
              <DropDownMenu
                sendDataToParent={() => {
                  sendDataToCallBackUseStateVariable(
                    programmingLanguage,
                    setProgrammingLanguage,
                  );
                }}
                programmingLanguage={programmingLanguage}
              />
              <div className="code-link bg-[#181818] border border-white/10 rounded-lg h-full px-3 md:px-4 flex items-center flex-1 min-w-0 text-[#E8E5DC]/30 jersey-25-regular text-xs md:text-sm tracking-[0.14em] truncate">
                {codeURL}
              </div>
              <div
                className="copy-button bg-[#181818] border border-white/10 hover:border-white/20 rounded-lg p-2 cursor-pointer transition-all duration-150 shrink-0"
                onClick={() => {
                  copyLink(copyIconPressed, setCopyIconPressed, codeURL);
                }}
              >
                <img
                  className="copy-icon w-4 h-4"
                  src={copyIcon}
                  alt="copy-icon"
                />
                <img
                  className="check-icon hidden w-4 h-4"
                  src={checkIcon}
                  alt="check-icon"
                />
              </div>
            </div>
            <div className="code-editor rounded-[14px] overflow-hidden border border-white/10 flex-1 w-full">
              <Editor
                className="w-full h-full"
                language={programmingLanguage}
                value={`${sourceCode}`}
                theme="vs-dark"
                onChange={(value) => {
                  if (!codeReadOnly) {
                    debounceFunction(value, setSourceCode, setCodeIsSaved);
                  }
                }}
                options={options}
              />
            </div>
          </div>

          <div className="version-history flex flex-col h-[38%] lg:h-full w-full lg:w-[22%] min-h-0">
            <div className="button-container h-8 mb-3 flex justify-between items-center shrink-0">
              <button
                className={`bg-[#181818] hover:bg-[#242424] border border-white/10 hover:border-white/20 text-[#E8E5DC] transition-all duration-150 rounded-lg h-8 px-3 cursor-pointer flex items-center justify-center ${codeReadOnly ? "cursor-pointer" : "opacity-40 cursor-not-allowed"}`}
                disabled={!codeReadOnly}
                onClick={() => {
                  setSourceCode(liveSourceCode);
                  setCodeReadOnly(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 7v6h6" />
                  <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                </svg>
              </button>
              <button
                className={`save-button bg-[#C5A882] hover:bg-[#d4bc9a] text-[#0C0C0C] transition-all duration-150 rounded-lg h-8 px-5 jersey-25-regular tracking-widest text-[13px] uppercase font-medium
             ${saveButtonState ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                disabled={saveButtonState}
                onClick={() => setSaveButtonIsPressed(true)}
              >
                SAVE
              </button>
            </div>
            <div className="all-versions bg-[#181818] border border-white/10 rounded-[14px] flex-1 overflow-y-auto flex flex-col gap-2 p-3 min-h-0">
              {versionBlocks.length > 0
                ? versionBlocks.map((versionInfo) => {
                    return (
                      <div
                        className="version-card w-full bg-[#242424] hover:bg-[#2a2a2a] border border-white/10 hover:border-white/20 transition-all duration-150 rounded-lg cursor-pointer flex flex-col justify-center items-start px-4 md:px-5 py-3 md:py-4 shrink-0 relative group"
                        key={versionInfo.ver_id}
                        id={versionInfo.ver_id}
                        onClick={(e) => {
                          setCodeReadOnly(true);
                          fetchVersionBlockSourceCode(
                            id,
                            e.target.id,
                            setSourceCode,
                          );
                        }}
                      >
                        <div
                          className="delete-button-container"
                          onClick={(e) => {
                            setVerID(e.target.id);
                            e.stopPropagation();
                            setDeletePopupIsPressed(true);
                          }}
                          id={versionInfo.ver_id}
                        >
                          <button
                            className="delete-button absolute top-2.5 right-2.5 w-6 h-6 rounded-md bg-transparent hover:bg-red-500/15 border border-transparent hover:border-red-500/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-150 cursor-pointer"
                            id={versionInfo.ver_id}
                          ></button>
                          <button
                            className="absolute top-2.5 right-2.5 w-6 h-6 rounded-md bg-transparent hover:bg-red-500/15 border border-transparent hover:border-red-500/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-150 cursor-pointer text-red-500 text-[13px]"
                            id={versionInfo.ver_id}
                          >
                            ✕
                          </button>
                        </div>

                        <div
                          className="version-name text-[#E8E5DC] jersey-25-regular text-[15px] md:text-[17px] tracking-wide"
                          id={versionInfo.ver_id}
                        >
                          {versionInfo.ver_name}
                        </div>
                        <div
                          className="created-date-time text-[#C5A882]/50 jersey-25-regular text-[11px] tracking-[0.14em] uppercase mt-1"
                          id={versionInfo.ver_id}
                        >
                          {versionInfo.created_at}
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
        {/* ! THIS IS THE POP UP */}
        {saveButtonIsPressed ? (
          <div className="w-screen h-screen absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-1000 px-4">
            <div className="w-full max-w-85 bg-[#181818] border border-white/10 rounded-[14px] overflow-hidden">
              <div className="px-5 md:px-7 pt-6 pb-5 border-b border-white/6">
                <div className="text-[11px] tracking-[0.18em] uppercase text-[#C5A882]/60 mb-1.5 jersey-25-regular">
                  CodeSave
                </div>
                <h2 className="text-[24px] md:text-[26px] text-[#E8E5DC] tracking-wide jersey-25-regular font-normal">
                  Save Version
                </h2>
              </div>

              <div className="px-5 md:px-7 pt-5 pb-6">
                <label
                  className="block text-[11px] tracking-[0.14em] uppercase text-[#C5A882]/70 mb-2 jersey-25-regular"
                  htmlFor="version-name"
                >
                  Version name
                </label>
                <input
                  className="w-full bg-[#242424] border border-white/10 rounded-lg text-[#E8E5DC] text-sm px-3.5 py-2.5 outline-none focus:border-[#C5A882]/45 transition-colors jersey-25-regular tracking-wide"
                  id="version-name"
                  name="version-name"
                  placeholder="e.g. auth-flow-fix"
                  onChange={(e) => {
                    setVersionName(e.target.value);
                  }}
                />
                <p className="text-[11px] text-white/25 mt-1.5 tracking-wide">
                  Give this snapshot a meaningful name
                </p>
              </div>

              <div className="px-5 md:px-7 pb-6 flex gap-2.5">
                <button
                  className="flex-1 bg-transparent border border-white/20 text-white/50 hover:border-white/45 hover:text-white/85 rounded-lg py-2.5 text-[15px] tracking-widest uppercase jersey-25-regular transition-all duration-150 cursor-pointer"
                  onClick={() => {
                    setSaveButtonIsPressed(false);
                  }}
                >
                  Exit
                </button>
                <button
                  className="flex-1 bg-[#C5A882] hover:bg-[#d4bc9a] border-none text-[#0C0C0C] rounded-lg py-2.5 text-[15px] tracking-widest uppercase jersey-25-regular font-medium transition-all duration-150 cursor-pointer"
                  disabled={versionName == ""}
                  onClick={() => {
                    setSaveButtonIsPressed(false);
                    disableButtonForTenSeconds(
                      setSaveButtonState,
                      setSavingLimitReached,
                    );

                    (async () => {
                      await saveVersion(
                        sourceCode,
                        versionName,
                        id,
                        saveButtonState,
                        versionBlocks,
                        setVersionBlocks,
                      );

                      fetchVersionBlocks(id, setVersionBlocks);
                    })();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {deletePopupIsPressed ? (
          <div className="w-screen h-screen absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-1000 px-4">
            <div className="w-full max-w-85 bg-[#181818] border border-white/10 rounded-[14px] overflow-hidden">
              <div className="px-5 md:px-7 pt-6 pb-5 border-b border-white/6">
                <div className="text-[11px] tracking-[0.18em] uppercase text-red-500/60 mb-1.5 jersey-25-regular">
                  CodeSave
                </div>
                <h2 className="text-[24px] md:text-[26px] text-[#E8E5DC] tracking-wide jersey-25-regular font-normal">
                  Delete Version
                </h2>
              </div>

              <div className="px-5 md:px-7 pt-5 pb-6">
                <p className="text-[13px] text-white/40 tracking-wide leading-relaxed">
                  This version snapshot will be permanently removed and cannot
                  be recovered.
                </p>
              </div>

              <div className="px-5 md:px-7 pb-6 flex gap-2.5">
                <button
                  className="flex-1 bg-transparent border border-white/20 text-white/50 hover:border-white/45 hover:text-white/85 rounded-lg py-2.5 text-[15px] tracking-widest uppercase jersey-25-regular transition-all duration-150 cursor-pointer"
                  onClick={() => setDeletePopupIsPressed(false)}
                >
                  No
                </button>
                <button
                  className="flex-1 bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 hover:border-red-500/50 text-red-400 rounded-lg py-2.5 text-[15px] tracking-widest uppercase jersey-25-regular transition-all duration-150 cursor-pointer"
                  onClick={() => {
                    setDeletePopupIsPressed(false);
                    (async () => {
                      await deleteVersionBlock(verID);
                      fetchVersionBlocks(id, setVersionBlocks);
                    })();
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CodePage;
