

// !
export const createNewCodeInfo = async (setLinkID, sourceCode, programmingLanguage) => {
    try {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
                sourceCode: sourceCode,
                programmingLanguage: programmingLanguage,
            }),
            headers: { "Content-Type": "application/json" },
        };

        const result = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}code/create-code-info`,
            requestOptions,
        );

        const { linkID } = await result.json();
        setLinkID(linkID);
    } catch (error) {
        console.error(error);
    }
};

// !
export const fetchSourceCodeInfo = async (id, setSourceCode, setProgrammingLanguage, setLiveSourceCode) => {
    try {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({ id: id }),
            headers: { "Content-Type": "application/json" },
        };
        const data = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}code/fetch-source-code`,
            requestOptions,
        );
        const sourceCodeInfo = await data.json();
        setLiveSourceCode(sourceCodeInfo.sourceCode);
        setSourceCode(sourceCodeInfo.sourceCode);
        setProgrammingLanguage(sourceCodeInfo.programmingLanguage);
    } catch (error) {
        console.error(error);
    }
};

// !
export const updateSourceCodeInfo = async (sourceCode, id) => {
    try {
        const requestOptions = {
            method: "PUT",
            body: JSON.stringify({ sourceCode: sourceCode, linkID: id }),
            headers: { "Content-Type": "application/json" },
        };
        await fetch(`${import.meta.env.VITE_BACKEND_URL}code/update-source-code`, requestOptions);
    } catch (error) {
        console.error(error);
    }
};


export const checkIfIDExists = async (id) => {
    try {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({ id: id }),
            headers: { "Content-Type": "application/json" },
        };

        const data = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}code/check-id-exist`,
            requestOptions,
        );
        const IDExist = await data.json();
        return IDExist.linkIDExist;
    }
    catch (error) {

        console.error(error);

    }
}






