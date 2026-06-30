import { db } from "../config/db.js";

export const loadAllData = async (userID) => {
    try {
        // TODO: Add your database query logic here
        // Example: Query all user data from multiple tables and return combined result
        
        const selectQueryResult = await db.query(
            "SELECT * FROM USER_SOURCECODE_INFO WHERE user_id = $1", 
            [userID]
        );

        return selectQueryResult.rows;
    }
    catch (error) {
        console.error(error);
    }
}
