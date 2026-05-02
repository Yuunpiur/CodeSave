import { nanoid } from "nanoid";
import { db } from "./server.js";
import express from "express";
import { hash_code } from "./utils/backend-utils.js";
const router = express.Router();

router.post(('/create-code-info'), async (req, res) => {
    try {
        // Get the data from the front end
        const { sourceCode, programmingLanguage } = req.body;
        console.log("BACKEND")

        const link_id = nanoid(12);
        const hashed_code = hash_code(sourceCode);

        const [result] = await db.query("INSERT INTO USER_SOURCECODE_INFO (link_id, source_code, programming_language, code_hash) VALUES(?, ?, ?, ?)", [link_id, sourceCode, programmingLanguage, hashed_code])

        res.json({ linkID: link_id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});


router.post("/fetch-source-code", async (req, res) => {
    try {
        console.log("FETCH");

        const { id } = req.body;
        const [sourceCodeInfo] = await db.query("SELECT source_code, programming_language FROM USER_SOURCECODE_INFO WHERE link_id = ?", [id]);

        const sourceCode = sourceCodeInfo[0].source_code;
        const programmingLanguage = sourceCodeInfo[0].programming_language;

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


        const hashed_code = hash_code(sourceCode);
        const [prevHashedCode] = await db.query("SELECT code_hash FROM USER_SOURCECODE_INFO WHERE link_id = ?", [linkID]);

        if (hashed_code != prevHashedCode) {
            const [sourceCodeUpdateResult] = await db.query("UPDATE USER_SOURCECODE_INFO SET source_code = ? WHERE link_id = ?", [sourceCode, linkID]);
            const [hashedCodeUpdateResult] = await db.query("UPDATE USER_SOURCECODE_INFO SET code_hash = ? WHERE link_id = ?", [hashed_code, linkID]);

            const [updateDateResult] = await db.query("UPDATE USER_SOURCECODE_INFO SET updated_at = NOW() WHERE link_id = ?", [linkID]);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});


export default router;