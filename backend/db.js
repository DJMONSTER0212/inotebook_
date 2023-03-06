const mongoose = require('mongoose')
const uri = "mongodb+srv://DJ0212:devansh%400212@cluster0.djsnamb.mongodb.net/inotebook";

const connectToMongo = async()=>{
    await mongoose.connect(uri)
    console.log("connected Successfully!!")
    
}

module.exports = connectToMongo;