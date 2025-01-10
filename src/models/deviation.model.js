const mongoose = require('mongoose');
const {SUPPORTED_COINS} = require('../constants');

const deviationSchema = new mongoose.Schema(
    {
        coin: {
            type: String,
            required: true,
            unique: true,
            enum: SUPPORTED_COINS,
        },
        deviation: { type: Number, required: true },
    },
    { timestamps: true },
);

const Deviation = mongoose.model('Deviation', deviationSchema);
module.exports = Deviation;
