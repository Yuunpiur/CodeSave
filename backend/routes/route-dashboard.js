import express from "express";
const router = express.Router();

import * as dashboardControllers from "../controllers/controller-dashboard.js";

router.post('/load-all-data', dashboardControllers.loadAllDataController);

export default router;
