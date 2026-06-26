import "dotenv/config";
import jwt from "jsonwebtoken";

const generateJWT = (email, expiry, JWTSecret) => {
    const payload = {
        email: email,
        role: "user"
    };
    const signature = jwt.sign(payload, JWTSecret, { expiresIn: expiry });

    return signature;
};

export default generateJWT;