import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyJWT = (req, res, next) => {
    const accessToken = req.headers.authorization.split(' ')[1];
    const refreshToken = req.cookies.refreshToken;
    console.log(accessToken, refreshToken);

    if (!accessToken || !refreshToken) {
        res.status(401).json({ message: "Unauthenticated. No token provided" });
    }


    try {
        const refreshTokenPayload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    }
    catch (error) {
        res.status(401).json({ message: "Invalid/Expired Token" }); // log out the user
    }


    try {
        const accessTokenPayload = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    }
    catch (error) {
        // renew the access token using the refresh token
    }

    // allow the request - either all tokens are valid or access token needs to be renewed
    next();




};


export default verifyJWT;