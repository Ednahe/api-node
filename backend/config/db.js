const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongo connecté');
    } catch (err) {
        console.log(err);
        process.exit(1); 
    }
}

module.exports = connectDB;