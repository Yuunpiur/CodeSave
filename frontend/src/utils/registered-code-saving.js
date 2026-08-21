import { RegisteredUserAPIRequest } from "./client-utils";

export const addSourceCodeInfo = async (codeEditorSourceCode, programmingLanguage) => {
    const options = {
        method: "POST",
        body: {
            codeEditorSourceCode: codeEditorSourceCode,
            programmingLanguage: programmingLanguage,
        },
        url: `${import.meta.env.VITE_BACKEND_URL}api/registered-user-code/add-source-code-info`,
    };

    const { sourceCodeInfoID } = await RegisteredUserAPIRequest(options);
    return sourceCodeInfoID;
};

export const fetchSourceCodeInfo = async (sourceCodeInfoID) => {
    const options = {
        method: "POST",
        body: { sourceCodeInfoID: sourceCodeInfoID },
        url: `${import.meta.env.VITE_BACKEND_URL}api/registered-user-code/fetch-source-code-info`,
    };

    const sourceCodeInfo = await RegisteredUserAPIRequest(options);
    return sourceCodeInfo;
};

export const updateSourceCodeInfo = async (codeEditorSourceCode, sourceCodeInfoID) => {
    const options = {
        method: "PUT",
        body: {
            codeEditorSourceCode: codeEditorSourceCode,
            sourceCodeInfoID: sourceCodeInfoID,
        },
        url: `${import.meta.env.VITE_BACKEND_URL}api/registered-user-code/update-source-code-info`,
    };

    await RegisteredUserAPIRequest(options);
    return;
};

export const sourceCodeInfoIDExist = async (sourceCodeInfoID) => {
    const options = {
        method: "POST",
        body: { sourceCodeInfoID: sourceCodeInfoID },
        url: `${import.meta.env.VITE_BACKEND_URL}api/registered-user-code/check-id-exist`,
    };

    const { IDExist } = await RegisteredUserAPIRequest(options);
    return IDExist;
};






