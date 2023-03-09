const express = require("express")
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//Create a user using POST: "/api/auth/createuser". doesn't require auth. No login required

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
    res.send(req.body)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
  }

})

module.exports = router