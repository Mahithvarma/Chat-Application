const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 6,
        max: 20,
        unique: true
    },
    email:{
        type: String,
        required: true,
        max: 20,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 8,
        max: 50,
    }
})

module.exports = mongoose.model("users", userSchema);