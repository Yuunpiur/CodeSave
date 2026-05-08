// ! UPDATE PROGRAMMING LANGAUGE
export const sendDataToCallBackUseStateVariable = (programmingLanguage, setProgrammingLanguage) => {
    setProgrammingLanguage(programmingLanguage.toLowerCase());
};

// ! DEBOUNCE
export const debounceBlock = (delay) => {
    let timerID;
    return (value, setSourceCode, setCodeIsSaved) => {
        clearTimeout(timerID);
        timerID = setTimeout(() => {
            setSourceCode(value);
            setCodeIsSaved(true);
        }, delay);
    };
};

// ! SAVING LINK TO CLIPBOARD
export const copyLink = async (copyIconPressed, setCopyIconPressed, codeURL) => {
    if (!copyIconPressed && codeURL != `${import.meta.env.VITE_FRONTEND_URL}`) {
        const copyIcon = document.querySelector(".copy-icon");
        const checkIcon = document.querySelector(".check-icon");

        /* 
                // Reset the button after 3 secs
                setTimeout(() => {
                    setCopyIconPressed(false); // make the button pressable again
                    copyIcon.classList.remove("hidden");
                    checkIcon.classList.toggle("hidden");
                }, 3000); */

        setCopyIconPressed(true); // prevents from clicking the button again ang again
        copyIcon.classList.toggle("hidden");
        checkIcon.classList.remove("hidden");

        console.log(codeURL);

        // put the link to clipbaord
        const data = {
            "text/plain": codeURL,
        };

        const clipboardItem = new ClipboardItem(data);
        await navigator.clipboard.write([clipboardItem]);
    }
};

// ! DEBOUNCE
export const checkSourceCode = (sourceCode, setSaveButtonState, savingLimitReached, linkID) => {
    const IS_EMPTY = "";
    if (sourceCode == IS_EMPTY || savingLimitReached || linkID == IS_EMPTY) {
        console.log("TRUE");
        setSaveButtonState(true); // disable the button if the editory is empty
    } else {
        setSaveButtonState(false);
    }
};


export const disableButtonForTenSeconds = (setSaveButtonState, setSavingLimitReached) => {
    setSavingLimitReached(true)
    setSaveButtonState(true);
    setTimeout(() => {
        setSavingLimitReached(false);
        setSaveButtonState(false);
    }, 10000)
};


