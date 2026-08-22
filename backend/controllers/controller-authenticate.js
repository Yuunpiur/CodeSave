import * as authenticationServices from "../services/service-authenticate.js";


export const signUpController = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { accessToken, refreshToken } = await authenticationServices.signUp(username, password);
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "lax" }).json({ accessToken: accessToken }); /* set sameSite to strict on prod */
    }
    catch (error) {
        console.error(error);
    }
}

export const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { accessToken, refreshToken } = await authenticationServices.login(username, password);
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "lax" }).json({ accessToken: accessToken }); /* set sameSite to strict on prod */
    }
    catch (error) {
        console.error(error);
    }
}