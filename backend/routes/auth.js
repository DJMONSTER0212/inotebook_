const express = require("express")
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchUser = require('../middleware/fetchUser')
//Route 1:Create a user using POST: "/api/auth/createuser". doesn't require auth. No login required
const JWT_SECRET = "HOLOA hola It's the monster haha haha"

router.post('/createuser', [
  body('name', 'Enter a valid Name').isLength({ min: 3 }),
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
  //if there are errors return bad request and the error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // check whether the user with exits already

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "sorry a user with the entered email already exist" })
    }
    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt)  //it returns a promise
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    })
    // .then(user => res.json(user))
    // .catch(err =>console.log(err))
    const data = {
      user:{
        id : user.id
      }
    }
    const authToken = jwt.sign(data,JWT_SECRET)
    console.log(authToken);
    res.json({authToken})
    // res.send(req.body)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server error occured")
  }

})

//Route 2 : Authenticate a user using POST: "/api/auth/login". doesn't require auth. No login required
router.post('/login', [
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error:"Please try to login with correct credentials"});
    }
    const passwordCompare = await bcrypt.compare(password,user.password) // yeah internally hi saare hashes ko match kar le ga
    if(!passwordCompare){
      return res.status(400).json({error:"Please try to login with correct credentials"});
    }
    const data = {
      user:{
        id : user.id
      }
    }
    const authToken = jwt.sign(data,JWT_SECRET)
    res.json({authToken})
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server error occured")
  }
})


// Route 3 : get loggedin user details using POST: "/api/auth/getuser".login required

router.post('/getuser',fetchUser, async (req, res) => {
try {
  let userID = req.user.id 
  const user = await User.findById(userID).select("-password")
  res.send(user)
} catch (error) {
  console.log(error.message)
  res.status(500).send("Internal Server error occured")
}
})
module.exports = router