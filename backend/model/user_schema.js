// const mongoose = require("mongoose");
const mongoose = require("mongoose");
const mongo = mongoose.Types.ObjectId;
const database1 = mongoose.Schema({
  Name: {
    type: String,
    // unique : true
  },
  password :{
    type:String
  },
  email:{
    type:String,
    unique:true
  }


});
const userregis = mongoose.model("user", database1);

module.exports = userregis;
