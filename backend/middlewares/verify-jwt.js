import jwt from "jsonwebtoken";
import "dotenv/config";
import generateJWT from "../utils/generate-jwt.js";

const verifyJWT = (req, res, next) => {

    // verify the refresh token
    let refreshTokenPayload = "";
    try {
        const refreshToken = req.cookies.refreshToken;

        refreshTokenPayload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid/Expired Token" }); // log out the user
        return;
    }

    // verify the access token
    const accessToken = req.headers.authorization.split(' ')[1];
    try {
        const accessTokenPayload = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    }
    catch (error) {
        // renew the access token
        const { username } = refreshTokenPayload;
        const newAccessToken = generateJWT(username, "15m", process.env.JWT_ACCESS_SECRET);
        res.locals.newAccessToken = newAccessToken;
    }
    // allow the request -> either all tokens are valid or access token needs to be renewed
    next();
};

export default verifyJWT;