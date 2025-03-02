import express from "express";

import { addFlight, getFlights } from "../controllers/flight.controller.js";

const router = express.Router();

router.post("/addFlight", addFlight)
router.post("/getFlights", getFlights)


export default router;