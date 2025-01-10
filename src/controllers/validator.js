const { SUPPORTED_COINS } = require('../constants');

const validateAndFetchCoinData = async (coin, Model, res) => {
    if (!coin) {
        res.status(400).json({ error: "Query param 'coin' is required" });
        return null;
    }

    if (!SUPPORTED_COINS.includes(coin)) {
        res.status(400).json({ error: 'Unsupported coin' });
        return null;
    }

    const data = await Model.findOne({ coin }).sort({ createdAt: -1 });
    if (!data) {
        res.status(404).json({ error: `${Model.modelName} data not found` });
        return null;
    }

    return data;
};

module.exports = validateAndFetchCoinData;
