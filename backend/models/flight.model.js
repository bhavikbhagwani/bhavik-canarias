import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true },
  departureAirport: { type: String, required: true },
  destinationAirport: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  price: { type: Number, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  bookedSeats: { type: [String], default: [] },
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
export default Flight;