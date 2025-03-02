import { useState } from "react"
import toast from 'react-hot-toast'

const useCancelBooking = () => {


    const [loading, setLoading] = useState(false)
    const [brError, setBrError] = useState("")

    const cancelBooking = async (bookingReference) => {

        if (!bookingReference.trim()) {
            console.log("if statement entered")
            setBrError("Please enter a booking reference.");
            return false;
        }
        console.log("if statement not entered")
        setLoading(true)
        setBrError("")

        try{

            const response = await fetch("/api/booking/cancelBooking", {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ bookingReference }),
            });
    
            const data = await response.json();

            if (!response.ok) {
                setBrError(data.error || "Failed to cancel booking");
                return false;
            }

            toast.success("Booking successfully cancelled");
            return true;

        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false)
        }

    }
    return { loading, brError, cancelBooking}
}

export default useCancelBooking;


