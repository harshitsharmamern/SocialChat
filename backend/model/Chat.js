// const mongoose = require("mongoose");
const mongoose = require("mongoose");
const mongo = mongoose.Types.ObjectId;
const Chat = mongoose.Schema({
  
    chatname : {type : String},
    users : [
        {type : mongo , ref : 'user'}
    ],
    lastmessage : { type: mongo,
        ref: 'message',}

},{
    timestamps: true,
  });
const userregis = mongoose.model("Chat", Chat);

module.exports = userregis;
