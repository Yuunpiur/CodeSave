import { hashPassword, generateUUID } from "../utils/crypto-utils.js";
import { db } from "../config/db.js";

export const addUserAccount = async (email, password) => {

    try {
        const userID = generateUUID();
        const hashedPassword = await hashPassword(password);
        const insertQueryResult = await db.query("INSERT INTO USER_INFO (user_id, email, password) VALUES($1, $2, $3)", [userID, email, hashedPassword]);


        return;

    }
    catch (error) {
        console.error("service", error);
    }
};

