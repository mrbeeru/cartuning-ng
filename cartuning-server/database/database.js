const mongoose = require('mongoose');
const { EcuFile } = require('./schemas/ecufile-schema');
const User = require('./schemas/user-schema').User;
const Order = require('./schemas/order-schema').Order;

//mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false

mongoose.connect('mongodb://localhost:27017/cartuningDB', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

async function registerUser(body){
    var user = await User.where({username: body.username}).findOne();
    
console.log(body);

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
        if (body.ecuFile){
            await new EcuFile({content: body.ecuFile.content}).save().then(async x => {
                let order = buildOrder(body, x._id);
                await new Order(order).save();
            });
        } else {
            let order = buildOrder(body);
            await new Order(order).save();
        }
    } catch (error){
        console.log(error);
        return false;
    }

    return true;
}

async function getOrders(params){
    return await Order.where({ownerId: params.ownerid}).find()
}

async function getOrder(id){
    return await Order.where({_id: id}).findOne();
}

async function deleteOrder(orderId){
    let order = await Order.where({_id: orderId}).findOne();
    
    if (order.ecuFile)
        await EcuFile.deleteOne({_id: order.ecuFile.fileId})

    var res = await order.deleteOne();
    return res != null;
}


process.on('SIGINT', function() {   
    mongoose.connection.close(function () { 
        console.log('Mongoose default connection disconnected through app termination'); 
        process.exit(0); 
    }); 
}); 

//#region helper functions

function buildOrder(body, fileid){

    let order = {
        status: "New",
        createdAt: Date.now(),
        brand: body.brand,
        model: body.model,
        year: body.year,
        engine: body.engine,
        clutch: body.clutch,
        ecu: body.ecu,
        ownerId: body.ownerId,
    }

    if (body.ecuFile && fileid){
        order.ecuFile = {
            metadata: body.ecuFile.metadata,
            fileId: new mongoose.Types.ObjectId(fileid),
        }
    }
    
    return order;
}

//#endregion

module.exports = {registerUser, authenticateUser, placeOrder, getOrders, getOrder, deleteOrder}