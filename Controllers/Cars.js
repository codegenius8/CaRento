require('dotenv').config()
const Cars = require("../Model/CarSchema");

const Bookings = require("../Model/bookingSchema");
const stripe = require("stripe")(
  process.env.STRIPE_SECRETE_KEY
);
const { v4: uuidv4 } = require("uuid");
const logger = require("../logger");
const { createError } = require('../utills/error');

exports.getAllCars = async (req, res,next) => {
   
  // const failed = true

  // if(failed) return createError(401, "you are not authenticated !")

  try {
    const cars = await Cars.find({});
    res.status(200).send(cars);
  } catch (error) {
   
    logger.customerLogger.log("error","error in getting cars", error);
    return next(error)
  }
};
//car book
exports.bookCar = async (req, res,next) => {
  const { token } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charges = await stripe.paymentIntents.create(
      {
        payment_method: customer.default_source,
        amount: req.body.totalAmount,
        currency: "inr",
        customer: customer.id,
        payment_method_types: ["card"],
        receipt_email: token.email,
        off_session: true,
        confirmation_method: "manual",
        confirm: true,
        description: "Service Charge",
        shipping: {
          name: "Jenny Rosen",
          address: {
            line1: "510 Townsend St",
            postal_code: "98140",
            city: "San Francisco",
            state: "CA",
            country: "US",
          },
        },
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (charges) {
      req.body.transactionId = charges.id;
      const newBooking = new Bookings(req.body);
      await newBooking.save();
      const car = await Cars.findOne({ _id: req.body.car });

      await car.bookedTimeSlots.push(req.body.bookedTimeSlots);
      await car.save();
      res.status(200).send("your booking is successfull");
    } else {
      logger.customerLogger.log("error","error in booking car", error);
    }
  } catch (error) {
    
    console.log(error);
    logger.customerLogger.log("error","error in booking car", error);
    return next(error)
  }
};

exports.getAllBookedCars = async (req, res,next) => {
  try {
    const bookedCars = await Bookings.find().populate("car");
    // console.log("first",bookedCars)
    res.status(200).send(bookedCars);
  } catch (error) {
    logger.customerLogger.log("error","error in getting booked cars", error);
    return next(error)
  }
};

exports.addCar = async (req, res,next) => {
  try {
    const newCar = new Cars(req.body);
    await newCar.save();
    res.status(200).send("new car added successfully");
  } catch (error) {
    logger.customerLogger.log("error","error in adding cars", error);
    return next(error)
  }
};

exports.editCar = async (req, res,next) => {
  try {
    const car = await Cars.findOne({ _id: req.body._id });
    car.name = req.body.name;
    car.image = req.body.image;
    car.fuelType = req.body.fuelType;
    car.rentPerHour = req.body.rentPerHour;
    car.capacity = req.body.capacity;

    await car.save();

    res.status(200).send("car edited successfully");
  } catch (error) {
    logger.customerLogger.log("error","error in editing cars", error);
    return next(error)
  }
};

exports.deleteCar = async (req, res,next) => {
  
  try {
   await Cars.findByIdAndDelete( { _id : req.body.carId});

    res.status(200).send("car deleted successfully");
  } catch (error) {
    logger.customerLogger.log("error","error in deleting cars", error);
    return next(error)
  }
};
