import bycrypt from "bcryptjs";
import Flight from "../models/flight.model.js";


export const addFlight = async (req, res) => {
    try {
        const { flightNumber, departureAirport, destinationAirport,
            departureTime, arrivalTime, price, totalSeats, availableSeats, bookedSeats } = req.body;

        // Check for missing fields
        if (!flightNumber || !departureAirport || !destinationAirport || !departureTime || 
            !arrivalTime || !price || !totalSeats || !availableSeats) {
            return res.status(400).json({ error: "Some fields are missing" });
        }

        // Validate date format
        if (!Date.parse(departureTime) || !Date.parse(arrivalTime)) {
            return res.status(400).json({ error: "Invalid date format. Use ISO 8601, e.g., 2025-01-07T08:00Z" });
        }

        // Check if the flight already exists
        const flight = await Flight.findOne({ flightNumber });
        if (flight) {
            return res.status(400).json({ error: "Flight already exists" });
        }

        // Ensure bookedSeats is an array (default to empty array if not provided)
        const bookedSeatsArray = Array.isArray(bookedSeats) ? bookedSeats : [];

        // Create new flight
        const newFlight = new Flight({
            flightNumber,
            departureAirport,
            destinationAirport,
            departureTime,
            arrivalTime,
            price,
            totalSeats,
            availableSeats,
            bookedSeats: bookedSeatsArray // Include bookedSeats
        });

        // Save the new flight
        await newFlight.save();

        res.status(201).json({
            _id: newFlight._id,
            flightNumber: newFlight.flightNumber,
            departureAirport: newFlight.departureAirport,
            destinationAirport: newFlight.destinationAirport,
            departureTime: newFlight.departureTime,
            arrivalTime: newFlight.arrivalTime,
            price: newFlight.price,
            totalSeats: newFlight.totalSeats,
            availableSeats: newFlight.availableSeats,
            bookedSeats: newFlight.bookedSeats // Include bookedSeats in response
        });

    } catch (error) {
        console.error("Error in addFlight controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getFlights = async (req, res) => {
    try{

        const {departureAirport, destinationAirport, departureDate, numPassengers} = req.body;

        // Validate input
        if (!departureAirport || !destinationAirport || !departureDate || !numPassengers) {
            return res.status(400).json({ error: "All fields are required: departureAirport, destinationAirport, departureDate, numPassengers" });
        }

        if (numPassengers <= 0) {
            return res.status(400).json({ error: "Number of passengers must be greater than 0" });
        }

        // Ensure departureDate is a valid ISO date
        if (!/^\d{4}-\d{2}-\d{2}$/.test(departureDate)) {
            return res.status(400).json({ error: "Invalid departureDate format. Use 'YYYY-MM-DD'" });
        }

        // Build query to retrieve flights
        const query = {
            departureAirport: departureAirport.trim(),
            destinationAirport: destinationAirport.trim(),
            departureTime: {
                // Match only the date portion of the departureTime
                $gte: new Date(`${departureDate}T00:00:00.000Z`),
                $lt: new Date(`${departureDate}T23:59:59.999Z`)
            },
            availableSeats: { $gte: numPassengers }
        };

        // Query MongoDB for matching flights
        const flights = await Flight.find(query);

        // Check if flights were found
        if (flights.length === 0) {
            return res.status(404).json({ error: "No flights found matching the criteria" });
        }

        // Return the list of flights
        res.status(200).json(flights);

        

    } catch (error){
        console.log("Error in getFlights controller: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }

}
