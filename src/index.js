const express = require('express');
const dotenv = require('dotenv');
const connectToDatabase = require('./config/database');
const apiRoutes = require('./routes/api.routes');
const rateLimiter = require('./middlewares/rateLimiter');

const { scheduleJobs } = require('./jobs/scheduler');

const main = async () => {
    try {
        dotenv.config();

        await connectToDatabase();

        const app = express();

        // Middleware
        app.use(express.json());
        app.use(rateLimiter);

        scheduleJobs();

        // routes
        app.use('/api/v1', apiRoutes);

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Error during initialization:', error);
        process.exit(1);
    }
};

main();
