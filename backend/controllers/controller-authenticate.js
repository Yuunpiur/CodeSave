import * as authenticationServices from "../services/service-authenticate.js";


export const addUserAccountController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const statusMessage = await authenticationServices.addUserAccount(email, password);
        res.json(statusMessage);
    }
    catch (error) {
        console.error(error);
    }
}

export const checkIfUserExistController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const statusMessage = await authenticationServices.checkIfUserExist(email, password);
        res.json(statusMessage);
    }
    catch (error) {
        console.error(error);
    }
}