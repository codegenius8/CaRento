require("dotenv").config()
const logger = require("../logger");
const User = require("../Model/userSchema");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');
exports.registerUser = async (req, res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors)
  }
  const { username, password } = req.body;
  // console.log("username",username)
  try {
    const newuser = new User(req.body);
    await newuser.save();
    res.status(200).send("user registered successfully");
  } catch (error) {
    res.status(401).send("error in registering user", error);
    logger.customerLogger.log("error", "error in registering user", error);
     return next(error)
  }
};

exports.loginUser = async (req, res,next) => {
  const { username, password } = req.body;
  console.log(username, password);
let user
  try {
     user = await User.findOne({ username, password });
    
  } catch (error) {
    res.status(500).send("Logging in failed, please try again later.");
    logger.customerLogger.log(
      "error",
      "Logging in failed, please try again later.",
      error
    );
    return next(error)
  }

  let token;
  try {
    token = jwt.sign(
      { userId: user._id, user: user.username },
        process.env.AUTH_SECRETE,
      // { expiresIn: "60s" }
    );
  } catch (error) {
    logger.customerLogger.log(
      "error",
      "Logging in failed, please try again later.",
      error
    );
  }

  if (user === null) {
    res.status(401).send("Invalid credentials");
    logger.customerLogger.log(
      "error",
      "Invalid credentials, could not log you in."
    );
  } else {
    res.status(200).send({user : user, token : token})
  }

  
};
