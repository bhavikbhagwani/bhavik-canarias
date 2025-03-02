import express from "express";
import { cancelBooking, createBooking, getUserBookings, removeBooking } from "../controllers/booking.controller.js";
import protectRoute from "../middleware/protectRoute.js";


const router = express.Router();


router.post("/createBooking", protectRoute, createBooking)
// router.get("/:bookingReference", retrieveBooking)
router.get("/myBookings", protectRoute, getUserBookings)

router.patch("/cancelBooking", protectRoute, cancelBooking)

router.delete("/removeBooking", protectRoute, removeBooking)


export default router;