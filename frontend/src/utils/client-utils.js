import { create } from "zustand";

// ! UPDATE PROGRAMMING LANGAUGE
export const sendDataToCallBackUseStateVariable = (programmingLanguage, setProgrammingLanguage) => {
    setProgrammingLanguage(programmingLanguage.toLowerCase());
};

// ! DEBOUNCE
export const debounceBlock = (delay) => {
    let timerID;
    return (value, setSourceCode) => {
        clearTimeout(timerID);
        timerID = setTimeout(() => {
            setSourceCode(value);
        }, delay);
    };
};

// ! SAVING LINK TO CLIPBOARD
export const copyLink = async (copyIconPressed, setCopyIconPressed, codeURL) => {
    if (!copyIconPressed && codeURL != `${import.meta.env.VITE_FRONTEND_URL}`) {
        const copyIcon = document.querySelector(".copy-icon");
        const checkIcon = document.querySelector(".check-icon");


        setTimeout(() => {
            setCopyIconPressed(false); // make the button pressable again
            copyIcon.classList.remove("hidden");
            checkIcon.classList.toggle("hidden");
        }, 1500);

        setCopyIconPressed(true); // prevents from clicking the button again ang again
        copyIcon.classList.toggle("hidden");
        checkIcon.classList.remove("hidden");

        // put the link to clipbaord
        const data = {
            "text/plain": codeURL,
        };

        const clipboardItem = new ClipboardItem(data);
        await navigator.clipboard.write([clipboardItem]);
    }
};

// ! DEBOUNCE
export const toggleSaveVersionButton = (codeEditorSourceCode, setSaveVersionButtonDisabled, codeEditorReadOnly, sourceCodeInfoID) => {
    const IS_EMPTY = "";
    if (codeEditorSourceCode == IS_EMPTY || codeEditorReadOnly || sourceCodeInfoID == IS_EMPTY) {
        setSaveVersionButtonDisabled(true); // disable the button if the editory is empty
    } else {
        setSaveVersionButtonDisabled(false);
    }
};

export const disableButtonForTenSeconds = (setSaveVersionButtonDisabled) => {
    setSaveVersionButtonDisabled(true); /*  save version button is disabled */
    setTimeout(() => {
        setSaveVersionButtonDisabled(false);
    }, 10000)
};


export const filterFolders = (items) => {
    const allFolders = [];

    for (let i = 0; i < items.length; i++) {
        if (items[i].type == "folder") {
            allFolders.push(items[i]);
        }

    }

    return allFolders;

};


// ! ZUSTAND 
export const useAccessToken = create((set) => ({
    accessToken: "",
    updateAccessToken: (accessToken) => set({ accessToken: accessToken }),
}));


// ! REUSABLE FUNCTION FOR FETCH AND ASSIGNING A NEW ACCESS TOKEN
export const RegisteredUserAPIRequest = async ({ method, body, url }) => {
    try {
        console.log(url);
        const accessToken = useAccessToken.getState().accessToken;
        const requestOptions = {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        };

        if (method) {
            requestOptions.method = method;
        }
        else {
            throw new Error("method is undefined");
        }

        if (body) {
            requestOptions.body = JSON.stringify(body);
        }
        if (!url) {
            throw new Error("url is undefined");
        }

        const fetchData = await fetch(url, requestOptions);
        const parsedFetchData = fetchData.json();

        if (parsedFetchData.newAccessToken) {
            useAccessToken.getState().updateAccessToken(fetchData.newAccessToken);
        }


        return parsedFetchData;
    }
    catch (error) {
        console.error(error);
    }
};


export const AnonymousUserAPIRequest = async ({ method, body, url }) => {
    try {

        const requestOptions = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        if (method) {
            requestOptions.method = method;
        }
        else {
            throw new Error("method is undefined");
        }

        if (body) {
            requestOptions.body = JSON.stringify(body);
        }
        if (!url) {
            throw new Error("url is undefined");
        }

        const fetchData = await fetch(url, requestOptions);
        const parsedFetchData = fetchData.json();

        return parsedFetchData;
    }
    catch (error) {
        console.error(error);
    }
};

