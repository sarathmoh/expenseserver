require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//importing routes
const authRoute = require('./routes/auth')
const apiRoute = require('./routes/api')

//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
// app.use(cors({origin:"*",credentials:true}))
app.use(cors());



// connection establishment
mongoose.connect('mongodb://localhost:27017/expenseDB',{useNewUrlParser:true,useUnifiedTopology:true},(error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("succesfully connected to database");
    }
})


//calling routes
app.use('/auth',authRoute)
app.use('/api',apiRoute)

//port
app.listen(4000,() => {
    console.log("server started at 4000");
})


