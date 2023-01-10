const express = require("express")
const { getAllCars,bookCar,getAllBookedCars,addCar, editCar, deleteCar } = require("../Controllers/Cars")
const router = express.Router()
const checkAuth = require("../middleware/check-auth")
//Admin routes for cars
router.post("/addcar",addCar)
router.patch("/editcar",editCar)
router.post("/deletecar",deleteCar)


router.use(checkAuth);
//user routes
router.get("/getallcars",getAllCars)
router.get("/getallbookedcars",getAllBookedCars)
router.post("/bookcar",bookCar)




module.exports = router
