import { RegisteredUserAPIRequest } from "./client-utils";

export const getAllFolders = async () => {
    const options = {
        method: "GET",
        url: `${import.meta.env.VITE_BACKEND_URL}api/library/get-all-folders`
    }
    const parsedfetchData = await RegisteredUserAPIRequest(options);
    return parsedfetchData.allFolders;
};

export const getFiles = async (folderID) => {
    const options = {
        method: "GET",
        url: `${import.meta.env.VITE_BACKEND_URL}api/library/get-all-files/${folderID}`
    }
    const parsedfetchData = await RegisteredUserAPIRequest(options);
    return parsedfetchData.allFiles;
};


export const addFolder = async (folderInfo) => {
    const options = {
        method: "POST",
        body: { folderInfo: folderInfo },
        url: `${import.meta.env.VITE_BACKEND_URL}api/library/add-folder`
    }
    const fetchData = await RegisteredUserAPIRequest(options);
    return;
};



export const addFile = async (fileInfo) => {
    const options = {
        method: "POST",
        body: { fileInfo: fileInfo },
        url: `${import.meta.env.VITE_BACKEND_URL}api/library/add-file`
    };
    await RegisteredUserAPIRequest(options);
    return;
};

export const deleteFile = async (snippetID) => {
    const options = {
        method: "DELETE",
        body: { snippetID: snippetID },
        url: `${import.meta.env.VITE_BACKEND_URL}api/library/delete-file`
    }
    await RegisteredUserAPIRequest(options);
    return;
};


export const deleteFolder = async (folderID) => {
    const options = {
        method: "DELETE",
        body: { folderID: folderID },
        url: `${import.meta.env.VITE_BACKEND_URL}api/library/delete-folder`
    };
    await RegisteredUserAPIRequest(options);
    return;
};