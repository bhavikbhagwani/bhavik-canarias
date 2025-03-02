import React from 'react';
import './PassengerInfoCard.css';

const PassengerInfoCard = ({ passengerNumber, passengerData, onInputChange }) => {
  return (
    <div className="passenger_info_card">
      <h2>Passenger {passengerNumber}</h2>
      <div className="form-container">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor={`firstName-${passengerNumber}`}>First Name</label>
            <input
              type="text"
              id={`firstName-${passengerNumber}`}
              name="firstName"
              placeholder="Enter first name"
              value={passengerData.firstName || ''} // Fallback to avoid errors
              onChange={(e) => onInputChange('firstName', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`lastName-${passengerNumber}`}>Last Name</label>
            <input
              type="text"
              id={`lastName-${passengerNumber}`}
              name="lastName"
              placeholder="Enter last name"
              value={passengerData.lastName || ''} // Fallback to avoid errors
              onChange={(e) => onInputChange('lastName', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerInfoCard;
