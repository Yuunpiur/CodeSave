import { hashPassword } from "../utils/crypto-utils.js";


export const addUserAccount = async (email, password) => {
    try {

        const hashedPassword = await hashPassword(password);
        console.log(email);
        console.log(password);
        console.log(hashedPassword);


        return;

    }
    catch (error) {
        console.error(error);
    }
};