import { hashPassword, generateUUID } from "../utils/crypto-utils.js";
import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import generateJWT from "../utils/generate-jwt.js";

export const signUp = async (username, password) => {
    try {
        /* Check if the username already exists */
        const selectQueryResult = await db.query("SELECT username FROM USER_INFO WHERE username = $1", [username]);
        const usernameExist = selectQueryResult.rows[0];

        if (!usernameExist) {
            /* Add the users credentials to the db */
            const userID = generateUUID();
            const hashedPassword = await hashPassword(password);
            const lowerCaseUsername = username.toLowerCase();
            const insertQueryResult = await db.query("INSERT INTO USER_INFO (user_id, username, password) VALUES($1, $2, $3)", [userID, lowerCaseUsername, hashedPassword]);

            const accessToken = generateJWT(username, "15m", process.env.JWT_ACCESS_SECRET);
            const refreshToken = generateJWT(username, "7d", process.env.JWT_REFRESH_SECRET);
            return { accessToken: accessToken, refreshToken: refreshToken };
        }
        else {
            return { JWT: undefined };
        }
    }
    catch (error) {
        console.error("service", error);
    }
};


export const login = async (username, plainTextPassword) => {
    try {
        const selectQueryResult = await db.query("SELECT username, password AS hashedPassword FROM USER_INFO WHERE username = $1", [username]);
        const usernameExist = selectQueryResult.rows[0];

        if (!usernameExist) {
            return { JWT: undefined }; // USERNAME IS INCORRECT OR DOESN'T EXIST
        }

        const hashedPassword = selectQueryResult.rows[0].hashedpassword;
        const passwordMatch = await bcrypt.compare(plainTextPassword, hashedPassword);

        if (passwordMatch) {
            const accessToken = generateJWT(username, "15m", process.env.JWT_ACCESS_SECRET);
            const refreshToken = generateJWT(username, "7d", process.env.JWT_REFRESH_SECRET);
            return { accessToken: accessToken, refreshToken: refreshToken };  // LOG IN THE USER
        }
        else {
            return { JWT: undefined }; // PASSWORD DOESN'T MATCH
        }

    }
    catch (error) {
        console.error("service", error);
    }

};
