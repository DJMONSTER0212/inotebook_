const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserSchema = new Schema({
    name:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required : true,
        unique:true
    },
    password:{
        type:String,
        required : true
    },
    date:{
        type : Date,
        default : Date.now
    }
  });
  const User =  mongoose.model("user",UserSchema)
  User.createIndexes(); // iss se saari indexes bun jaayegi aur duplicate email waali problem solve ho jaayegi.
  module.exports =User