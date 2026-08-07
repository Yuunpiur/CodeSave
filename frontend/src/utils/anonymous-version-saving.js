export const addVersionInfo = async (codeEditorSourceCode, versionName, sourceCodeInfoID, saveVersionButtonDisabled) => {
    try {
        if (saveVersionButtonDisabled) { return; }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({ codeEditorSourceCode: codeEditorSourceCode, versionName: versionName, sourceCodeInfoID: sourceCodeInfoID }),
            headers: { "Content-Type": "application/json" },
        };

        const fetchResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/anonymous-user-version/add-version-info`, requestOptions);
        console.log(fetchResponse.status);
        const versionInfo = await fetchResponse.json();

        return versionInfo;
    }
    catch (error) {
        console.error(error);
    }
}

export const fetchVersionsDetails = async (sourceCodeInfoID) => {
    try {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({ sourceCodeInfoID: sourceCodeInfoID }),
            headers: { "Content-Type": "application/json" },
        };
        const fetchResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/anonymous-user-version/fetch-versions-details`, requestOptions);
        const savedVersionsDetails = await fetchResponse.json();

        return savedVersionsDetails;
    }
    catch (error) {
        console.error(error);
    }
};


export const fetchVersionSourceCode = async (savedVersionInfoID) => {
    try {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({ savedVersionInfoID: savedVersionInfoID }),
            headers: { "Content-Type": "application/json" },
        };
        const fetchResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/anonymous-user-version/fetch-version-source-code`, requestOptions);
        const { versionSourceCode } = await fetchResponse.json();

        return versionSourceCode;
    }
    catch (error) {
        console.error(error);
    }
}

export const deleteVersion = async (versionToDeleteID) => {
    try {
        const fetchResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/anonymous-user-version/delete-version/${versionToDeleteID}`, { method: "DELETE" });
    }
    catch (error) {
        console.error(error);
    }
};