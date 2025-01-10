const cron = require("node-cron");
const coingeckoMarketAPI = require("../utils/coingeckoMarketAPI")
const Crypto = require("../models/crypto.model");

const updateCoinInfo = () => {
  // will run every 2 hrs
  cron.schedule("0 */2 * * *", async () => {
    const data = await coingeckoMarketAPI();
    if (data.length > 0) {
      await Crypto.insertMany(data);
      console.log("Crypto data updated:", new Date());
    }
  });
};

module.exports = updateCoinInfo;
