const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authrouter = require("./routes/authRoutes/auth.route");
const adminrouter = require("./routes/adminRoutes/adminroute");
const userrouter = require("./routes/userRoutes/userroute");
const app = express();
require("./config/db");
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.use("/",authrouter);
app.use("/",adminrouter);
app.use("/",userrouter);

app.get("/",(req,res)=> {
    res.send("Hi Server is running successfully")
})

//router error
app.use((req,res,next)=> {
    res.status(404).json({
        message : "router not found"
    });
})

//server error
app.use((err,req,res,next)=> {
    res.status(500).json({
        message : "server error"
    });
})
module.exports = app;
