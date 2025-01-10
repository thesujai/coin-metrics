const cron = require('node-cron');
const Crypto = require('../models/crypto.model');

const deleteOldCryptoInfo = () => {
    // runs daily at midnight
    cron.schedule('0 0 * * *', async () => {
        try {
            const fiveDaysAgo = new Date();
            fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

            const result = await Crypto.deleteMany({
                createdAt: { $lt: fiveDaysAgo },
            });
            console.log(
                `${result.deletedCount} entries older than 5 days deleted at`,
                new Date(),
            );
        } catch (err) {
            console.error('Error deleting old crypto entries:', err.message);
        }
    });
};

module.exports = deleteOldCryptoInfo;
