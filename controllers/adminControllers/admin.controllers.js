require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const {v4 : uuidv4} = require("uuid");

const Product = require("../../model/product.model");
const Shop = require("../../model/shop.model");
const User = require("../../model/user.model");
const Order = require("../../model/order.model");

const saltRounds = 10;

// //delete all products
const deletetShops = async (req,res) => {
  const addProduct = await pool.query(`
     DELETE FROM shops 
  `)
  .then((product) => {
      res.send({
        success: true,
        message: "Product is added Successfully",
      });
    })
    .catch((error) => {
      res.send({
        success: false,
        message: "Something wrong",
        error: error,
      });
    });
}
//delete all products
const deletetProducts = async (req,res) => {
  const addProduct = await pool.query(`
     DELETE FROM products WHERE LENGTH(product_image)=0 
  `)
  .then((product) => {
      res.send({
        success: true,
        message: "Product is added Successfully",
      });
    })
    .catch((error) => {
      res.send({
        success: false,
        message: "Something wrong",
        error: error,
      });
    });
}
//get all orderes
const getAllOrders = async (req,res) => {
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
        ]);        
        if(orders) {
            res.status(200).send({
                success : true,
                message : "returns all orders",
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

//add product
const addProduct = async (req,res) => {
    const {product_name,product_description,product_price,product_image,shop_id} = req.body;
    try {
        const newProduct = new Product({
           product_id : uuidv4(),
           product_name,
           product_description,
           product_image,
           product_price : Number(product_price),
           shop_id
        });
        const productData = await newProduct.save();
        if(productData) {
            res.status(200).send({
                success: true,
                message: "Product is added Successfully",
            });
        } else {
            res.status(200).send({message : "Something Went Wrong"});
        }
    } catch (error) {
        res.status(500).send({message : error});
        
    }
}

//all shops
const allShops = async (req,res) => {
    try {
        const shops = await Shop.find();
        if(shops) {
            res.status(200).send({
                success : true,
                message : "returns all shops",
                shops : shops
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

//add product
const addShop = async (req,res) => {
  const {shop_name,shop_type,shop_address,shop_number} = req.body;
  try {
    const newShop = new Shop({
       shop_id : uuidv4(),
       shop_name,
       shop_type,
       shop_address,
       shop_number,
    });
    const shopData = await newShop.save();
    if(shopData) {
        res.status(200).send({
            success: true,
            message: "Shop is created Successfully",
        });
    } else {
        res.status(200).send({message : "Data was not successfully posted"});
    }
} catch (error) {
    res.status(500).send({message : error});
}

}

//change order status
const changeOrderStatus = async ( req,res) => {
  const {order_id} = req.body;

    try {
        const order = await Order.findOne({order_id});
        order.order_status = "Delivered";
        const orderData = await order.save();
        if(orderData) {
            res.status(200).send({
              success : true,
              message : "Order status has been updated successfully"
            });
        } else {
            res.status(200).send({message : "Something wrong"});
        }
    } catch (error) {
        res.status(500).send({message : error});
        
    }
    
}
module.exports = {getAllOrders,addProduct,allShops,changeOrderStatus,addShop}