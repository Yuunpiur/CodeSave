import * as dashboardServices from "../services/service-library.js";


export const loadAllDataController = async (req, res) => {
    try {
        res.json({ allData: "s" });
    }
    catch (error) {
        console.error(error);
    }
}
