export const getAllFolders = async (accessToken, updateAccessToken) => {
    try {
        const requestOptions = {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        };


        const fetchResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}api/library/get-all-folders`,
            requestOptions
        );

        const fetchData = await fetchResponse.json();

        if (fetchData.newAccessToken) {
            updateAccessToken((fetchData.newAccessToken));
        }

        return fetchData.allFolders;
    }
    catch (error) {
        console.error(error);
    }
};


export const getFiles = async (accessToken, updateAccessToken, folderID) => {
    try {
        const requestOptions = {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        };


        const fetchResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}api/library/get-all-files/${folderID}`,
            requestOptions
        );


        const fetchData = await fetchResponse.json();

        if (fetchData.newAccessToken) {
            updateAccessToken(fetchData.newAccessToken);
        }


        console.log(fetchData.allFiles);

        return fetchData.allFiles;
    }
    catch (error) {
        console.error("thizzy", error);
    }
};



export const addFolder = async (accessToken, updateAccessToken, folderInfo) => {
    try {
        const requestOptions = {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                folderInfo: folderInfo
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        };

        const fetchResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}api/library/add-folder`,
            requestOptions
        );

        const fetchData = await fetchResponse.json();

        if (fetchData.newAccessToken) {
            updateAccessToken(fetchData.newAccessToken);
        }

        return;
    }
    catch (error) {
        console.error(error);
    }
};



export const addFile = async (accessToken, updateAccessToken, fileInfo) => {
    try {
        const requestOptions = {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                fileInfo: fileInfo
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        };

        const fetchResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}api/library/add-file`,
            requestOptions
        );

        const fetchData = await fetchResponse.json();

        if (fetchData.newAccessToken) {
            updateAccessToken(fetchData.newAccessToken);
        }

        return;
    }
    catch (error) {
        console.error(error);
    }
};

export const deleteFile = async (accessToken, updateAccessToken, snippetID) => {
    try {
        const requestOptions = {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify({
                snippetID: snippetID
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        };

        const fetchResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}api/library/delete-file`,
            requestOptions
        );


        const fetchData = await fetchResponse.json();

        if (fetchData.newAccessToken) {
            updateAccessToken(fetchData.newAccessToken);
        }

        return;
    }
    catch (error) {
        console.error(error);
    }
};


export const deleteFolder = async (accessToken, updateAccessToken, folderID) => {
    try {
        const requestOptions = {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify({
                folderID: folderID
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        };

        const fetchResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}api/library/delete-folder`,
            requestOptions
        );


        const fetchData = await fetchResponse.json();

        if (fetchData.newAccessToken) {
            updateAccessToken(fetchData.newAccessToken);
        }

        return;
    }
    catch (error) {
        console.error(error);
    }
};