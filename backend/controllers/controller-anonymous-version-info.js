import * as versionInfoServices from "../services/service-anonymous-version-info.js";

export const addVersionInfoController = async (req, res) => {
    try {
        const { codeEditorSourceCode, versionName, sourceCodeInfoID } = req.body;
        const versionInfo = await versionInfoServices.addVersionInfo(codeEditorSourceCode, versionName, sourceCodeInfoID);

        if (versionInfo != undefined) { res.json(versionInfo); }
        else { res.json({ message: "Version Info Already Exist" }); }
    }
    catch (error) { console.error(error); }
}

export const fetchVersionsDetailsController = async (req, res) => {
    try {
        const { sourceCodeInfoID } = req.body;
        const { versionsInfo } = await versionInfoServices.fetchVersionsDetails(sourceCodeInfoID);
        res.json(versionsInfo);
    }
    catch (error) { console.error(error); }
}

export const fetchVersionSourceCodeController = async (req, res) => {
    try {
        const { savedVersionInfoID } = req.body;
        const versionSourceCode = await versionInfoServices.fetchVersionSourceCode(savedVersionInfoID);
        res.json(versionSourceCode);
    }
    catch (error) {
        console.error(error);
    }
}

export const deleteVersionController = async (req, res) => {
    try {
        const { id: versionToDeleteID } = req.params;
        const deleteVersionMessage = await versionInfoServices.deleteVersion(versionToDeleteID);
        res.json(deleteVersionMessage);
    }
    catch (error) { console.error(error); }
}





