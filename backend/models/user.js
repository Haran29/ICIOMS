/*const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user' 
    },
    
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;*/



const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false,
        default: 'user' 
            },
   
});

  // Define model for password reset requests

const  UserModel= mongoose.model("User", userSchema);
module.exports = UserModel;