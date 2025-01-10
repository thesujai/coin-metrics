const Crypto = require('../models/crypto.model');
const validateAndFetchCoinData = require('./validator');

const getStats = async (req, res) => {
    try {
        const { coin } = req.params;

        const latest = await validateAndFetchCoinData(coin, Crypto, res);
        if (!latest) return;

        return res.json({
            price: latest.price,
            marketCap: latest.marketCap,
            '24hChange': latest.change24h,
        });
    } catch (err) {
        console.error('Error fetching stats data:', err.message);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = getStats;
