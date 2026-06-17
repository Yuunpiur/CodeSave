import express from "express";
import * as authenticationControllers from "../controllers/controller-authenticate.js"
const router = express.Router();


router.post("/add-user-account", authenticationControllers.addUserAccountController)
router.post("/check-if-user-exist", authenticationControllers.checkIfUserExistController)


export default router;