const express = require('express');
const getStats = require('../controllers/stats.controller');

const router = express.Router();

router.get('/stats/:coin', getStats);

module.exports = router;
