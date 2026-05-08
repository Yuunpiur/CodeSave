export const saveVersion = async (sourceCode, versionName, linkID, saveButtonState, versionBlocks, setVersionBlocks) => {
    try {
        if (saveButtonState) { return; }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({ sourceCode: sourceCode, versionName: versionName, linkID: linkID }),
            headers: { "Content-Type": "application/json" },
        };

        const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}version/save-version`, requestOptions);
        const versionInfo = await result.json();
        if (versionInfo.length > 0) {
            setVersionBlocks([...versionBlocks, versionInfo])
        }
    }
    catch (error) {
        console.error(error);
    }
}

export const fetchVersionBlocks = async (id, setVersionBlocks) => {
    try {
        console.log("FETCHING VERSION BLOCKS");
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({ linkID: id }),
            headers: { "Content-Type": "application/json" },
        };
        const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}version/fetch-version-blocks`, requestOptions);
        const versionBlocks = await result.json();
        setVersionBlocks(versionBlocks);
    }
    catch (error) {
        console.error(error);
    }
};


export const fetchVersionBlockSourceCode = async (linkID, versionID, setSourceCode) => {
    try {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({ linkID: linkID, versionID: versionID }),
            headers: { "Content-Type": "application/json" },
        };
        const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}version/fetch-version-block-source-code`, requestOptions);
        const [sourceCode] = await result.json();


        setSourceCode(sourceCode.source_code);


    }
    catch (error) {
        console.error(error);
    }

}

export const deleteVersionBlock = async (verID) => {
    try {
        console.log(verID);

        const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}version/delete-version-block/${verID}`, { method: "DELETE" });
    }
    catch (error) {
        console.error(error);
    }

};