const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fectuser = require('../middleware.js/fetchuser')

const JWT_sceret = 'bvr12345'

// <-----------------------------------Signup ---------------------------------->
// Route-1: Create a user using POST "/api/auth/createuser", no Login require
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let sucees = false ;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ sucees,errors: errors.array() });
  }

  try {
    // finding if user exits with this email 
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ sucees ,error: "user with this email alrrady exists" })
    }
    const salt = await bcrypt.genSaltSync(10);
    const secpass = await bcrypt.hash(req.body.password, salt)
    // create a new user 
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secpass
    });
    const data = {
      user: {
        id: user.id
      }
    }
    // creating auth token 
    const authtoken = jwt.sign(data, JWT_sceret)
    sucess = true 
    res.json({ sucess, authtoken });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// <---------------------------Login---------------------------->
// Route-2: Create a user using POST "/api/auth/login", no login require 
router.post('/login', [
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password cant be blank').exists(),
], async (req, res) => {
  let sucees = false ;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ sucees,errors: errors.array() });
  }
  const { email, password } = req.body
  try {

    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ sucees, error: "please try to login with correct credintials" });
    }
    const passwordcompare = await bcrypt.compare(password, user.password);
    if (!passwordcompare) {
      return res.status(400).json({ sucees , error: "please try to login with correct credintials" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_sceret)
    sucess = true 
    res.json({ sucess, authtoken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route -3 : getting logged in user deatils  using POST "/api/auth/getuser",  login require 
router.post('/getuser', fectuser, async (req, res) => {
  try {
    const Userid = req.user.id
    const user = await User.findById(Userid).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;