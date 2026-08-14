export const addSourceCodeInfo = async (codeEditorSourceCode, programmingLanguage) => {
    try {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
                codeEditorSourceCode: codeEditorSourceCode,
                programmingLanguage: programmingLanguage,
            }),
            headers: { "Content-Type": "application/json" },
        };

        const fetchResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}api/registered-user-code/add-source-code-info`,
            requestOptions,
        );

        const { sourceCodeInfoID } = await fetchResponse.json();
        return sourceCodeInfoID;
    } catch (error) {
        console.error(error);
    }
};

// !
export const fetchSourceCodeInfo = async (sourceCodeInfoID) => {
    try {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({ sourceCodeInfoID: sourceCodeInfoID }),
            headers: { "Content-Type": "application/json" },
        };
        const fetchResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}api/registered-user-code/fetch-source-code-info`,
            requestOptions,
        );
        const sourceCodeInfo = await fetchResponse.json();
        return sourceCodeInfo;


    } catch (error) {
        console.error(error);
    }
};

// !
export const updateSourceCodeInfo = async (codeEditorSourceCode, sourceCodeInfoID) => {
    try {
        const requestOptions = {
            method: "PUT",
            body: JSON.stringify({ codeEditorSourceCode: codeEditorSourceCode, sourceCodeInfoID: sourceCodeInfoID }),
            headers: { "Content-Type": "application/json" },
        };
        await fetch(`${import.meta.env.VITE_BACKEND_URL}api/registered-user-code/update-source-code-info`, requestOptions);
    } catch (error) {
        console.error(error);
    }
};


export const sourceCodeInfoIDExist = async (sourceCodeInfoID) => {
    try {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({ sourceCodeInfoID: sourceCodeInfoID }),
            headers: { "Content-Type": "application/json" },
        };

        const fetchResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}api/registered-user-code/check-id-exist`,
            requestOptions,
        );
        const { IDExist } = await fetchResponse.json();
        return IDExist;
    }
    catch (error) {
        console.error(error);
    }
}






