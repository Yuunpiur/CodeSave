import { APIRequest } from "./client-utils";

// ! TODO: Don't fetch any data from the backend, just add a version info that's it
export const addVersionInfo = async (codeEditorSourceCode, versionName, sourceCodeInfoID, saveVersionButtonDisabled) => {
    if (saveVersionButtonDisabled) {
        return;
    }

    const options = {
        method: "POST",
        body: {
            codeEditorSourceCode: codeEditorSourceCode,
            versionName: versionName,
            sourceCodeInfoID: sourceCodeInfoID,
        },
        url: `${import.meta.env.VITE_BACKEND_URL}api/registered-user-version/add-version-info`,
    };

    const versionInfo = await APIRequest(options);
    return versionInfo;
};

export const fetchVersionsDetails = async (sourceCodeInfoID) => {
    const options = {
        method: "POST",
        body: { sourceCodeInfoID: sourceCodeInfoID },
        url: `${import.meta.env.VITE_BACKEND_URL}api/registered-user-version/fetch-versions-details`,
    };

    const savedVersionsDetails = await APIRequest(options);
    return savedVersionsDetails;
};

export const fetchVersionSourceCode = async (savedVersionInfoID) => {
    const options = {
        method: "POST",
        body: { savedVersionInfoID: savedVersionInfoID },
        url: `${import.meta.env.VITE_BACKEND_URL}api/registered-user-version/fetch-version-source-code`,
    };

    const { versionSourceCode } = await APIRequest(options);
    return versionSourceCode;
};

export const deleteVersion = async (versionToDeleteID) => {
    const options = {
        method: "DELETE",
        url: `${import.meta.env.VITE_BACKEND_URL}api/registered-user-version/delete-version/${versionToDeleteID}`,
    };

    await APIRequest(options);
    return;
};