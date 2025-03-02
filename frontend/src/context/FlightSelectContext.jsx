import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
export const FlightSelectionContext = createContext();

// Create a provider component
export const FlightSelectionProvider = ({ children }) => {
    // Initialize context variables with localStorage data (if available)
    const [selectedFlight, setSelectedFlight] = useState(() => {
        const savedFlight = localStorage.getItem('selectedFlight');
        return savedFlight ? JSON.parse(savedFlight) : null;
    });

    const [selectedFareType, setSelectedFareType] = useState(() => {
        const savedFareType = localStorage.getItem('selectedFareType');
        return savedFareType ? JSON.parse(savedFareType) : null;
    });

    // Persist selected flight and fare type to localStorage when they change
    useEffect(() => {
        if (selectedFlight) {
            localStorage.setItem('selectedFlight', JSON.stringify(selectedFlight));
        }
    }, [selectedFlight]);

    useEffect(() => {
        if (selectedFareType) {
            localStorage.setItem('selectedFareType', JSON.stringify(selectedFareType));
        }
    }, [selectedFareType]);

    return (
        <FlightSelectionContext.Provider value={{ selectedFlight, setSelectedFlight, selectedFareType, setSelectedFareType }}>
            {children}
        </FlightSelectionContext.Provider>
    );
};

// Custom hook to use the context
export const useFlightSelection = () => useContext(FlightSelectionContext);
