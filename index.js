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
app.use(cors({
    origin:"https://thistrackyourexpenses.netlify.app",
    methods:['GET','POST','PATCH','DELETE']
}));



// connection establishment
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true,useUnifiedTopology:true},(error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("succesfully connected to your database");
    }
})


//calling routes
app.use('/auth',authRoute)
app.use('/api',apiRoute)

//port
app.listen(process.env.PORT,() => {
    console.log("server started at 4000");
})

// 1aftHn2R8Wz2Q8xY
