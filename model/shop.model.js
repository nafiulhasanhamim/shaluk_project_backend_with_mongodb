const mongoose = require("mongoose");

 
const shopSchema = new mongoose.Schema({
    shop_id : {
      type : String,
      require : true
    },
    shop_name : {
        type : String,
        require : true
    },
    shop_type : {
        type : String,
        require : true
    },
    shop_address : {
        type : String,
        require : true
    },
    shop_number : {
        type : String,
        require : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("shops",shopSchema);