import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
        minlength:6
    },
    userBookings: {
        type: [mongoose.Schema.Types.ObjectId], // Array of Booking IDs
        ref: "Booking",
        default: [] // Initialize as an empty array
    }
    // createdAt, updatedAt => member since <createdAt>
}, {timestamps: true})

const User = mongoose.model("User", userSchema);

export default User;