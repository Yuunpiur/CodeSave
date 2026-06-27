import jwt from "jsonwebtoken";
import "dotenv/config";
import generateJWT from "../utils/generate-jwt.js";

const verifyJWT = (req, res, next) => {
    console.log(res.json.toString());

    // verify the refresh token
    let refreshTokenPayload = "";
    try {
        const refreshToken = req.cookies.refreshToken;
        refreshTokenPayload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        console.log("access token is valid");
    }
    catch (error) {
        res.status(401).json({ message: "Invalid/Expired Token" }); // log out the user
        return;
    }

    // verify the access token
    const accessToken = req.headers.authorization.split(' ')[1];
    console.log("access token: ", accessToken);
    try {
        const accessTokenPayload = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        console.log("access token is valid");
    }
    catch (error) {
        // renew the access token
        console.log("invalid access token");
        const { email } = refreshTokenPayload;
        const newAccessToken = generateJWT(email, "15m", process.env.JWT_ACCESS_SECRET);
        res.locals.newAccessToken = newAccessToken;
    }
    // allow the request -> either all tokens are valid or access token needs to be renewed or undefined (refreshing the browser)
    next();
};

export default verifyJWT;