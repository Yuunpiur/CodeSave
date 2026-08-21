import { AnonymousUserAPIRequest } from "./client-utils";

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
        url: `${import.meta.env.VITE_BACKEND_URL}api/anonymous-user-version/add-version-info`,
    };

    const versionInfo = await AnonymousUserAPIRequest(options);
    return versionInfo;
};

export const fetchVersionsDetails = async (sourceCodeInfoID) => {
    const options = {
        method: "POST",
        body: { sourceCodeInfoID: sourceCodeInfoID },
        url: `${import.meta.env.VITE_BACKEND_URL}api/anonymous-user-version/fetch-versions-details`,
    };

    const savedVersionsDetails = await AnonymousUserAPIRequest(options);
    return savedVersionsDetails;
};

export const fetchVersionSourceCode = async (savedVersionInfoID) => {
    const options = {
        method: "POST",
        body: { savedVersionInfoID: savedVersionInfoID },
        url: `${import.meta.env.VITE_BACKEND_URL}api/anonymous-user-version/fetch-version-source-code`,
    };

    const { versionSourceCode } = await AnonymousUserAPIRequest(options);
    return versionSourceCode;
};

export const deleteVersion = async (versionToDeleteID) => {
    const options = {
        method: "DELETE",
        url: `${import.meta.env.VITE_BACKEND_URL}api/anonymous-user-version/delete-version/${versionToDeleteID}`,
    };

    await AnonymousUserAPIRequest(options);
    return;
};