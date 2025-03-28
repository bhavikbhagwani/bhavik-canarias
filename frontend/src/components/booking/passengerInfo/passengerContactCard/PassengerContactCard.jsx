import React, { useState } from 'react';
import './PassengerContactCard.css';

const PassengerContactCard = ({ contactDetails, setContactDetails, contactErrors, setContactErrors }) => {

  

  


  const handleInputChange = (field, value) => {
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  return (
    <div className="passenger_contact_card">
      <h2>Contact Details</h2>
      <div className="form-container">
        <div className="form-col-contact">
          <div className="form-group-contact">
            <label htmlFor='email'>Email</label>
            <input
              type="text"
              id='email'
              name="email"
              placeholder="Enter your email"
              value={contactDetails.email || ''} // Fallback to avoid errors
            onChange={(e) => handleInputChange('email', e.target.value)}
            />
            {contactErrors.email && <span className="error-message">{contactErrors.email}</span>}
          </div>
          <div className="form-group-contact">
            <label htmlFor='phone'>Phone Number (including country code e.g. +34...)</label>
            <input
              type="text"
              id='phone'
              name="phone"
              placeholder="Enter phone number"
              value={contactDetails.phone || ''} // Fallback to avoid errors
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            {contactErrors.phone && <span className="error-message">{contactErrors.phone}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerContactCard;
