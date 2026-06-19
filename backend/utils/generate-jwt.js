import "dotenv/config";
import jwt from "jsonwebtoken";

const generateJWT = async (email) => {
    const payload = {
        email: email,
        role: "user"
    };
    const signature = jwt.sign(payload, JWTSecret);

    return signature;
};

export default generateJWT;