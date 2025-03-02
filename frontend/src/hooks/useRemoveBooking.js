import { useState } from "react"
import toast from 'react-hot-toast'

const useRemoveBooking = () => {


    const [loading, setLoading] = useState(false)
    const [brError, setBrError] = useState("")

    const removeBooking = async (bookingReference) => {

        if (!bookingReference.trim()) {
            console.log("if statement entered")
            setBrError("Please enter a booking reference.");
            return false;
        }
        setLoading(true)
        setBrError("")

        try{

            const response = await fetch("/api/booking/removeBooking", {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ bookingReference }),
            });
    
            const data = await response.json();

            if (!response.ok) {
                setBrError(data.error || "Failed to remove booking");
                return false;
            }

            toast.success("Booking successfully removed");
            return true;

        } catch (error) {
            setBrError(error.message);
            toast.error(error.message)
        } finally{
            setLoading(false)
        }

    }
    return { loading, brError, removeBooking}
}

export default useRemoveBooking;


