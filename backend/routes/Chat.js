const express = require("express");
const isAuthenticated = require("./middleware");
const chatSchema = require("../model/Chat");
const app = express.Router();
const mongoose = require("mongoose");

app.get('/accessChat',isAuthenticated, async (req, res) => {
    const {userId} = req.body;
    let logedInUserId = req.mongo.user_data._id;
    // console.log(userId);
    
    try{
        const chat = await chatSchema.findOne({
            $and:[
                { users: { $elemMatch: { $eq: userId } } },
                { users: { $elemMatch: { $eq: logedInUserId } } },
            ]
        })
        if(!chat){
            let data={
                chatname:"user",
                users : [userId,logedInUserId]
            }
            const newchat = await chatSchema.create(data)
            return res.json(newchat)
        }
        
        return res.json(chat)
    }catch(e){
        
        console.log(e);
        return ;
    }
});

module.exports = app;