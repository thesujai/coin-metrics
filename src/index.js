const express = require('express');
const updateCoinInfo = require('./jobs/updateCoinInfo');
const connectToDatabase = require('./config/database');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api.routes');

dotenv.config();

connectToDatabase();
updateCoinInfo();

const app = express();
app.use(express.json());

// all routes:
app.use('/api/v1/', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
