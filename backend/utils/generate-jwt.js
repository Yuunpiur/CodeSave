import "dotenv/config";
import jwt from "jsonwebtoken";

const generateJWT = (username, expiry, JWTSecret) => {
    const payload = {
        username: username,
        role: "user"
    };
    const signature = jwt.sign(payload, JWTSecret, { expiresIn: expiry });

    return signature;
};

export default generateJWT;