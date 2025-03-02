import { useState } from "react"
import toast from 'react-hot-toast'

const useCreateBooking = () => {


    const [loading, setLoading] = useState(false)

    const createBooking = async (bookingData) => {

        // Generate bookingReference here
        const bookingReference = generateBookingReference(8); // Adjust length as needed
        bookingData.bookingReference = bookingReference;

        const success = handleInputErrors(bookingData)

        if (!success) return;

        setLoading(true)

        try{

            const res = await fetch("/api/booking/createBooking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData)
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            toast.success("Booking successfully created!");

        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false)
        }

    }
    return { loading, createBooking}
}

export default useCreateBooking;


function handleInputErrors({ flightNumber, passengers, contactDetails }) {
    if (!flightNumber || !passengers?.length || !contactDetails?.email || !contactDetails?.phone) {
        toast.error("Please fill in all required fields");
        return false;
    }
    return true;
}

const generateBookingReference = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};