import * as dashboardServices from "../services/service-dashboard.js";


export const loadAllDataController = async (req, res) => {
    try {
        console.log("VADING");
        res.json({ allData: "s" });
    }
    catch (error) {
        console.error(error);
    }
}
