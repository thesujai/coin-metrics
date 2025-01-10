const updateCoinInfo = require('./updateCoinInfo');
const updateDeviationJob = require('./updateCoinDeviation');
const deleteOldCryptoInfo = require('./deleteOldCoinInfo');

const scheduleJobs = () => {
    updateCoinInfo();
    updateDeviationJob();
    deleteOldCryptoInfo();
};

module.exports = { scheduleJobs };
