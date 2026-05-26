import { nanoid } from "nanoid";
import { hashSourceCode } from "../utils/crypto-utils.js";
import { db } from "../config/db.js";

export const addSourceCodeInfo = async (codeEditorSourceCode, programmingLanguage) => {
    try {
        const sourceCodeInfoID = nanoid(12);
        const hashedSourceCode = hashSourceCode(codeEditorSourceCode);
        const insertQueryResult = await db.query("INSERT INTO USER_SOURCECODE_INFO (link_id, source_code, programming_language, code_hash) VALUES($1, $2, $3, $4)", [sourceCodeInfoID, codeEditorSourceCode, programmingLanguage, hashedSourceCode]);

        return sourceCodeInfoID;

    }
    catch (error) {
        console.error(error);
    }
}

export const fetchSourceCodeInfo = async (sourceCodeInfoID) => {
    try {
        const selectQueryResult = await db.query("SELECT source_code AS \"codeEditorSourceCode\", programming_language AS \"programmingLanguage\" FROM USER_SOURCECODE_INFO WHERE link_id = $1", [sourceCodeInfoID]);
        const { codeEditorSourceCode, programmingLanguage } = selectQueryResult.rows[0];
        return { codeEditorSourceCode: codeEditorSourceCode, programmingLanguage: programmingLanguage };
    }
    catch (error) {
        console.error(error);
    }
}

export const updateSourceCodeInfo = async (codeEditorSourceCode, sourceCodeInfoID) => {
    try {
        const newHashedSourceCode = hashSourceCode(codeEditorSourceCode);
        const selectQueryResult = await db.query("SELECT code_hash AS \"oldHashedSourceCode\" FROM USER_SOURCECODE_INFO WHERE link_id = $1", [sourceCodeInfoID]);
        const { oldHashedSourceCode } = selectQueryResult.rows[0];
        if (newHashedSourceCode != oldHashedSourceCode) {
            const updateQueryResult = await db.query("UPDATE USER_SOURCECODE_INFO SET source_code = $1, code_hash = $2, updated_at = NOW() WHERE link_id = $3", [codeEditorSourceCode, newHashedSourceCode, sourceCodeInfoID])
        }
        return { status: "working" };
    }
    catch (error) {
        console.error(error);
    }
}

export const checkIDExist = async (sourceCodeInfoID) => {
    try {
        const selectQueryResult = await db.query("SELECT link_id FROM USER_SOURCECODE_INFO WHERE link_id = $1", [sourceCodeInfoID]);
        const sourceCodeInfoIDExist = selectQueryResult.rows.length == 1;
        if (sourceCodeInfoIDExist) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error(error);
    }
}

