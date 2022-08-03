require("dotenv").config()
const mongoose = require("mongoose");
function connectDb() {
  mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log("mongoDb connection successful");
  });

  connection.on("error", () => {
    console.log("error in mongoDb connection");
  });
}
connectDb();

module.exports = mongoose;
