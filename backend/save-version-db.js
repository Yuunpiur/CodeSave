import express from "express";
import { hash_code } from "./utils/backend-utils.js";
import { db } from "./server.js";
import { version } from "react";
import { nanoid } from "nanoid";


const router = express.Router();


router.post(("/save-version"), async (req, res) => {
    const { sourceCode, versionName, linkID } = req.body;
    // ! versionname, source code, linkID, ver_hash 
    // send the data to the backend
    // hash the code
    const hashedCode = hash_code(sourceCode);
    // compare hashes if it already exist
    const [versionHash] = await db.query("SELECT ver_hash FROM USER_CODE_VERSIONS_INFO WHERE ? = link_id AND ? = ver_hash", [linkID, hashedCode]);

    if (versionHash.length === 0) {


        const ver_id = nanoid(8);

        // query db by saving version block
        const [savingVersionInfoResult] = await db.query("INSERT INTO USER_CODE_VERSIONS_INFO(ver_id, link_id, source_code, ver_hash, ver_name) VALUES(?, ?, ?, ?, ?)", [ver_id, linkID, sourceCode, hashedCode, versionName]);

        // receive the data from db
        // query db to get all version info about linkID
        const [versionInfo] = await db.query("SELECT ver_name, ver_id, created_at FROM USER_CODE_VERSIONS_INFO WHERE ? = ver_id", [ver_id]);
        const date = versionInfo[0].created_at;
        const formattedDate = new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(date);
        versionInfo[0].created_at = formattedDate;

        // send it back to front end
        // send version info to front end

        res.json(versionInfo);
        return;
    }

    res.json({ message: "working" });
});

router.post(("/fetch-version-blocks"), async (req, res) => {

    const { linkID } = req.body;
    const [versionBlocks] = await db.query("SELECT ver_name, ver_id, created_at FROM USER_CODE_VERSIONS_INFO WHERE ? = link_id", [linkID]);
    // Format all the fetched created_at date time
    for (let i = 0; i < versionBlocks.length; i++) {
        const date = versionBlocks[i].created_at;
        const formattedDate = new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(date);
        versionBlocks[i].created_at = formattedDate;
    }
    res.json(versionBlocks);
    console.log(versionBlocks);
});


export default router;



