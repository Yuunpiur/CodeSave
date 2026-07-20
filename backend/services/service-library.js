import { db } from "../config/db.js";

export const getAllFolders = async (username) => {
    try {
        const selectQueryResult = await db.query(
            "SELECT folder_id as id, folder_name as name, type, created_at as createdAt FROM USER_FOLDERS WHERE username = $1",
            [username]);


        const allFiles = selectQueryResult.rows;
        // Format all the created_at column date times
        for (let i = 0; i < allFiles.length; i++) {
            const date = allFiles[i].createdat;
            const formattedDate = new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
            }).format(date);
            allFiles[i].createdat = formattedDate;
        }
        return allFiles;


    }
    catch (error) {
        console.error(error);
    }
}

export const getFiles = async (folderID) => {

    try {
        const selectQueryResult = await db.query(
            "SELECT snippet_id as id, snippet_name as name, type, created_at as createdat FROM USER_CODE_SNIPPETS WHERE folder_id = $1",
            [folderID]);


        const allFiles = selectQueryResult.rows;
        // Format all the created_at column date times
        for (let i = 0; i < allFiles.length; i++) {
            const date = allFiles[i].createdat;
            const formattedDate = new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
            }).format(date);
            allFiles[i].createdat = formattedDate;
        }
        console.log(allFiles);
        return allFiles;


    }
    catch (error) {
        console.error(error);
    }

}
