import express from "express";
const router = express.Router();

import * as saveCodeControllers from "../controllers/controller-anonymous-code-info.js";

router.post('/add-source-code-info', saveCodeControllers.addSourceCodeInfoController);
router.post("/fetch-source-code-info", saveCodeControllers.fetchSourceCodeInfoController);
router.put("/update-source-code-info", saveCodeControllers.updateSourceCodeInfoController);
router.post("/check-id-exist", saveCodeControllers.checkIDExistController);


export default router;