const axios = require("axios");
const { SUPPORTED_COINS } = require("../constants");

/**
 * @param {Array} data - The raw cryptocurrency data
 * @returns {Array} Serialized cryptocurrency data.
 */
const serializeCryptoData = (data) => {
  return data.map((coin) => ({
    coin: coin.id,
    price: coin.current_price,
    marketCap: coin.market_cap,
    change24h: coin.price_change_percentage_24h,
  }));
};

const fetchCoingeckoMarkets = async () => {
  const coins = SUPPORTED_COINS;
  const url = "https://api.coingecko.com/api/v3/coins/markets";
  const params = { vs_currency: "usd", ids: coins.join(",") };

  try {
    const response = await axios.get(url, { params });
    return serializeCryptoData(response.data);
  } catch (error) {
    console.error("Error fetching data from CoinGecko:", error.message);
    // we should never stop the process because of an error at the CoinGecko API level, so let it continue
    return [];
  }
};

module.exports = fetchCoingeckoMarkets;
