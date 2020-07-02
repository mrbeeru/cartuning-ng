var mongoose = require("mongoose");

const userModel = {   
    _id: mongoose.Schema.Types.ObjectId,                  
    firstName: String,
    lastName: String, 
    username: String, 
    password: String,
    avatar: String,  
}  

const userSchema = new mongoose.Schema(userModel);
const User = mongoose.model('users', userSchema);

module.exports = {User: User}