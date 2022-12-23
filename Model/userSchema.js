const mongoose = require("mongoose");
//schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    cpassword :  { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
