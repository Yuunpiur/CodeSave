import { nanoid } from "nanoid";
import { hashSourceCode } from "../utils/crypto-utils.js";
import { db } from "../config/db.js";


export const addVersionInfo = async (codeEditorSourceCode, versionName, sourceCodeInfoID) => {
    try {
        const versionHashedSourceCode = hashSourceCode(codeEditorSourceCode);
        const selectVersionHashResult = await db.query("SELECT ver_hash FROM REGISTERED_USER_VERSIONS_INFO WHERE ver_hash = $1", [versionHashedSourceCode]);

        const versionHashExist = selectVersionHashResult.rows.length == 1;
        if (!versionHashExist) {
            const versionInfoID = nanoid(20);
            await db.query("INSERT INTO REGISTERED_USER_VERSIONS_INFO(ver_id, snippet_id, source_code, ver_hash, ver_name) VALUES($1, $2, $3, $4, $5)", [versionInfoID, sourceCodeInfoID, codeEditorSourceCode, versionHashedSourceCode, versionName]);
            const selectVersionInfoResult = await db.query("SELECT ver_name, ver_id, created_at FROM REGISTERED_USER_VERSIONS_INFO WHERE ver_id = $1", [versionInfoID]);

            const date = selectVersionInfoResult.rows[0].created_at;
            const formattedDate = new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
            }).format(date);

            selectVersionInfoResult.rows[0].created_at = formattedDate;
            const versionInfo = selectVersionInfoResult.rows[0];
            return versionInfo;
        }
        return undefined;

    }
    catch (error) { console.error(error); }
}

/* func name should be "fetchAllVersionsDetails" */
export const fetchVersionsDetails = async (sourceCodeInfoID) => {

    try {
        const selectQueryResult = await db.query("SELECT ver_name, ver_id, created_at FROM REGISTERED_USER_VERSIONS_INFO WHERE snippet_id = $1", [sourceCodeInfoID]);

        const versionsInfo = selectQueryResult.rows;
        // Format all the created_at column date times
        for (let i = 0; i < versionsInfo.length; i++) {
            const date = versionsInfo[i].created_at;
            const formattedDate = new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
            }).format(date);
            versionsInfo[i].created_at = formattedDate;
        }

        return { versionsInfo: versionsInfo };
    }
    catch (error) { console.error(error); }
}


export const fetchVersionSourceCode = async (savedVersionInfoID) => {
    try {
        const selectQueryResult = await db.query("SELECT source_code as \"versionSourceCode\"FROM REGISTERED_USER_VERSIONS_INFO WHERE ver_id = $1", [savedVersionInfoID]);
        const [versionSourceCode] = selectQueryResult.rows;
        return versionSourceCode;
    }
    catch (error) {
        console.error(error);
    }
}

export const deleteVersion = async (versionToDeleteID) => {
    try {
        const deleteQueryResult = await db.query("DELETE FROM REGISTERED_USER_VERSIONS_INFO WHERE ver_id = $1", [versionToDeleteID]);
        return { message: "deleted successfully!" };
    }
    catch (error) {
        console.error(error);
    }
}




