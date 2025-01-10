const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
  coin: {
    type: String,
    required: true,
    enum: ["bitcoin", "ethereum", "matic-network"],
  },
  price: { type: Number, required: true, min: 0 },
  marketCap: { type: Number, required: true, min: 0 },
  change24h: { type: Number, required: true, min: -100, max: 100 },
  timestamp: { type: Date, default: Date.now, immutable: true },
});

cryptoSchema.index({ coin: 1, timestamp: -1 });

module.exports = mongoose.model("Crypto", cryptoSchema);
