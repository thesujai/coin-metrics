const Crypto = require('../models/crypto.model');

const getStats = async (req, res) => {
    const { coin } = req.params;
    if (!coin)
        return res
            .status(400)
            .json({ error: "Query param 'coin' is required" });

    // as timestamp is indexed, the query wont take a lot of time
    const latest = await Crypto.findOne({ coin }).sort({ createdAt: -1 });
    if (!latest) return res.status(404).json({ error: 'Data not found' });

    res.json({
        price: latest.price,
        marketCap: latest.marketCap,
        '24hChange': latest.change24h,
    });
};

module.exports = getStats;
