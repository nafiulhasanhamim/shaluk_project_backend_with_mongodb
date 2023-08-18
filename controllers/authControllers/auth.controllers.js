const {v4 : uuidv4} = require("uuid");
const User = require("../../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const saltRounds = 10;
const getAllUser = async (req,res) => {
    try {
        const users = await User.find();        
        if(users) {
            res.status(200).send({
                success : true,
                message : "returns all users",
                users : users
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

const getSingleUser = async (req,res) => {
    try {
        const users = await User.findOne({id : req.params.id});

        // const users = await User.aggregate([
        //     {
        //         $match : {
        //           user_id : {$eq : req.params.user_id}

        //         }
        //     }
        // ]);

        if(users) {
            res.status(200).send({
                success : true,
                message : "returns all users",
                data : users
            });
        }
        else {
            res.status(200).send({
                message : "User not found"
            })
        }
        
    } catch (error) {
        res.status(500).send({
            success : false,
            message : error });
    }


}


const deleteUser = async (req,res) => {
    try {
        const users = await User.deleteOne({id : req.params.id});
        if(users) {
            res.status(200).send({
                success : true,
                message : "returns all users",
                data : users
            });
        }
        else {
            res.status(200).send({
                message : "User not found"
            })
        }
        
    } catch (error) {
        res.status(500).send({
            success : false,
            message : error });
    }


}


const registrationUser = async (req,res) => {
    const {name,email,password,role,user_image,phone_number,address} = req.body
    const users = await User.findOne({email : req.body.email});
    //findOne returns an object but find returns an array
    
    // const user = await User.aggregate([
    //     {
    //       $match: {
    //         $expr: { $eq: ["$email",email] }
    //       }
    //     }
    //   ]);
        // const user = await User.aggregate([
    //     {
    //       $match: {
    //         email : email
    //       }
    //     }
    //   ]);

    // const user = await User.aggregate([
    //     {
    //       $match: {
    //         email : {$eq : email}
    //       }
    //     }
    //   ]);

    //This also provide the same result..but returns an array
    if(typeof users?.email === "string") {
        return res.status(201).send({
            message : "This Email was Already Used"
          });
    }

    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    try {
        const newUser = new User({
           user_id : uuidv4(),
           name,
           email,
           password : hash,
           role,
           user_image,
           phone_number,
           address

        });
        const userData = await newUser.save();
        if(userData) {
            res.status(200).send({
                success: true,
                message: "User is created Successfully",
                user : {
                  email
                }
            });
        } else {
            res.status(200).send({message : "Data was not successfully posted"});
        }
    } catch (error) {
        res.status(500).send({message : error});
        
    }
})
}

const loginUser = async (req,res) => {
    const {email,password} = req.body;
        const user = await User.aggregate([
        {
          $match: {
            email : {$eq : email}
          }
        }
      ]);
    
    if(user.length===0) {
      return res.status(201).send({
        success : false,
        message : "User is not found"
      })
    }
    if (!bcrypt.compareSync(password, user[0]?.password)) {
      return res.status(201).send({
        success: false,
        message: "Incorrect password",
      });
    }
  
    const payload = {
      user_id: user[0].user_id,
      name: user[0].name,
      role : user[0].role
    };
  
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });
  
  
      return res.status(200).send({
        success: true,
        message: "User is logged in successfully",
        userinfo:{
            name:user[0].name,
            user_id:user[0].user_id,
            role : user[0].role
          },
        token: "Bearer " + token,
      });  
  }

  //check admin middleware
const isAdmin = (req,resp,next) => {

    let token = req.headers['authorization'];
    if(token) {
      token = token.split(' ')[1];
      jwt.verify(token,process.env.SECRET_KEY,(err,valid)=> {
        if(err) {
          resp.send({result : "please provide valid token"});
        } else {
            let decode;
            decode = jwt.decode(token);
            req.info = decode;    
             if(decode.role==='admin') { 
                next();
             } else {
                  resp.send({
                    message : "admin is not verified"
                  })
             }
        }
      })
  
    } else {
      resp.send({result : "please add token with header"});
    }
  }
  
  //check customer middleware
  const isCustomer = (req,resp,next) => {
  
      let token = req.headers['authorization'];
      if(token) {
        token = token.split(' ')[1];
        jwt.verify(token,process.env.SECRET_KEY,(err,valid)=> {
          if(err) {
            resp.send({result : "please provide valid token"});
          } else {
              let decode;
              decode = jwt.decode(token);
              req.info = decode;    
               if(decode.role==='customer') { 
                  next();
               } else {
                    resp.send({
                      message : "customer is not verified"
                    })
               }
          }
        })
    
      } else {
        resp.send({result : "please add token with header"});
      }
    }

const updateUser = async (req,res) => {
    try {
        const user = await User.findOne({id : req.params.id});
        user.name = req.body.name;
        user.age = req.body.age;
        const userData = await user.save();
        if(userData) {
            res.status(200).send(user);
        } else {
            res.status(200).send({message : "Data was not successfully updated"});
        }
    } catch (error) {
        res.status(500).send({message : error});
        
    }
}

module.exports = {getAllUser,registrationUser,getSingleUser,deleteUser,updateUser,loginUser,isAdmin,isCustomer}