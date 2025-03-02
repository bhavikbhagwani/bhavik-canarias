import path from 'path'
import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import flightRoutes from "./routes/flight.routes.js";
import seatRoutes from "./routes/seat.routes.js"
import messageRoutes from "./routes/message.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";

import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const PORT = process.env.PORT || 5005;

const __dirname = path.resolve();

const app = express()

app.use(express.json()); // to parse the incoming requests iwith JSON payloads (from req.body)
app.use(cookieParser());



app.use("/api/auth", authRoutes)
app.use("/api/flight", flightRoutes)
app.use("/api/booking", bookingRoutes)
app.use("/api/seat", seatRoutes)
app.use("/api/message", messageRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

app.listen(PORT, () => {
    connectToMongoDB()
    console.log(`Server is running on port ${PORT}`)
})