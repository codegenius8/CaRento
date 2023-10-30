const logger = require("../logger");
require("dotenv").config()
const jwt = require("jsonwebtoken");
//verify token
const verifyToken = (req, res, next) => {
  const token = JSON.parse(req.headers.authorization.split(" ")[1]); // Authorization: 'Bearer TOKEN', so we split at the space and take the second element
  // console.log("token", process.env.AUTH_SECRETE);

  if (!token) {
    console.log("======>not token");
    logger.customerLogger.log(
      "error",
      "A token is required for authentication!"
    );
    return res.status(403).send("A token is required for authentication!");
  }
  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRETE);
    // console.log("decoded",  new Date(decoded.exp))

    // req.userData = decoded
    next();
  } catch (error) {
    logger.customerLogger.log(
      "error",
      "A token is required for authentication!",
      error
    );
    return res.status(401).send("Invalid Token");
  }
};

module.exports = verifyToken;
