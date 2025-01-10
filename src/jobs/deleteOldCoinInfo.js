const cron = require('node-cron');
const Crypto = require('../models/crypto.model');

const deleteOldCryptoInfo = () => {
    // runs daily at midnight
    cron.schedule('0 0 * * *', async () => {
        try {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(fiveDaysAgo.getDate() - 7);

            const result = await Crypto.deleteMany({
                createdAt: { $lt: sevenDaysAgo },
            });
            console.log(
                `${result.deletedCount} entries older than 7 days deleted at`,
                new Date(),
            );
        } catch (err) {
            console.error('Error deleting old crypto entries:', err.message);
        }
    });
};

module.exports = deleteOldCryptoInfo;
