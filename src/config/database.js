const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected!!!!!');
    } catch (err) {
        console.error('Error connecting to Mongo:( \n', err);
        process.exit(1);
    }
};

module.exports = connectToDatabase;
