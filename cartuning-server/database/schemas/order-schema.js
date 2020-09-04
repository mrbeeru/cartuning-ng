var mongoose = require("mongoose");

const orderModel = {   
    createdAt: Date,
    status: String,
    brand: String,
    model: String,
    year: Number,
    engine: String,
    clutch: String,
    ecu: String,
    ecuFile: {
        metadata: Object,
        fileId: {type: mongoose.Schema.Types.ObjectId, ref: 'EcuFile'},
    },

    ownerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}  

const orderSchema = new mongoose.Schema(orderModel);
const Order = mongoose.model('orders', orderSchema);

module.exports = {Order: Order}