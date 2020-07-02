const mongoose = require('mongoose');
const User = require('./schemas/user-schema').User;
const Order = require('./schemas/order-schema').Order;

//mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false

mongoose.connect('mongodb://localhost:27017/cartuningDB', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // const userSchema = new mongoose.Schema(userModel);
    // User = mongoose.model('users', userSchema);
});

async function registerUser(body){
    var user = await User.where({username: body.username}).findOne();
    
    if (user)
        return false;

    new User(body).save();
    return true;
}

async function authenticateUser(body){
    return await User.where({username: body.username, password: body.password}).findOne();
}

async function placeOrder(params, body){
    try{
        body.status = "New";
        body.createdAt = Date.now();
        await new Order(body).save();
        return true;
    } catch (error){
        return false;
    }
}

async function getOrders(params){
    return await Order.where({ownerId: params.ownerid}).find()
}

async function deleteOrder(orderId){
    var res = await Order.deleteOne({_id :orderId})
    return res != null;
}


process.on('SIGINT', function() {   
    mongoose.connection.close(function () { 
        console.log('Mongoose default connection disconnected through app termination'); 
        process.exit(0); 
    }); 
}); 


module.exports = {registerUser, authenticateUser, placeOrder, getOrders, deleteOrder}