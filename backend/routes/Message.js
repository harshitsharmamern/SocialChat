const express = require("express");
const app = express.Router();
const isAuthenticated = require("./middleware");
// const chatSchema = require("../model/Chat");
const messageSchema = require("../model/message") 

app.get("/get/:ChatId",isAuthenticated,async (req,res)=>{
    const chatid = req.params.ChatId
    // console.log("messages-route",chatid);/
    
    try{
        const data = await messageSchema.find({chat:chatid})
        .populate("sender","Name _id email")
        .populate("chat")

        return res.json({data})
    }catch(e){
         console.log(e);
         
    }
    })

    app.post("/send",isAuthenticated,async(req,res)=>{
        const chatid = req.body.ChatId
        const content = req.body.content;
        const sender_id = req.body.sender_id;
        
        // console.log({chatid,content,sender_id});
        // messageSchema
        try{
        let message =  await messageSchema.create({
            sender: sender_id,
            content : content,
            chat : chatid
          })
          message = await messageSchema.findById(message._id)
          .populate("sender", "Name _id email")
          .populate("chat");
        //   console.log("success message send",data);
          
          return res.json({data : message})
        }catch(e){
            // console.log(e);
            res.json("err",e)
        }
        
        })

app.get("/delete",async(req,res)=>{
    try {
        const result = await messageSchema.deleteMany({});  // Deletes all documents in the collection
        res.status(200).json({ message: "All messages deleted successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete messages", error });
    }
})

module.exports = app;

// //sender : {
//     type : mongo,
//     ref : 'user'
// },
// content : {type : String},
// chat : {