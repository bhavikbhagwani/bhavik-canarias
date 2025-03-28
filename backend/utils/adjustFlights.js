import { flightsToAdd } from "./flightsToAddSample.js";

// Function to adjust the flight information and generate return flights
function adjustFlightSchedule(flights) {
    let updatedFlights = [];
  
    flights.forEach(flight => {
        // Extract flight number suffix and generate a new one
        const flightNumberSuffix = flight.flightNumber.slice(-3);  // Last 3 digits
        const newFlightNumber = `${flight.departureAirport}-${flight.destinationAirport}-${(parseInt(flightNumberSuffix) + 2).toString().padStart(3, '0')}`;
  
        // Parse original departure and arrival times
        let departureTime = new Date(flight.departureTime);
        let arrivalTime = new Date(flight.arrivalTime);
  
        // Move flight to the next day
        departureTime.setUTCDate(departureTime.getUTCDate() + 1);
        arrivalTime.setUTCDate(arrivalTime.getUTCDate() + 1);
  
        // Format date as "YYYY-MM-DDTHH:mmZ"
        const formatDate = (date) => date.toISOString().slice(0, 16) + "Z";
  
        // Create the updated flight (original direction)
        updatedFlights.push({
            flightNumber: newFlightNumber,
            departureAirport: flight.departureAirport,
            destinationAirport: flight.destinationAirport,
            departureTime: formatDate(departureTime),
            arrivalTime: formatDate(arrivalTime),
            price: flight.price,
            totalSeats: flight.totalSeats,
            availableSeats: flight.availableSeats,
            bookedSeats: flight.bookedSeats
        });

    });

    return updatedFlights;
}


// Example of flight array to be adjusted
const flights = flightsToAdd

const updatedFlights = adjustFlightSchedule(flights);

console.log("")
// Output the updated flights
console.log(JSON.stringify(updatedFlights));

console.log("")

// console.log(updatedFlights.length)

// console.log(updatedFlights.slice(-8))
