const cron = require('node-cron');
const Deviation = require('../models/deviation.model');
const calculateDeviation = require('../utils/calculateDeviation');
const { SUPPORTED_COINS } = require('../constants');

const updateDeviationJob = () => {
    // run every 2 hours just like
    cron.schedule('* */2 * * *', async () => {
        console.log('Updating deviations...');
        try {
            for (const coin of SUPPORTED_COINS) {
                const deviation = await calculateDeviation(coin);
                if (deviation === null) {
                    continue;
                }
                await Deviation.findOneAndUpdate(
                    { coin },
                    { deviation },
                    { upsert: true, new: true },
                );
                console.log(`Deviation updated for ${coin}: ${deviation}`);
            }
        } catch (err) {
            console.error('Error updating deviations:', err.message);
        }
    });
};

module.exports = updateDeviationJob;
