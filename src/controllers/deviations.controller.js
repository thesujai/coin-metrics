const Deviation = require("../models/deviation.model")
const { SUPPORTED_COINS } = require("../constants")

const getDeviation = async (req, res) => {
    try {

        const { coin } = req.params;
        if (!coin)
            return res.status(400).json({ error: "Query param 'coin' is required" });

        if (!SUPPORTED_COINS.includes(coin)) {
            return res.status(400).json({ error: "Unsupported coin" });
        }

        const deviationData = await Deviation.findOne({ coin });

        if (!deviationData) {
            return res.status(404).json({ error: "Deviation data not found" });
        }

        return res.json({
            deviation: deviationData.deviation,
        });
    } catch (err) {
        console.error("Error fetching deviation data:", err.message);
        return res.status(500).json({ error: "An error occurred" });
    }
}

module.exports = getDeviation;