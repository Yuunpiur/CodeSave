import { createHash } from "crypto";
import bcrypt from "bcrypt";

export const hashSourceCode = (sourceCode) => createHash("sha256").update(sourceCode).digest("hex");
export const hashPassword = async (password) => {
    const saltRounds = 12;


    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;


};

