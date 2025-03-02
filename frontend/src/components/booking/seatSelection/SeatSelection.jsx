import React, { useState, useEffect } from "react";
import "./SeatSelection.css";
import toast from 'react-hot-toast'


const SeatSelection = ({ onNext, onBack, numPassengers, passengerData, setPassengerData, bookedSeats }) => {

    const rows = 10;
    const seatsPerRow = ["A", "B", "C", "D", "E", "F"];

    const [seatAssignments, setSeatAssignments] = useState(passengerData.map(() => null));
    const [selectedPassenger, setSelectedPassenger] = useState(0); // First passenger is selected by default

    // Update passengerData when seatAssignments change
    useEffect(() => {
        const updatedPassengerData = passengerData.map((passenger, index) => ({
            ...passenger,
            seat: seatAssignments[index] || "" // Update seat assignment if exists
        }));

        // Only update the passenger data if there is a change to prevent infinite loop
        setPassengerData(updatedPassengerData);
    }, [seatAssignments, setPassengerData]); // Only depend on seatAssignments

    const handleSeatClick = (seat) => {
        if (bookedSeats.includes(seat)) return; // Prevent selecting booked seats

        setSeatAssignments((prev) => {
            let newAssignments = [...prev];

            // If the seat is already assigned to a passenger, remove it
            if (newAssignments.includes(seat)) {
                newAssignments[newAssignments.indexOf(seat)] = null;
                return newAssignments;
            }

            // Assign the seat to the selected passenger
            newAssignments[selectedPassenger] = seat;

            return newAssignments;
        });
    };

    const validateSeatSelection = () => {
        return passengerData.every(passenger => passenger.seat !== "");
    };

    
    const continueButtonClicked = () => {
        if (!validateSeatSelection()) {
            toast.error("Please assign a seat to all passengers before continuing.");
            return; // Stop the function if validation fails
        }
    
        console.log(passengerData);
        onNext(); // Proceed to the next step if all seats are assigned
    };
    

    return (
        <div className="seat_selection_container">
            
            <button className="back_button" onClick={onBack}>BACK</button>

            <div className="seat_selection_heading">
                <h1>Step 2: Seat Selection</h1>
                <p>Please select a passenger, then choose a seat.</p>
                <p>Selecting a seat in the first or last row costs an extra 20$</p>
                <p>Anywhere else is free :)</p>
            </div>

            <div className="seat_selection_content">
                {/* Passenger List */}
                <div className="passenger_list">
                    <h2>Passengers</h2>
                    {passengerData.map((passenger, index) => (
                        <div
                            key={index}
                            className={`passenger_item ${index === selectedPassenger ? "selected_passenger" : ""}`}
                            onClick={() => setSelectedPassenger(index)}
                        >
                            <span>{passenger.name}</span>
                            <span className="assigned_seat">
                                {passenger.seat || "Not assigned"}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Plane Layout */}
                <div className="plane_container">
                    {Array.from({ length: rows }, (_, rowIndex) => (
                        <div key={rowIndex} className="seat_row">
                            <span className="row_label">{rowIndex + 1}</span>
                            {seatsPerRow.map((seatLetter) => {
                                const seat = `${rowIndex + 1}${seatLetter}`;
                                const isBooked = bookedSeats.includes(seat);
                                const isSelected = seatAssignments.includes(seat);

                                return (
                                    <button
                                        key={seat}
                                        className={`seat ${isBooked ? "booked" : ""} ${isSelected ? "selected" : ""}`}
                                        onClick={() => handleSeatClick(seat)}
                                        disabled={isBooked}
                                    >
                                        {seatLetter}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            <button type="button" className="continue_button" onClick={continueButtonClicked}>
                Continue
            </button>
        </div>
    );
};

export default SeatSelection;
