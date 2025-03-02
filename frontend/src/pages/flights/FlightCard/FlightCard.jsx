import React from 'react';
import './FlightCard.css';
import { getFlightDuration, getTimeFromDate } from '../../../utils/timeFunctions';

const FlightCard = ({ flight, isSelected, onSelect }) => {
    return (
        <div
            className={`flight_fetched ${isSelected ? 'selected_flight' : ''}`}
            onClick={() => onSelect(flight._id)}
        >
            <div className="flight_fetched_logo">
                <img src="logo3.png" alt="" />
            </div>
            <div className="flight_fetched_info">
                <div className="flight_fetched_departure_time">
                    {getTimeFromDate(flight.departureTime)}
                </div>
                <div className="flight_fetched_code_and_duration">
                    <div className="flight_fetched_code">{flight.flightNumber}</div>
                    <div className="flight_fetched_linebreak"></div>
                    <div className="flight_fetched_duration">
                        {getFlightDuration(flight.departureTime, flight.arrivalTime)}
                    </div>
                </div>
                <div className="flight_fetched_arrival_time">
                    {getTimeFromDate(flight.arrivalTime)}
                </div>
            </div>
            <div className="flight_fetched_price">
                <h3>{flight.price}$ / person</h3>
            </div>
            <div className="flight_fetched_select">
                <button className="select_button">{isSelected ? 'SELECTED' : 'SELECT'}</button>
            </div>
        </div>
    );
};

export default FlightCard;
