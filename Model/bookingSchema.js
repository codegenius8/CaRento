const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    car: { type: mongoose.Schema.Types.ObjectId, ref: "cars" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    bookedTimeSlots: {
      from: { type: String }, 
      to: { type: String }
     },
    totalHour: { type: Number },
    totalAmount: { type: Number },
    transactionId: { type: String },
    driverRequire: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bookings", bookingSchema);
