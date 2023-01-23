const express = require('express');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { APP_PORT } = require('./config');
const { connectDB } = require('./db/connectDB');
const { errorHandlerMiddleware } = require('./middlewares/errorHandlerMiddleware');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');


//Creating app
const app = express();

app.use(cors({ origin: true, credentials: true }));


// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error:${err.message}`);
    console.log(`Shutting Down The Server Due To Uncaught Exception ...`);

    process.exit(1);
});



//Database connection
connectDB();


// Parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));


//cookie-parser
app.use(cookieParser());


// passing fileUpload as a middleware
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
    // limits: { fileSize: 5 * 1024 * 1024 }   //5MB=5*1024*1024 bytes
}));


// Include Cloudinary configuration
require('./uploads/cloudinary');


//Loading routes
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

//errorHandler middleware
app.use(errorHandlerMiddleware);

// Creating server
const server = app.listen(APP_PORT, () => {
    console.log(`Express server is listening on http://localhost:${APP_PORT}`)
});


// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error:${err.message}`)
    console.log(`Shutting Down The Server Due To Unhandled Promise Rejection ...`)

    server.close(() => {
        process.exit(1);
    })

});