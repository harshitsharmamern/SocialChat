// const mongoose = require("mongoose");
const mongoose = require("mongoose");
const mongo = mongoose.Types.ObjectId;
const message = mongoose.Schema({
  
    sender : {
        type : mongo,
        ref : user_schema
    },
    content : {type : String},
    chat : {
        type : mongo,
        ref : Chat
    }
},{
    timestamps: true,
  });
const userregis = mongoose.model("message", message);

module.exports = userregis;
