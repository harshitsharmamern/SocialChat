const express = require("express");

const app = express.Router();
const jwt = require('jsonwebtoken');
const isAuthenticated = require("./middleware")
const user_model = require("../model/user_schema")
/*
////registration -> model, create, jwt.sing(data) 
login-> model ,jwt ,  
home -> middleware
*/
app.post("/registration",async(req,res)=>{
    const {name,email,password} = req.body;
    // console.log(req.body)
    try{
        const user_exist = await user_model.find({email : email})
        console.log(user_exist)
        if(user_exist.length==0){
            
            const user_data = await user_model.create({Name : name,email,password})
            jwt_obj={
                user_data : user_data
            }
            const auth_token = jwt.sign(jwt_obj, 'your-secret-key');  // data store in token
            res.json({status : true ,user_data ,auth_token})
        }else{
            res.json({status : false , message : "user email already exist"})
        }
    }catch(e){
        console.log(e)
    }
})
/// login
app.post("/user_login",async(req,res)=>{
//authToken, currUser
    const find_email = await user_model.findOne({ email: req.body.email })
    // res.json(find_email)
if (!find_email) {
       res.json({ status: false, msg: "this email not exist" })
    }else{
        if(req.body.password===find_email.password){
            jwt_obj={
                user_data : find_email
            }

            const auth_token = jwt.sign(jwt_obj, 'your-secret-key');
            res.json({ status: true,currUser : find_email,authToken :auth_token})
        }else{
            res.json({ status: false, message:"password is incorrct" })
        }
    }
})

///see data


app.get("/user_home" ,isAuthenticated,async(req,res)=>{
    const user_data =  await user_model.find({});   
    return res.json({status : true , user_data,currUser : req.mongo, message : "you r in home page"})
  })




module.exports = app