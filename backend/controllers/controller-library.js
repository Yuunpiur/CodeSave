import * as libraryServices from "../services/service-library.js";
import getUsername from "../utils/get-username.js";

export const getAllFoldersController = async (req, res) => {
    try {
        const username = getUsername(req.cookies.refreshToken);
        console.log(username);
        const allFolders = await libraryServices.getAllFolders(username);

        res.json({ body: allFolders, dataName: "allFolders" });
    }
    catch (error) {
        console.error(error);
    }
}

export const getFilesController = async (req, res) => {
    try {
        const { folderID } = req.params;
        const folderFiles = await libraryServices.getFiles(folderID);

        res.json({ body: folderFiles, dataName: "allFiles" });
    }
    catch (error) {
        console.error(error);
    }
}

export const addFolderController = async (req, res) => {
    try {
        const { folderInfo } = req.body;
        const username = getUsername(req.cookies.refreshToken);
        await libraryServices.addFolder(folderInfo, username);


        res.json({ message: "folder added successfully!" });
    }
    catch (error) {
        console.error(error);
    }
}

export const addFileController = async (req, res) => {
    try {
        const { fileInfo } = req.body;
        const username = getUsername(req.cookies.refreshToken);
        await libraryServices.addFile(fileInfo, username);

        res.json({ message: "file added successfully!" });
    }
    catch (error) {
        console.error(error);
    }
}

export const deleteFileController = async (req, res) => {
    try {
        const { snippetID } = req.body;
        await libraryServices.deleteFile(snippetID);

        res.json({ message: "file deleted successfully!" });
    }
    catch (error) {
        console.error(error);
    }
}

export const deleteFolderController = async (req, res) => {
    try {
        const { folderID } = req.body;
        await libraryServices.deleteFolder(folderID);

        res.json({ message: "folder deleted successfully!" });
    }
    catch (error) {
        console.error(error);
    }
}
