import { db } from "../config/db.js";

export const getAllFolders = async (username = "hia") => {
    try {
        const selectQueryResult = await db.query(
            "SELECT folder_id, folder_name, created_at FROM USER_FOLDERS WHERE username = $1",
            [username]);


        const allFolders = selectQueryResult.rows;
        // Format all the created_at column date times
        for (let i = 0; i < allFolders.length; i++) {
            const date = allFolders[i].created_at;
            const formattedDate = new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
            }).format(date);
            allFolders[i].created_at = formattedDate;
        }

        console.log(allFolders);

        return allFolders;


    }
    catch (error) {
        console.error(error);
    }
}
