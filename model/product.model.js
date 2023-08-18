const mongoose = require("mongoose");
const users = require('./shop.model') 
const productSchema = new mongoose.Schema({
    product_id : {
      type : String,
      require : true
    },
    product_name : {
        type : String,
        require : true
    },
    product_description : {
        type : String,
        require : true
    },
    product_image : {
        type : String,
        require : true
    },
    shop_id : {
        type: String,
        ref: 'shops', 
        field: 'shop_id'
    },
    product_price : {
        type : Number,
        require : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("products",productSchema);