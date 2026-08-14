import * as codeInfoServices from "../services/service-anonymous-code-info.js";


export const addSourceCodeInfoController = async (req, res) => {
    try {
        const { codeEditorSourceCode, programmingLanguage } = req.body;
        const sourceCodeInfoID = await codeInfoServices.addSourceCodeInfo(codeEditorSourceCode, programmingLanguage);

        res.json({ sourceCodeInfoID: sourceCodeInfoID });
    }
    catch (error) {
        console.error(error);
    }
}

export const fetchSourceCodeInfoController = async (req, res) => {
    try {
        const { sourceCodeInfoID } = req.body;
        const { codeEditorSourceCode, programmingLanguage } = await codeInfoServices.fetchSourceCodeInfo(sourceCodeInfoID);
        res.json({ codeEditorSourceCode, programmingLanguage });
    }
    catch (error) {
        console.error(error);
    }
}

export const updateSourceCodeInfoController = async (req, res) => {
    try {
        const { codeEditorSourceCode, sourceCodeInfoID } = req.body;
        const status = await codeInfoServices.updateSourceCodeInfo(codeEditorSourceCode, sourceCodeInfoID);
        res.json({ status: status });
    }
    catch (error) {
        console.error(error);
    }
}

export const checkIDExistController = async (req, res) => {
    try {
        const { sourceCodeInfoID } = req.body;
        const IDExist = await codeInfoServices.checkIDExist(sourceCodeInfoID);
        res.json({ IDExist: IDExist });
    }
    catch (error) {
        console.error(error);
    }
}
