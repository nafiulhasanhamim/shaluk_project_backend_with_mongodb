const mongoose = require("mongoose");
const users = require('./shop.model');
const products = require('./product.model'); 
const orderSchema = new mongoose.Schema({
    order_id : {
        type : String,
        require : true
      },
    product_id : {
      type : String,
       ref : 'products',
       field : 'product_id'
    },
    quantity : {
        type : Number,
        require : true
    },
    totalPrice : {
        type : Number,
        require : true
    },
    user_id : {
        type: String,
        ref: 'users', 
        field: 'user_id'
    },
    order_status : {
        type : String,
        require : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("orders",orderSchema);