import "dotenv/config";
import jwt from "jsonwebtoken";

const generateJWT = (email, exp) => {
    const payload = {
        email: email,
        role: "user"
    };
    const JWTSecret = process.env.JWT_SECRET;
    const signature = jwt.sign(payload, JWTSecret, { expiresIn: exp });

    return signature;
};

export default generateJWT;