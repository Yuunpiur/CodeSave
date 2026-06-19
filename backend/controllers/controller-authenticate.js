import * as authenticationServices from "../services/service-authenticate.js";


export const signUpController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const JWT = await authenticationServices.signUp(email, password);
        console.log(JWT);
        res.json({ JWT: JWT });
    }
    catch (error) {
        console.error(error);
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const JWT = await authenticationServices.login(email, password);
        res.json({ JWT: JWT });
    }
    catch (error) {
        console.error(error);
    }
}