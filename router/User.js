const express = require("express");
const { loginUser, registerUser } = require("../Controllers/User");
const router = express.Router();
const { check } = require('express-validator');
// user route handler 
router.post("/login", loginUser);
router.post("/register", 
[
    check('username')
      .not()
      .isEmpty(),
      check('password').isLength({ min: 6 })
],
 registerUser);

module.exports = router; 
