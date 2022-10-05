const mongoose = require('mongoose');

//schema for users collection
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password:String,
    confirm:String,
    expenses: []
})



module.exports = mongoose.model('User',userSchema)