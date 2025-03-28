import axios from 'axios';
import { flightsToAdd } from './flightsToAddSample.js';

const addFlights = async () => {
    const url = 'http://localhost:5005/api/flight/addFlight';

    try {
        for (const flight of flightsToAdd) {
            // Send a POST request to add each flight
            const response = await axios.post(url, flight);

            console.log(`Flight ${flight.flightNumber} added successfully:`, response.data);
        }
    } catch (error) {
        console.error("Error adding flights:", error.message);
    }
};


addFlights();
