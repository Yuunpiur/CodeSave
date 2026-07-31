import express from "express";
const router = express.Router();

import * as libraryControllers from "../controllers/controller-library.js";

router.get('/get-all-folders', libraryControllers.getAllFoldersController);
router.get('/get-all-files/:folderID', libraryControllers.getFilesController);
router.post('/add-folder', libraryControllers.addFolderController);
router.post('/add-file', libraryControllers.addFileController);

export default router;
