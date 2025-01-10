const express = require('express');
const getStats = require('../controllers/stats.controller');
const getDeviation = require("../controllers/deviations.controller")

const router = express.Router();

router.get('/stats/:coin', getStats);
router.get('/deviations/:coin', getDeviation);

module.exports = router;
