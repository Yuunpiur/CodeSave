import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyJWT = (req, res, next) => {
    const accessToken = req.headers.authorization.split(' ')[1];
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken || !refreshToken) {
        res.status(401).json({ message: "Unauthenticated. No token provided" });
    }


    try {
        const refreshTokenPayload = jwt.verify(refreshToken, process.env.JWT_SECRET);
        console.log(payload);
    }
    catch (error) {
        res.status(401).json({ message: "Invalid/Expired Token" });

    }


    try {
        const accessTokenPayload = jwt.verify(accessToken, process.env.JWT_SECRET);
        next(); // allow the request
    }
    catch (error) {
        // renew the access token using the refresh token


    }




};


export default verifyJWT;