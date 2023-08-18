require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const pool = require("../../config/db");
const {v4 : uuidv4} = require("uuid");


const Product = require("../../model/product.model");
const Shop = require("../../model/shop.model");
const User = require("../../model/user.model");
const Order = require("../../model/order.model");

const saltRounds = 10;

//user profile
const userProfile = async (req,res) => {
  const {user_id} = req.body;
  try {
    const user = await User.aggregate([
      {
        $match : {
          user_id
        }
      }
    ]);
    if(user) {
        res.status(200).send({
            success : true,
            message : "Successfully fetched",
            user
        });
    }
    else {
        res.status(200).send({
            message : "Something wrong"
        })
    }
    
} catch (error) {
    res.status(500).send({
        success : false,
        message : error });
}
}

//update user profile
const updateUserProfile = async ( req,res) => {
  const {user_id,name,address,phone_number} = req.body;
  try {
    const user = await User.findOne({user_id : user_id});
    user.name = name;
    user.address = address;
    user.phone_number = phone_number
    const userData = await user.save();
    if(userData) {
        res.status(200).send({
          success : true,
          message : "User data is successfully updated"
        });
    } else {
        res.status(200).send({message : "User data is not successfully updated"});
    }
} catch (error) {
    res.status(500).send({message : error});
    
}

}

//all food shops
const allFoodShops = async (req,res) => {
  try {
    const foodShops = await Shop.aggregate([
      {
        $match : {
          shop_type : "Food"
        }
      }
    ]);        
    if(foodShops) {
        res.status(200).send({
            success : true,
            message : "returns all food shops",
            foodShops
        });
    }
    else {
        res.status(200).send({
            message : "Something wrong"
        })
    }
    
} catch (error) {
    res.status(500).send({
        success : false,
        message : error });
}
}

//all medicine shops
const allMedicineShops = async (req,res) => {
  try {
    const medicineShops = await Shop.aggregate([
      {
        $match : {
          shop_type : "Medicine"
        }
      }
    ]);        
    if(medicineShops) {
        res.status(200).send({
            success : true,
            message : "returns all medicine shops",
            medicineShops
        });
    }
    else {
        res.status(200).send({
            message : "Something wrong"
        })
    }
    
} catch (error) {
    res.status(500).send({
        success : false,
        message : error });
}
}

//medicine products
const medicineProducts = async (req,res) => {
  try {
    const products = await Product.aggregate([
      {
        $lookup : {
          from : 'shops',
          localField : "shop_id",
          foreignField : "shop_id",
          as : "shop_details"
        }
      },
      {
        $unwind : "$shop_details"
      },
      {
        $match : {
          "shop_details.shop_type" : "Medicine"
        }
      }
    ]);        
    if(products) {
        res.status(200).send({
            success : true,
            message : "returns all medicine products",
            products
        });
    }
    else {
        res.status(200).send({
            message : "Something wrong"
        })
    }
    
} catch (error) {
    res.status(500).send({
        success : false,
        message : error });
}
}

//food products
const foodProducts = async (req,res) => {
try {
  const products = await Product.aggregate([
    {
      $lookup : {
        from : 'shops',
        localField : "shop_id",
        foreignField : "shop_id",
        as : "shop_details"
      }
    },
    {
      $unwind : "$shop_details"
    },
    {
      $match : {
        "shop_details.shop_type" : "Food"
      }
    }
  ]);        
  if(products) {
      res.status(200).send({
          success : true,
          message : "returns all food products",
          products
      });
  }
  else {
      res.status(200).send({
          message : "Something wrong"
      })
  }
  
} catch (error) {
  res.status(500).send({
      success : false,
      message : error });
}
}

//getAllProducts
const getAllProducts = async (req,res) => {
  try {
    const products = await Product.aggregate([
      {
        $lookup : {
          from : 'shops',
          localField : "shop_id",
          foreignField : "shop_id",
          as : "shop_details"
        }
      },
      {
        $unwind : "$shop_details"
      },
    ]);        
    if(products) {
        res.status(200).send({
            success : true,
            message : "returns all products",
            products
        });
    }
    else {
        res.status(200).send({
            message : "Something wrong"
        })
    }
    
  } catch (error) {
    res.status(500).send({
        success : false,
        message : error 
      });
  }
}

//getAllProducts under a specific shop
const specificShopProducts = async (req,res) => {
  const {shop_name} = req.body
  try {
    const products = await Shop.aggregate([
      {
        $lookup : {
          from : 'products',
          localField : "shop_id",
          foreignField : "shop_id",
          as : "products"
        }
      },
      {
        $match : {
          shop_name
        }
      }
    ]);        
    if(products) {
        res.status(200).send({
            success : true,
            message : "return the specific product",
            products
        });
    }
    else {
        res.status(200).send({
            message : "Something wrong"
        })
    }
    
  } catch (error) {
    res.status(500).send({
        success : false,
        message : error });
  }
  
}

//individualProduct
const individualProduct = async (req,res) => {
    const {product_id} = req.body;
    try {
      const products = await Product.aggregate([
        {
          $lookup : {
            from : 'shops',
            localField : "shop_id",
            foreignField : "shop_id",
            as : "shop_details"
          }
        },
        {
          $unwind : "$shop_details"
        },
        {
          $match : {
            product_id
          }
        }
      ]);        
      if(products) {
          res.status(200).send({
              success : true,
              message : "return the specific product",
              products
          });
      }
      else {
          res.status(200).send({
              message : "Something wrong"
          })
      }
      
    } catch (error) {
      res.status(500).send({
          success : false,
          message : error });
    }
    
}


//place order
const placeOrder = async (req,res) => {
  const {product_id,quantity,product_price,user_id} = req.body;
  try {
    const newOrder = new Order({
       order_id : uuidv4(),
       product_id,
       quantity : Number(quantity),
       totalPrice : Number(product_price)*Number(quantity),
       order_status : "Pending",
       user_id

    });
    const orderData = await newOrder.save();
    if(orderData) {
        res.status(200).send({
            success: true,
            message: "Order is placed Successfully",
        });
    } else {
        res.status(200).send({message : "Oder is not placed successfully"});
    }
} catch (error) {
    res.status(500).send({message : error});
    
}
}
//ordered products by a particular customer
const orderByAParticularCustomer = async (req,res) => {
    const {user_id} = req.body;
    try {
      const orders = await Order.aggregate([
        {
          $lookup : {
            from : 'products',
            localField : "product_id",
            foreignField : "product_id",
            as : "product_details"
          }
        },
        {
          $unwind : "$product_details"
        },
        {
          $lookup : {
            from : 'shops',
            localField : "product_details.shop_id",
            foreignField : "shop_id",
            as : "product_details.shop_details"
          }
        },
        {
          $unwind : "$product_details.shop_details"
        },

        {
          $lookup : {
            from : 'users',
            localField : "user_id",
            foreignField : "user_id",
            as : "user_details"
          }
        },
        {
          $unwind : "$user_details"
        },
        {
          $match : {
            user_id 
          }
        }
      ]);        
      if(orders) {
          res.status(200).send({
              success : true,
              message : "returns all orders of this user",
              orders
          });
      }
      else {
          res.status(200).send({
              message : "Something wrong"
          })
      }
      
    } catch (error) {
      res.status(500).send({
          success : false,
          message : error 
        });
    }
    

}


module.exports = {allMedicineShops,allFoodShops,getAllProducts,individualProduct,medicineProducts,foodProducts,specificShopProducts,
  orderByAParticularCustomer,placeOrder,userProfile,updateUserProfile}