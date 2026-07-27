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
            "SELECT snippet_id as id, folder_id, snippet_name as name, type, created_at as createdat FROM USER_CODE_SNIPPETS WHERE folder_id = $1",
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


export const addFolder = async (folderInfo, username) => {
    const { id, name, type } = folderInfo;
    try {
        await db.query("INSERT INTO USER_FOLDERS (folder_id, username, folder_name, type) VALUES($1, $2, $3, $4)", [id, username, name, type]);
    }
    catch (error) {
        console.error(error);
    }
}

export const addFile = async (fileInfo, username) => {

    console.log(fileInfo);
    const { id, name, type, folderID } = fileInfo;
    try {
        await db.query("INSERT INTO USER_CODE_SNIPPETS (snippet_id, snippet_name, type, folder_id, source_code, code_hash) VALUES($1, $2, $3, $4, $5, $6)", [id, name, type, folderID, "", ""]);
    }
    catch (error) {
        console.error(error);
    }
}

