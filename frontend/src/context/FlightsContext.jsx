import React, { createContext, useState, useEffect } from 'react';

// Create context
export const FlightsContext = createContext();

export const FlightsContextProvider = ({ children }) => {
    // Initialize context variables
    const [flights, setFlights] = useState([]);
    const [searchParams, setSearchParams] = useState({
        departureCode: '',
        destinationCode: '',
        dateOfTravel: '',
        numPassengers: 0,
    });

    // Load persisted data from localStorage, but only if available
    useEffect(() => {
        const savedFlights = localStorage.getItem('flights');
        const savedSearchParams = localStorage.getItem('searchParams');

        if (savedFlights) {
            setFlights(JSON.parse(savedFlights));
        }

        if (savedSearchParams) {
            setSearchParams(JSON.parse(savedSearchParams));
        }
    }, []); // Only run once when the component mounts

    // Persist data to localStorage when flights or searchParams change
    useEffect(() => {
        if (flights.length > 0) {
            localStorage.setItem('flights', JSON.stringify(flights));
        }

        if (searchParams.departureCode) {  // Ensure searchParams has some valid data before saving
            localStorage.setItem('searchParams', JSON.stringify(searchParams));
        }
    }, [flights, searchParams]); // Run whenever flights or searchParams change

    return (
        <FlightsContext.Provider value={{ flights, setFlights, searchParams, setSearchParams }}>
            {children}
        </FlightsContext.Provider>
    );
};
