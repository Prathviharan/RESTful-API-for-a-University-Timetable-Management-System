const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//transfer content 
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
const routes = require('./routes/routes');
app.use('/api', routes)

//port
app.use(express.json());


app.listen(3000, () =>{
    console.log(`Server started at ${3000}`);
})


//import .env file 
require('dotenv').config();

const mongoString = process.env.DATABASE_URL

//connect DB to Server using Mongoose
mongoose.connect(mongoString);
const database = mongoose.connection

//connect and throw any errors if connection fails
database.on('error',(error) => {
    console.log(error)
})

//connect only one time 
database.once('connected',() => {
    console.log('Database Connected');
})


app.use('/api/auth/',require('./routes/authroute'));

module.exports = app;