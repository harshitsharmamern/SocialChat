const express = require("express");


var jwt = require('jsonwebtoken');
var jwt_screte="your-secret-key"

const isAuthenticated=(req,res,next)=>{
      
    const token = req.header("auth-token")
     if(!token){
      return  res.json({status:false,message:'you mst be logedin to access'})
      }
    
      try{
          const data = jwt.verify(token,jwt_screte)
          req.mongo = data
        //   console.log("correct");
           
          next()
          
        }catch(e){
            return  res.json({status:false,message:'your token is wrong'})
        }
      
     ///req.heder ( "conte" : json , authetion-token : "" )
}
module.exports = isAuthenticated