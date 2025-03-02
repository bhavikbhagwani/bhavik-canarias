import mongoose from 'mongoose';

const passengerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    seat: { type: String, required: true }
});

const contactDetailsSchema = new mongoose.Schema({
    email: { type: String, required: true },
    phone: { type: String, required: true }
});

const bookingSchema = new mongoose.Schema(
    {
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",  // Reference to User model
            required: true 
        },
        bookingReference: { type: String, required: true, unique: true },
        flight: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Flight", // Reference to Flight model
            required: true 
        },
        passengers: { type: [passengerSchema], required: true },
        contactDetails: { type: contactDetailsSchema, required: true },
        totalPrice: { type: Number, required: true },
        fareType: { type: String, required: true },
        extraLuggage: { type: [Number], required: true },
        status: { type: String, default: "Confirmed", enum: ["Confirmed", "Cancelled"] }
    },
    { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
