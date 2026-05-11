import { nanoid } from "nanoid";
import { createHash } from "crypto";
import { db } from "./server.js";
import express from "express";
const router = express.Router();

router.post(('/api/code/create-code-info'), async (req, res) => {
    try {
        // Get the data from the front end
        const { sourceCode, programmingLanguage } = req.body;
        const link_id = nanoid(12);
        const hash_code = (source_code) => createHash("sha256").update(source_code).digest("hex");

        const hashed_code = hash_code(sourceCode);

        const result = await db.query("INSERT INTO USER_SOURCECODE_INFO (link_id, source_code, programming_language, code_hash) VALUES($1, $2, $3, $4)", [link_id, sourceCode, programmingLanguage, hashed_code])

        res.json({ linkID: link_id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});


router.post("/fetch-source-code", async (req, res) => {
    try {
        const { id } = req.body;
        const sourceCodeInfo = await db.query("SELECT source_code, programming_language FROM USER_SOURCECODE_INFO WHERE link_id = $1", [id]);

        const sourceCode = sourceCodeInfo.rows[0].source_code;
        const programmingLanguage = sourceCodeInfo.rows[0].programming_language;

        res.json({ sourceCode, programmingLanguage });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});



router.put("/update-source-code", async (req, res) => {
    try {
        const { sourceCode, linkID } = req.body;

        const hash_code = (source_code) => createHash("sha256").update(source_code).digest("hex");
        const hashed_code = hash_code(sourceCode);
        const prevHashedCode = await db.query("SELECT code_hash FROM USER_SOURCECODE_INFO WHERE link_id = $1", [linkID]);

        if (hashed_code != prevHashedCode) {
            const sourceCodeUpdateResult = await db.query("UPDATE USER_SOURCECODE_INFO SET source_code = $1 WHERE link_id = $2", [sourceCode, linkID]);
            const hashedCodeUpdateResult = await db.query("UPDATE USER_SOURCECODE_INFO SET code_hash = $1 WHERE link_id = $2", [hashed_code, linkID]);
            const updateDateResult = await db.query("UPDATE USER_SOURCECODE_INFO SET updated_at = NOW() WHERE link_id = $1", [linkID]);
        }

        res.json({ status: "working" })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});


router.post("/check-id-exist", async (req, res) => {
    const { id } = req.body;

    const linkID = await db.query("SELECT link_id FROM USER_SOURCECODE_INFO WHERE link_id = $1", [id]);
    if (linkID.rows.length == 1) {
        res.json({ linkIDExist: true });
    }
    else {
        res.json({ linkIDExist: false });
    }
})


export default router;