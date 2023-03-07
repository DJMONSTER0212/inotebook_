const express = require("express")
const router = express.Router();
const User = require('../models/User'); 

//Create a user using POST: "/api/auth/". doesn't require auth

router.post('/',(req,res)=>{
    obj  = {
        a:'aoiuf',
        number:219
    }
    console.log(req.body)
    const user = User(req.body);
    user.save();
    res.json(obj)
})

module.exports = router