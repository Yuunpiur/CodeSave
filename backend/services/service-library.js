import { db } from "../config/db.js";

export const getAllFolders = async (username) => {
    try {
        const selectQueryResult = await db.query(
            "SELECT folder_id as id, folder_name as name, type, created_at as createdAt FROM USER_FOLDERS WHERE username = $1",
            [username]);

        const allFolders = selectQueryResult.rows;
        // Format all the created_at column date times
        for (let i = 0; i < allFolders.length; i++) {
            const date = allFolders[i].createdat;
            const formattedDate = new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
            }).format(date);
            allFolders[i].createdat = formattedDate;
        }
        return allFolders;
    }
    catch (error) {
        console.error(error);
    }
}

export const getFiles = async (folderID) => {
    try {
        const selectQueryResult = await db.query(
            "SELECT snippet_id as id, folder_id, snippet_name as name, type, updated_at as createdat FROM REGISTERED_USER_CODE_SNIPPETS WHERE folder_id = $1",
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


        return allFiles;


    }
    catch (error) {
        console.error(error);
    }
}


export const addFolder = async (folderInfo, username) => {
    const { id, name: folderName } = folderInfo;
    try {
        await db.query("INSERT INTO USER_FOLDERS (folder_id, username, folder_name) VALUES($1, $2, $3)", [id, username, folderName]);
    }
    catch (error) {
        console.error(error);
    }
}

export const addFile = async (fileInfo, username) => {


    const { id, name, folderID, language } = fileInfo;
    try {
        await db.query("INSERT INTO REGISTERED_USER_CODE_SNIPPETS (snippet_id, snippet_name, folder_id, source_code, code_hash, programming_language) VALUES($1, $2, $3, $4, $5, $6)", [id, name, folderID, "", "", language]);
    }
    catch (error) {
        console.error(error);
    }
}


export const deleteFile = async (fileID) => {
    await db.query("DELETE FROM REGISTERED_USER_CODE_SNIPPETS WHERE snippet_id = $1", [fileID]);
};

export const deleteFolder = async (folderID) => {
    await db.query("DELETE FROM REGISTERED_USER_CODE_SNIPPETS WHERE folder_id = $1", [folderID]);
    await db.query("DELETE FROM USER_FOLDERS WHERE folder_id = $1", [folderID]);
};



