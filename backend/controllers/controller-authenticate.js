import * as authenticationServices from "../services/service-authenticate.js";


export const signUpController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const accessToken = await authenticationServices.signUp(email, password);
        console.log(accessToken);
        res.json({ accessToken: accessToken });
    }
    catch (error) {
        console.error(error);
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const accessToken = await authenticationServices.login(email, password);
        res.json({ accessToken: accessToken });
    }
    catch (error) {
        console.error(error);
    }
}