const express = require("express")
const router = express.Router();
const User = require('../models/User'); 
const { body, validationResult } = require('express-validator');

//Create a user using POST: "/api/auth/createuser". doesn't require auth. No login required

router.post('/createuser',[
    body('name','Enter a valid Name').isLength({ min: 3 }),
    body('email','Enter a valid Email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 })
],async (req,res)=>{
  //if there are errors return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check whether the user with exits already

    try {
      let user = await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).json({error:"sorry a user with the entered email already exist"})
    }
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      // .then(user => res.json(user))
      // .catch(err =>console.log(err))
    res.send("done")
    } catch ( error) {
      console.log(error.message)
      res.status(500).send("Some error occured")
    }
    
})

module.exports = router