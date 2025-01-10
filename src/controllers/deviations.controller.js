const Deviation = require('../models/deviation.model');
const validateAndFetchCoinData = require('./validator');

const getDeviation = async (req, res) => {
    try {
        const { coin } = req.params;

        const deviationData = await validateAndFetchCoinData(
            coin,
            Deviation,
            res,
        );
        if (!deviationData) return;

        return res.json({
            deviation: deviationData.deviation,
        });
    } catch (err) {
        console.error('Error fetching deviation data:', err.message);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = getDeviation;
