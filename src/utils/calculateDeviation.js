const Crypto = require('../models/crypto.model');

const getDeviation = (prices) => {
    if (!prices || prices.length === 0) {
        throw new Error('Prices array is empty or undefined');
    }
    const mean =
        prices.reduce((total, price) => total + price, 0) / prices.length;

    const variance =
        prices.reduce((total, price) => total + Math.pow(price - mean, 2), 0) /
        prices.length;

    return Math.sqrt(variance);
};

const calculateDeviation = async (coin) => {
    try {
        const prices = await Crypto.find({ coin })
            .sort({ createdAt: -1 })
            .limit(100)
            .select('price')
            .then((records) => records.map((record) => record.price));

        if (prices.length === 0) {
            return null;
        }

        const deviation = getDeviation(prices);

        return deviation;
    } catch (error) {
        console.error('Error calculating deviation:', error.message);
    }
};

module.exports = calculateDeviation;
