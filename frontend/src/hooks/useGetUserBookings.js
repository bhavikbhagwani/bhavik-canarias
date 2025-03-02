import { useState } from "react";
import toast from "react-hot-toast";

const useGetUserBookings = () => {
    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState([]); // Store fetched bookings

    const getUserBookings = async () => {
        setLoading(true);

        try {
            const res = await fetch("/api/booking/myBookings", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to fetch bookings");
            }

            setBookings(data); // Update state with fetched bookings
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, bookings, getUserBookings };
};

export default useGetUserBookings;
