import * as libraryServices from "../services/service-library.js";


export const getAllFoldersController = async (req, res) => {
    try {
        const { username } = req.body;
        const allFolders = await libraryServices.getAllFolders(username);
        return allFolders;
    }
    catch (error) {
        console.error(error);
    }
}
