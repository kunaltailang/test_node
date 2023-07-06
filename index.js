const express = require('express');
const { Connection } = require('./config/db');
const { User } = require('./models/User.model');
const { Product } = require('./models/Product.model');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')

const app = express();
app.use(cookieParser())
app.use(express.json()) // middleware


app.get("/",(req,res)=>{
    // const {your} = req.body;

    if(true){
        return res.status(200).json({"Message":"Our server has been successfully created"})
    }else{
        return res.status(500).json({"error":"you are not authrized"})
    }
})

app.post("/register",async (req,res)=>{
    const {username,password} = req.body;

      try {

        const hashPass = await bcrypt.hash(password, 10);
         const user = await User({
            username,
            password : hashPass
         });
         await user.save();
         return res.status(200).json({"message":"user registered success","user":user})
      } catch (error) {
         return res.status(400).json({"error":error})
      }
})

// let loginID = ""

app.post("/login",async(req,res)=>{
    const {username,password} = req.body;
    try {


        const user = await User.findOne({username:username});
        
        if(user){
            const match = await bcrypt.compare(password,user.password)
            if(match){
                res.cookie('user_id',user._id);

                return res.status(200).json({"User":user,"login":"login success"})
            }else{
                return res.status(500).json({"error":"Invalid password"})
            }
        }
        else{
            return res.status(400).json({"message":"User not found"})
        }
    } catch (error) {
        return res.status(500).json({"error" : error})
    }
})

app.post("/product",async(req,res)=>{
    let loginID  = req.cookies.user_id;
    
    try {
        const user = await User.findOne({_id:loginID})
        if(user){

            const product = new Product({
                name : req.body.name,
                description:req.body.description,
                price:parseInt(req.body.price),
                userID:loginID
            })
            
            await product.save();
            return res.status(200).json({"message":"Product added success","product":product});
        }else{
            return res.status(201).json({"error":"User not found"})
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})


app.listen(3000, async()=>{
    try {
        await Connection;
        console.log("DB connected Success")
    } catch (error) {
        console.log(error)
    }
    console.log("Server is Running on port 3000")
})


