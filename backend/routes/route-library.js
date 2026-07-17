import express from "express";
const router = express.Router();

import * as dashboardControllers from "../controllers/controller-library.js";

router.post('/get-all-folders', dashboardControllers.getAllFoldersController);

export default router;
