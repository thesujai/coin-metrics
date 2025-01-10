const express = require("express");
const updateCoinInfo = require("./jobs/updateCoinInfo");
const connectToDatabase = require("./config/database");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

connectToDatabase();
updateCoinInfo();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
