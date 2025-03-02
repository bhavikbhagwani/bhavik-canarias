import { useState } from "react"
import toast from 'react-hot-toast'

const useSearchFlights = () => {


    const [loading, setLoading] = useState(false)
    const [flights, setFlights] = useState([])

    const searchFlights = async (departureAirport, destinationAirport, departureDate, numPassengers) => {
        
        console.log("Request body:", { departureAirport, destinationAirport, departureDate, numPassengers });

        const success = handleInputErrors(departureAirport, destinationAirport, departureDate, numPassengers)

        if (!success) return;

        setLoading(true)

        try{
            const response = await fetch("api/flight/getFlights", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    departureAirport,
                    destinationAirport,
                    departureDate,
                    numPassengers,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setFlights(data);
            } 
            // else {
            //     toast.error(data.message || "Something went wrong");
            // }

            console.log("Response data:", data);
    
        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false)
        }

    }
    return { loading, flights, searchFlights}
}

export default useSearchFlights


function handleInputErrors(departureAirport, destinationAirport, departureDate, numPassengers){
    if(!departureAirport || !destinationAirport || !departureDate || !numPassengers){
        toast.error('Please fill in all fields')
        return false;
    }

    return true
}