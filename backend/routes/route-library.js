import express from "express";
const router = express.Router();

import * as libraryControllers from "../controllers/controller-library.js";

router.get('/get-all-folders', libraryControllers.getAllFoldersController);
router.get('/get-all-files/:folderID', libraryControllers.getFilesController);

export default router;
