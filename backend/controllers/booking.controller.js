import Flight from "../models/flight.model.js";
import Booking from "../models/booking.model.js";
import User from "../models/user.model.js";

import sgMail from '@sendgrid/mail';
import { getDateFormatFromDate, getFlightDuration, getTimeFromDate } from "../utils/timeFunctions.js";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);  // Use API key from environment


export const createBooking = async (req, res) => {
    try {
        const {
            bookingReference,
            flightNumber,
            passengers,
            contactDetails,
            totalPrice,
            fareType,
            extraLuggage,
            status
        } = req.body;


        const userId = req.user._id;
        
        // Validate required fields
        if (!userId || !bookingReference || !flightNumber || !passengers || !passengers.length || !contactDetails || totalPrice === undefined || !fareType || extraLuggage === undefined) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Fetch the user details to get their full name
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const fullName = user.fullName; // Assuming your User model has a 'fullName' field
  
        // Check if the flight exists
        const flight = await Flight.findOne({ flightNumber });
        if (!flight) {
            return res.status(404).json({ error: "Flight not found" });
        }

        // Extract flight details
        const { departureAirport, destinationAirport, departureTime, arrivalTime } = flight;
  
        // Check if there are enough seats available
        const totalSeatsRequested = passengers.length;
        if (flight.availableSeats < totalSeatsRequested) {
            return res.status(400).json({ error: "Not enough seats available" });
        }
  
        // Extract the seats from the passengers
        const bookedSeats = passengers.map(passenger => passenger.seat);
  
        // Add the new booked seats to the flight's bookedSeats array
        flight.bookedSeats = [...flight.bookedSeats, ...bookedSeats];
  
        // Create the booking
        const newBooking = new Booking({
            user: userId,
            bookingReference,
            flight: flight._id,
            passengers,
            contactDetails,
            totalPrice,
            fareType,
            status: status || "Confirmed", // Default to "Confirmed" if not provided
            extraLuggage // Include the extraLuggage field
        });

  
        // Save the booking
        await newBooking.save();

        // Update the user's userBookings array to include the new booking ID
        await User.findByIdAndUpdate(userId, {
            $push: { userBookings: newBooking._id } // Add booking ID to the user's bookings
        }); 
  
        // Update the flight's available seats
        flight.availableSeats -= totalSeatsRequested;
        await flight.save();

        const emailSendingBookingObject = {
            fullName: fullName,
            flightNumber: flightNumber,
            bookingReference: bookingReference,
            passengers: passengers,
            email: contactDetails.email,
            totalPrice: totalPrice,
            fareType: fareType,
            departureAirport: departureAirport,
            destinationAirport: destinationAirport,
            departureTime: departureTime,
            arrivalTime: arrivalTime
        }

        await sendEmailConfirmation(emailSendingBookingObject)
  
        res.status(201).json({
            message: "Booking successfully created",
            booking: newBooking
        });
    } catch (error) {
        console.error("Error in createBooking controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  
export const getUserBookings = async (req, res) => {

    try {

        const userId = req.user._id;
        const bookings = await Booking.find({ user: userId })
        .populate('flight') // Populate the flight details
        .sort({ createdAt: -1 });

        res.status(200).json(bookings);

    } catch (error) {
        console.error("Error in getUserBookings controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const cancelBooking = async (req, res) => {

    try {

        const {bookingReference} = req.body

        if (!bookingReference){
            return res.status(400).json({ error: "Booking reference is required" });
        }

        const updatedBooking = await Booking.findOneAndUpdate(
            { bookingReference }, 
            { status: "Cancelled" }, 
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ error: "Booking was not found" });
        }

        // get seats from the passengers that cancelled
        const cancelledSeats = updatedBooking.passengers.map(passenger => passenger.seat)


        // get corresponding flight using flight id of booking
        const flightId = updatedBooking.flight
        const flight = await Flight.findById(flightId)


        if (!flight) {
            return res.status(404).json({ error: "Flight not found" });
        }

        // Get the user's full name using the userId from the booking
        const userId = updatedBooking.user;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const { fullName} = user; // Extract full name and email of the user

        // Get email from the updatedBooking object
        const email = updatedBooking.contactDetails?.email;

        if (!email) {
            return res.status(404).json({ error: "Email not found in booking" });
        }

        // Get flight details
        const { flightNumber, departureAirport, destinationAirport, departureTime, arrivalTime } = flight;

        // Get the booking details
        const { totalPrice, fareType, passengers } = updatedBooking;

        // Increase the available seats of the flight
        flight.availableSeats += cancelledSeats.length;

        // Update bookedSeats
        flight.bookedSeats = flight.bookedSeats.filter(seat => !cancelledSeats.includes(seat));

        await flight.save();

        const emailSendingBookingObject = {
            fullName: fullName,
            email: email,
            flightNumber: flightNumber,
            bookingReference: bookingReference,
            passengers: passengers,
            totalPrice: totalPrice,
            fareType: fareType,
            departureAirport: departureAirport,
            destinationAirport: destinationAirport,
            departureTime: departureTime,
            arrivalTime: arrivalTime
        }

        await sendEmailConfirmationForCancellation(emailSendingBookingObject)

        res.status(200).json({ message: "Booking cancelled successfully", booking: updatedBooking });

        

    } catch (error) {
        console.error("Error in cancelBooking controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const removeBooking = async (req, res) => {
    try{

        const { bookingReference } = req.body;
        const userId = req.user._id;

        if (!bookingReference) {
            return res.status(400).json({ error: "Booking reference is required" });
        }

        // Find the booking by reference
        const booking = await Booking.findOne({ bookingReference });

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        // Delete the booking
        await Booking.deleteOne({ _id: booking._id });

        // Remove the booking ID from the user's userBookings array
        await User.findByIdAndUpdate(userId, {
            $pull: { userBookings: booking._id }
        });

        res.status(200).json({ message: "Booking successfully removed" });

    }catch (error){
        console.error("Error in removeBooking controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


const sendEmailConfirmation = async (emailSendingBookingObject) => {

    const { fullName, flightNumber, bookingReference, passengers, email, totalPrice, fareType, departureAirport, destinationAirport, departureTime, arrivalTime } = emailSendingBookingObject;
    
    const msg = {
        to: email,
        from: {
            name: 'Bhavik Canarias',
            email: process.env.FROM_EMAIL
        },
        subject: 'Booking Confirmation',
        templateId: process.env.TEMPLATE_ID_CREATE_BOOKING,
        dynamicTemplateData:{
            fullName: fullName,
            flightNumber: flightNumber,
            bookingRef: bookingReference,
            totalPrice: totalPrice,
            fareType: fareType,
            departureAirport: departureAirport,
            destinationAirport: destinationAirport,
            date: getDateFormatFromDate(departureTime),
            departureTime: getTimeFromDate(departureTime),
            arrivalTime: getTimeFromDate(arrivalTime),
            duration: getFlightDuration(departureTime, arrivalTime),
            passengers: passengers
        }
    };
    
    try {
        await sgMail.send(msg);
        console.log(`email sent to ${email}`);
    } catch (error) {
        console.error(`Error sending email to ${email}:`, error);
        throw new Error(`Failed to send email`);
    }

}
const sendEmailConfirmationForCancellation = async (emailSendingBookingObject) => {

    const { fullName, flightNumber, bookingReference, passengers, email, totalPrice, fareType, departureAirport, destinationAirport, departureTime, arrivalTime } = emailSendingBookingObject;
    
    const msg = {
        to: email,
        from: {
            name: 'Bhavik Canarias',
            email: process.env.FROM_EMAIL
        },
        subject: 'Booking Cancellation Confirmation',
        templateId: process.env.TEMPLATE_ID_CANCELLATION,
        dynamicTemplateData:{
            fullName: fullName,
            flightNumber: flightNumber,
            bookingRef: bookingReference,
            totalPrice: totalPrice,
            fareType: fareType,
            departureAirport: departureAirport,
            destinationAirport: destinationAirport,
            date: getDateFormatFromDate(departureTime),
            departureTime: getTimeFromDate(departureTime),
            arrivalTime: getTimeFromDate(arrivalTime),
            duration: getFlightDuration(departureTime, arrivalTime),
            passengers: passengers
        }
    };
    
    try {
        await sgMail.send(msg);
        console.log(`email sent to ${email}`);
    } catch (error) {
        console.error(`Error sending email to ${email}:`, error);
        throw new Error(`Failed to send ${subject} email`);
    }

}