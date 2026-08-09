import { useNavigate } from "react-router-dom";
import "./main.css";
import "./drop-down-menu.jsx";
import DropDownMenu from "./drop-down-menu.jsx";
import { useEffect, useState, version } from "react";
import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import copyIcon from "./assets/IMAGES/ICONS/copy.svg";
import checkIcon from "./assets/IMAGES/ICONS/check.svg";
import { useAccessToken } from "./auth-page.jsx";

import {
  addSourceCodeInfo,
  fetchSourceCodeInfo,
  updateSourceCodeInfo,
  sourceCodeInfoIDExist,
} from "./utils/anonymous-code-saving.js";

import {
  addVersionInfo,
  fetchVersionsDetails,
  fetchVersionSourceCode,
  deleteVersion,
} from "./utils/anonymous-version-saving.js";

import {
  sendDataToCallBackUseStateVariable,
  debounceBlock,
  copyLink,
  toggleSaveVersionButton,
  disableButtonForTenSeconds,
} from "./utils/client-utils.js";

const CodePage = () => {
  const accessToken = useAccessToken((state) => state.accessToken);
  const navigate = useNavigate();
  const [programmingLanguage, setProgrammingLanguage] = useState("javascript");
  const [codeEditorSourceCode, setCodeEditorSourceCode] = useState("");
  const [latestSourceCode, setLatestSourceCode] = useState("");
  const { id: existingSourceCodeInfoID } = useParams();
  const [sourceCodeInfoID, setSourceCodeInfoID] = useState(
    existingSourceCodeInfoID ?? "",
  );
  const [codeURL, setCodeURL] = useState("");
  const [copyIconPressed, setCopyIconPressed] = useState(false);
  const [saveVersionButtonDisabled, setSaveVersionButtonDisabled] = useState(
    sourceCodeInfoID == "",
  );
  const [showSaveVersionPopUp, setShowSaveVersionPopUp] = useState(false);
  const [showDeleteVersionPopup, setDeleteVersionPopup] = useState(false);
  const [versionName, setVersionName] = useState("");
  const [savedVersionsDetails, setSavedVersionsDetails] = useState([]);
  const [codeEditorReadOnly, setCodeEditorReadOnly] = useState(false);
  const [versionToDeleteID, setVersionToDeleteID] = useState("");

  const monacoEditorOptions = {
    fontFamily: "'JetBrains Mono', Consolas, 'Courier New', monospace",
    fontSize: 16,
    readOnly: codeEditorReadOnly,
  };

  useEffect(() => {
    if (sourceCodeInfoID != "") {
      (async () => {
        if (await sourceCodeInfoIDExist(sourceCodeInfoID)) {
          setCodeURL(`${import.meta.env.VITE_FRONTEND_URL}${sourceCodeInfoID}`);
          (async () => {
            const sourceCodeInfo = await fetchSourceCodeInfo(sourceCodeInfoID);
            setLatestSourceCode(sourceCodeInfo.codeEditorSourceCode);
            setCodeEditorSourceCode(sourceCodeInfo.codeEditorSourceCode);
            setProgrammingLanguage(sourceCodeInfo.programmingLanguage);
          })();
        } else {
          navigate("/not-found");
        }
      })();
    }
  }, [sourceCodeInfoID]);

  useEffect(() => {
    if (!sourceCodeInfoID && codeEditorSourceCode != "") {
      (async () => {
        setSourceCodeInfoID(
          await addSourceCodeInfo(codeEditorSourceCode, programmingLanguage),
        );
        console.log("! ADD SOURCE CODE");
        setSaveVersionButtonDisabled(false);
      })();
    }
  }, [codeEditorSourceCode]);

  useEffect(() => {
    if (sourceCodeInfoID && codeEditorSourceCode != "" && !codeEditorReadOnly) {
      setLatestSourceCode(codeEditorSourceCode);
      updateSourceCodeInfo(codeEditorSourceCode, sourceCodeInfoID);
    }
  }, [codeEditorSourceCode]);

  useEffect(() => {
    toggleSaveVersionButton(
      codeEditorSourceCode,
      setSaveVersionButtonDisabled,
      codeEditorReadOnly,
      sourceCodeInfoID,
    );
  }, [codeEditorSourceCode, sourceCodeInfoID]);

  useEffect(() => {
    if (sourceCodeInfoID) {
      (async () => {
        setSavedVersionsDetails(await fetchVersionsDetails(sourceCodeInfoID));
        console.log(savedVersionsDetails);
      })();
    }
  }, [sourceCodeInfoID]);

  useEffect(() => {}, [codeEditorReadOnly]);

  const debounceFunction = debounceBlock(2000);

  return (
    <>
      <div className="parent-container w-screen h-screen overflow-hidden">
        <div className="header w-full h-[8%] bg-[#fdfdfd] flex items-center justify-between px-4 border">
          <div className="logo font-noto text-[30px] md:text-[40px] text-[#252525] tracking-[0.18em] uppercase ">
            CodeSave
          </div>
        </div>

        <div className="main flex flex-col lg:flex-row justify-start lg:justify-around items-stretch p-3 md:px-4 md:pt-12 md:pb-8 h-[92%] w-full gap-3 md:gap-4 overflow-hidden">
          <div className="code-space flex flex-col h-[60%] lg:h-full w-full lg:w-[73%]">
            <div className="code-space-header mb-3 h-[5%] min-h-9 w-full flex gap-2 md:gap-4 items-center">
              <DropDownMenu
                sendDataToParent={() => {
                  sendDataToCallBackUseStateVariable(
                    programmingLanguage,
                    setProgrammingLanguage,
                  );
                }}
                programmingLanguage={
                  programmingLanguage.charAt(0).toUpperCase() +
                  programmingLanguage.slice(1)
                }
              />
              <div className="code-link bg-[#dcdcdc]/30 border border-[#b5b5b5] h-full px-3 md:px-4 flex items-center flex-1 min-w-0 text-[#252525]/40 font-noto text-xs md:text-sm tracking-[0.14em] truncate">
                {codeURL}
              </div>
              <div
                className="copy-button bg-[#dcdcdc]/30 border border-[#b5b5b5] hover:border-[#dcdcdc]/20 p-2 cursor-pointer transition-all duration-150 shrink-0"
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
            <div className="code-editor overflow-hidden border border-[#000000] flex-1 w-full">
              <Editor
                className="w-full h-full border border-[#000000]"
                language={programmingLanguage}
                value={`${codeEditorSourceCode}`}
                theme="vs-dark"
                onChange={(value) => {
                  if (!codeEditorReadOnly) {
                    debounceFunction(value, setCodeEditorSourceCode);
                  }
                }}
                options={monacoEditorOptions}
              />
            </div>
          </div>

          <div className="version-history flex flex-col h-[38%] lg:h-full w-full lg:w-[22%] min-h-0">
            <div className="button-container h-8 mb-3 flex justify-between items-center shrink-0">
              <button
                className={`undo-button bg-[#dcdcdc]/30 hover:bg-[#dcdcdc]/40 border border-[#b5b5b5] hover:border-[#dcdcdc]/20 text-[#252525] transition-all duration-150 h-8 px-3 cursor-pointer flex items-center justify-center ${codeEditorReadOnly ? "cursor-pointer" : "opacity-40 cursor-not-allowed"}`}
                disabled={!codeEditorReadOnly}
                onClick={() => {
                  setCodeEditorSourceCode(latestSourceCode);
                  setCodeEditorReadOnly(false);
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
                className={`save-button bg-[#ffb522] hover:bg-[#ffd15b] text-[#252525] transition-all duration-150 h-8 px-5 font-noto tracking-widest text-[13px] uppercase font-medium
             ${saveVersionButtonDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                disabled={saveVersionButtonDisabled}
                onClick={() => setShowSaveVersionPopUp(true)}
              >
                SAVE
              </button>
            </div>
            <div className="all-versions bg-[#dcdcdc]/30 border border-[#b5b5b5] flex-1 overflow-y-auto flex flex-col gap-2 p-3 min-h-0">
              {savedVersionsDetails.length > 0
                ? savedVersionsDetails.map((versionInfo) => {
                    return (
                      <div
                        className="version-card w-full bg-[#dcdcdc]/40 hover:bg-[#dcdcdc]/55 border border-[#b5b5b5] hover:border-[#dcdcdc]/20 transition-all duration-150 cursor-pointer flex flex-col justify-center items-start px-4 md:px-5 py-3 md:py-4 shrink-0 relative group"
                        key={versionInfo.ver_id}
                        id={versionInfo.ver_id}
                        onClick={(e) => {
                          setCodeEditorReadOnly(true);
                          (async () => {
                            setCodeEditorSourceCode(
                              await fetchVersionSourceCode(e.target.id),
                            );
                          })();
                        }}
                      >
                        <div
                          className="delete-button-container"
                          onClick={(e) => {
                            setVersionToDeleteID(e.target.id);
                            e.stopPropagation();
                            setDeleteVersionPopup(true);
                            /*     setSaveVersionButtonDisabled(true); */
                          }}
                          id={versionInfo.ver_id}
                        >
                          <button
                            className="delete-button absolute top-2.5 right-2.5 w-6 h-6 rounded-md bg-transparent hover:bg-[#f55522]/15 border border-transparent hover:border-[#f55522]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-150 cursor-pointer"
                            id={versionInfo.ver_id}
                          ></button>
                          <button
                            className="absolute top-2.5 right-2.5 w-6 h-6 rounded-md bg-transparent hover:bg-[#f55522]/15 border border-transparent hover:border-[#f55522]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-150 cursor-pointer text-[#f55522] text-[13px]"
                            id={versionInfo.ver_id}
                          >
                            ✕
                          </button>
                        </div>

                        <div
                          className="version-name text-[#252525] font-noto text-[15px] md:text-[17px] tracking-wide"
                          id={versionInfo.ver_id}
                        >
                          {versionInfo.ver_name}
                        </div>
                        <div
                          className="created-date-time text-[#575757] font-noto text-[11px] tracking-[0.14em] uppercase mt-1"
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
        {showSaveVersionPopUp ? (
          <div className="w-screen h-screen absolute inset-0 flex items-center justify-center bg-[#252525]/50 backdrop-blur-sm z-1000 px-4">
            <div className="w-full max-w-85  bg-[#FFFFFF] border border-[#000000] overflow-hidden">
              <div className="px-5 md:px-7 pt-6 pb-5 border-b border-[#dcdcdc]/6">
                <div className="text-[11px] tracking-[0.18em] uppercase text-[#ffb522]/60 mb-1.5 font-noto">
                  CodeSave
                </div>
                <h2 className="text-[24px] md:text-[26px] text-[#252525] tracking-wide font-noto font-normal">
                  Save Version
                </h2>
              </div>

              <div className="px-5 md:px-7 pt-5 pb-6">
                <label
                  className="block text-[11px] tracking-[0.14em] uppercase text-[#ffb522]/70 mb-2 font-noto"
                  htmlFor="version-name"
                >
                  Version name
                </label>
                <input
                  className="w-full bg-[#dcdcdc]/40 border border-[#000000] text-[#252525] text-sm px-3.5 py-2.5 outline-none focus:border-[#ffb522]/45 transition-colors font-noto tracking-wide"
                  id="version-name"
                  name="version-name"
                  placeholder="e.g. auth-flow-fix"
                  onChange={(e) => {
                    setVersionName(e.target.value);
                  }}
                />
                <p className="text-[11px] text-[#252525]/40 mt-1.5 tracking-wide">
                  Give this snapshot a meaningful name
                </p>
              </div>

              <div className="px-5 md:px-7 pb-6 flex gap-2.5">
                <button
                  className="flex-1 bg-transparent border border-[#dcdcdc]/20 text-[#252525]/55 hover:border-[#dcdcdc]/45 hover:text-[#252525]/90 py-2.5 text-[15px] tracking-widest uppercase font-noto transition-all duration-150 cursor-pointer"
                  onClick={() => {
                    setShowSaveVersionPopUp(false);
                  }}
                >
                  Exit
                </button>
                <button
                  className="flex-1 bg-[#ffb522] hover:bg-[#ffd15b] border-none text-[#252525] py-2.5 text-[15px] tracking-widest uppercase font-noto font-medium transition-all duration-150 cursor-pointer"
                  disabled={versionName == ""}
                  onClick={() => {
                    setShowSaveVersionPopUp(false);
                    disableButtonForTenSeconds(setSaveVersionButtonDisabled);

                    (async () => {
                      const versionInfo = await addVersionInfo(
                        codeEditorSourceCode,
                        versionName,
                        sourceCodeInfoID,
                        saveVersionButtonDisabled,
                      );

                      setSavedVersionsDetails(
                        await fetchVersionsDetails(sourceCodeInfoID),
                      );
                    })();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {showDeleteVersionPopup ? (
          <div className="w-screen h-screen absolute inset-0 flex items-center justify-center bg-[#252525]/50 backdrop-blur-sm z-1000 px-4">
            <div className="w-full max-w-85 bg-[#FFFFFF] border border-[#000000] overflow-hidden">
              <div className="px-5 md:px-7 pt-6 pb-5 border-b border-[#dcdcdc]/6">
                <div className="text-[11px] tracking-[0.18em] uppercase text-[#f55522]/60 mb-1.5 font-noto">
                  CodeSave
                </div>
                <h2 className="text-[24px] md:text-[26px] text-[#252525] tracking-wide font-noto font-normal">
                  Delete Snapshot?
                </h2>
              </div>

              <div className="px-5 md:px-7 pt-5 pb-6">
                <p className="text-[13px] text-[#252525]/50 tracking-wide leading-relaxed">
                  This version snapshot will be permanently removed and cannot
                  be recovered.
                </p>
              </div>

              <div className="px-5 md:px-7 pb-6 flex gap-2.5">
                <button
                  className="flex-1 bg-transparent border border-[#dcdcdc]/20 text-[#252525]/55 hover:border-[#dcdcdc]/45 hover:text-[#252525]/90 py-2.5 text-[15px] tracking-widest uppercase font-noto transition-all duration-150 cursor-pointer"
                  onClick={() => setDeleteVersionPopup(false)}
                >
                  No
                </button>
                <button
                  className="flex-1 bg-[#f55522]/15 hover:bg-[#f55522]/25 border border-[#f55522]/30 hover:border-[#f55522]/50 text-[#f55522] py-2.5 text-[15px] tracking-widest uppercase font-noto transition-all duration-150 cursor-pointer"
                  onClick={() => {
                    setDeleteVersionPopup(false);
                    (async () => {
                      await deleteVersion(versionToDeleteID);
                      setSavedVersionsDetails(
                        await fetchVersionsDetails(sourceCodeInfoID),
                      );
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
