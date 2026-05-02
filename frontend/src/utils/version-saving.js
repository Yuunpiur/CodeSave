export const saveVersion = async (sourceCode, versionName, linkID, saveButtonState, versionBlocks, setVersionBlocks) => {
    try {
        if (saveButtonState) { return; }

        const requestOptions = {
            method: "POST",
            body: JSON.stringify({ sourceCode: sourceCode, versionName: versionName, linkID: linkID }),
            headers: { "Content-Type": "application/json" },
        };
        const result = await fetch("http://localhost:8000/version/save-version", requestOptions);
        const [versionInfo] = await result.json();
        setVersionBlocks([...versionBlocks, versionInfo])
    }
    catch (error) {
        console.error(error);
    }
}

export const fetchVersionBlocks = async (id, setVersionBlocks) => {
    try {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({ linkID: id }),
            headers: { "Content-Type": "application/json" },
        };
        const result = await fetch("http://localhost:8000/version/fetch-version-blocks", requestOptions);
        const versionBlocks = await result.json();
        setVersionBlocks(versionBlocks);
        console.log(versionBlocks);
    }
    catch (error) {
        console.error(error);
    }
};