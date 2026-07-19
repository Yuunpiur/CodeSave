import * as libraryServices from "../services/service-library.js";
import getUsername from "../utils/get-username.js";

export const getAllFoldersController = async (req, res) => {
    try {
        const username = getUsername(req.cookies.refreshToken);
        console.log(username);
        const allFolders = await libraryServices.getAllFolders(username);

        res.json(allFolders, "allFolders");
    }
    catch (error) {
        console.error(error);
    }
}
