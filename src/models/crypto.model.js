const mongoose = require('mongoose');
const { SUPPORTED_COINS } = require('../constants');

const cryptoSchema = new mongoose.Schema(
    {
        coin: {
            type: String,
            required: true,
            enum: SUPPORTED_COINS,
        },
        price: { type: Number, required: true, min: 0 },
        marketCap: { type: Number, required: true, min: 0 },
        change24h: { type: Number, required: true, min: -100, max: 100 },
    },
    { timestamps: true },
);

CryptoSchema.index({ coin: 1, createdAt: -1 });
CryptoSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Crypto', cryptoSchema);
