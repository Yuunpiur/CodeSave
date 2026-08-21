import { AnonymousUserAPIRequest } from "./client-utils";

export const addSourceCodeInfo = async (codeEditorSourceCode, programmingLanguage) => {
    const options = {
        method: "POST",
        body: {
            codeEditorSourceCode: codeEditorSourceCode,
            programmingLanguage: programmingLanguage,
        },
        url: `${import.meta.env.VITE_BACKEND_URL}api/anonymous-user-code/add-source-code-info`,
    };

    const { sourceCodeInfoID } = await AnonymousUserAPIRequest(options);
    return sourceCodeInfoID;
};

export const fetchSourceCodeInfo = async (sourceCodeInfoID) => {
    const options = {
        method: "POST",
        body: { sourceCodeInfoID: sourceCodeInfoID },
        url: `${import.meta.env.VITE_BACKEND_URL}api/anonymous-user-code/fetch-source-code-info`,
    };

    const sourceCodeInfo = await AnonymousUserAPIRequest(options);
    return sourceCodeInfo;
};

export const updateSourceCodeInfo = async (codeEditorSourceCode, sourceCodeInfoID) => {
    const options = {
        method: "PUT",
        body: {
            codeEditorSourceCode: codeEditorSourceCode,
            sourceCodeInfoID: sourceCodeInfoID,
        },
        url: `${import.meta.env.VITE_BACKEND_URL}api/anonymous-user-code/update-source-code-info`,
    };

    await AnonymousUserAPIRequest(options);
    return;
};

export const sourceCodeInfoIDExist = async (sourceCodeInfoID) => {
    const options = {
        method: "POST",
        body: { sourceCodeInfoID: sourceCodeInfoID },
        url: `${import.meta.env.VITE_BACKEND_URL}api/anonymous-user-code/check-id-exist`,
    };

    const { IDExist } = await AnonymousUserAPIRequest(options);
    return IDExist;
};






