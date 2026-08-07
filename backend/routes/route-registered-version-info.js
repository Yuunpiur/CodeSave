import * as saveVersionControllers from "../controllers/controller-registered-version-info.js";
import express from "express";
const router = express.Router();

router.post("/add-version-info", saveVersionControllers.addVersionInfoController);
router.post(("/fetch-versions-details"), saveVersionControllers.fetchVersionsDetailsController);
router.post("/fetch-version-source-code", saveVersionControllers.fetchVersionSourceCodeController)
router.delete("/delete-version/:id", saveVersionControllers.deleteVersionController);

export default router;



