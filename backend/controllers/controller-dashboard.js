import * as dashboardServices from "../services/service-dashboard.js";


export const loadAllDataController = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        console.log(accessToken);
        res.json({ allData: "s" });
    }
    catch (error) {
        console.error(error);
    }
}
