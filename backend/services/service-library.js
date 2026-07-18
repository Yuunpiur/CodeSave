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

        console.log(allFolders);


        return allFolders;


    }
    catch (error) {
        console.error(error);
    }
}
