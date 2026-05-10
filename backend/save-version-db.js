import express from "express";
import { db } from "./server.js";
import { version } from "react";
import { nanoid } from "nanoid";
import { createHash } from "crypto";

const router = express.Router();

router.post("/save-version", async (req, res) => {
    const { sourceCode, versionName, linkID } = req.body;
    // ! versionname, source code, linkID, ver_hash 
    // send the data to the backend
    // hash the code
    const hash_code = (source_code) => createHash("sha256").update(source_code).digest("hex");
    const hashedCode = hash_code(sourceCode);
    // compare hashes if it already exist
    const versionHash = await db.query("SELECT ver_hash FROM USER_CODE_VERSIONS_INFO WHERE $1 = link_id AND $2 = ver_hash", [linkID, hashedCode]);

    if (versionHash.rows.length === 0) {


        const ver_id = nanoid(8);


        // query db by saving version block
        const savingVersionInfoResult = await db.query("INSERT INTO USER_CODE_VERSIONS_INFO(ver_id, link_id, source_code, ver_hash, ver_name) VALUES($1, $2, $3, $4, $5)", [ver_id, linkID, sourceCode, hashedCode, versionName]);

        // receive the data from db
        // query db to get all version info about linkID
        const versionInfo = await db.query("SELECT ver_name, ver_id, created_at FROM USER_CODE_VERSIONS_INFO WHERE $1 = ver_id", [ver_id]);
        const date = versionInfo.rows[0].created_at;
        const formattedDate = new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(date);
        versionInfo.rows[0].created_at = formattedDate;
        res.json(versionInfo.rows[0]);
        return;
    }

    res.json({ message: "working" });
});

router.post(("/fetch-version-blocks"), async (req, res) => {

    const { linkID } = req.body;
    const versionBlocks = await db.query("SELECT ver_name, ver_id, created_at FROM USER_CODE_VERSIONS_INFO WHERE $1 = link_id", [linkID]);
    // Format all the fetched created_at date time
    for (let i = 0; i < versionBlocks.rows.length; i++) {
        const date = versionBlocks.rows[i].created_at;
        const formattedDate = new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(date);
        versionBlocks.rows[i].created_at = formattedDate;
    }
    res.json(versionBlocks.rows);
});


router.post("/fetch-version-block-source-code", async (req, res) => {
    const { linkID, versionID } = req.body;
    const result = await db.query("SELECT source_code FROM USER_CODE_VERSIONS_INFO WHERE link_id = $1 AND ver_id = $2", [linkID, versionID]);

    res.json(result.rows);
})

router.delete("/delete-version-block/:id", (req, res) => {

    try {
        const { id: verID } = req.params;
        const result = db.query("DELETE FROM USER_CODE_VERSIONS_INFO WHERE ver_id = $1", [verID])
        res.json({ message: "deleted successfully!" })
    }
    catch (error) {
        res.json({ message: "something went wrong ;(" })
        console.error(error);
    }

});

export default router;



