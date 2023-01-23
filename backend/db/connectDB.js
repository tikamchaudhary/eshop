const mongoose = require('mongoose');
const { DB_URI, DB_NAME } = require('../config');

const DB_OPTIONS = {
    dbName: DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
exports.connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        const result = await mongoose.connect(DB_URI, DB_OPTIONS);
        console.log(`Mongodb connected with port:${result.connection.port}`)
    } catch (error) {
        console.log(`Mongodb not connect ...\n${error}`);
    }
}