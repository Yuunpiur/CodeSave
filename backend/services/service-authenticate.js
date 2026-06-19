import { hashPassword, generateUUID } from "../utils/crypto-utils.js";
import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import generateJWT from "../utils/generate-jwt.js";

export const addUserAccount = async (email, password) => {

    try {
        /* Check if the email already exists */
        const selectQueryResult = await db.query("SELECT email FROM USER_INFO WHERE email = $1", [email]);
        const emailExist = selectQueryResult.rows[0];

        if (!emailExist) {
            /* Add the users credentials to the db */
            const userID = generateUUID();
            const hashedPassword = await hashPassword(password);
            const lowerCaseEmail = email.toLowerCase();
            const insertQueryResult = await db.query("INSERT INTO USER_INFO (user_id, email, password) VALUES($1, $2, $3)", [userID, lowerCaseEmail, hashedPassword]);
            generateJWT(email);

            return { userAdded: true };
        }

        else {
            return { userAdded: false };
        }

    }
    catch (error) {
        console.error("service", error);
    }
};



export const checkIfUserExist = async (email, plainTextPassword) => {

    try {
        const selectQueryResult = await db.query("SELECT email, password AS hashedPassword FROM USER_INFO WHERE email = $1", [email]);
        const emailExist = selectQueryResult.rows[0];

        if (!emailExist) {
            return { userExist: false }; // PROMPT AND ERROR MESSAGE, EMAIL IS INCORRECT OR DOESN'T EXIST
        }

        const hashedPassword = selectQueryResult.rows[0].hashedpassword;
        const passwordMatch = await bcrypt.compare(plainTextPassword, hashedPassword);

        if (passwordMatch) {
            return { userExist: true };  // LOG IN
        }
        else {
            return { userExist: false }; // PROMPT AND ERROR MESSAGE, PASSWORD DOESN'T MATCH
        }

    }
    catch (error) {
        console.error("service", error);
    }

};

/* generateJWT(); */