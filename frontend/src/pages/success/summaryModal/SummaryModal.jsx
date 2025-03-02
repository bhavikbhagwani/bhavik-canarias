import React from 'react'
import './SummaryModal.css'
import { getDateFormatFromDate, getFlightDuration, getTimeFromDate } from '../../../utils/timeFunctions'
import { airportMappings } from '../../../utils/airportMappings'

const SummaryModal = ({bookingDetails, toggleSummaryModal}) => {
  return (
    <div className='summary_modal_overlay' onClick={toggleSummaryModal}>
        <div className='summary_modal_content' onClick={(e) => e.stopPropagation()}>
            <h3>Booking Summary</h3>
            <div className='summary_section'>
                <div className='summary_card'>
                    <div className='summary_item'>
                        <span className='summary_label'>Flight Number</span>
                        <span className='summary_value'>{bookingDetails?.flight?.flightNumber}</span>
                    </div>
                    <div className="summary_item">
                        <span className="summary_label">Departure Airport</span>
                        <span className="summary_value">{bookingDetails.flight.departureAirport}</span>
                    </div>
                    <div className="summary_item">
                        <span className="summary_label">Destination Airport</span>
                        <span className="summary_value">{bookingDetails.flight.destinationAirport}</span>
                    </div>
                    <div className="summary_item">
                        <span className="summary_label">Date</span>
                        <span className="summary_value">{getDateFormatFromDate(bookingDetails?.flight?.departureTime)}</span>
                    </div>
                    <div className='summary_item'>
                        <span className='summary_label'>Time</span>
                        <span className='summary_value'>
                            {getTimeFromDate(bookingDetails?.flight?.departureTime)} - 
                            {getTimeFromDate(bookingDetails?.flight?.arrivalTime)}
                        </span>
                    </div>
                    <div className='summary_item'>
                        <span className='summary_label'>Flight Duration</span>
                        <span className='summary_value'>
                            {getFlightDuration(bookingDetails?.flight?.departureTime, bookingDetails?.flight?.arrivalTime)}
                        </span>
                    </div>
                    {bookingDetails.passengerData.map((passenger, index) => (
                        <div className="summary_item" key={index}>
                            <span className="summary_label">Passenger {index + 1}, Seat</span>
                            <span className="summary_value">{passenger.name}, {passenger.seat}</span>
                        </div>
                    ))}
                    <div className="summary_item">
                        <span className="summary_label">Contact Email</span>
                        <span className="summary_value">
                            {bookingDetails.contactDetails.email} 
                        </span>
                    </div>
                    <div className="summary_item">
                        <span className="summary_label">Contact Phone</span>
                        <span className="summary_value">{bookingDetails.contactDetails.phone}</span>
                    </div>
                    <div className="summary_item">
                        <span className="summary_label">Fare Selected</span>
                        <span className="summary_value">
                            {bookingDetails.fareType} 
                        </span>
                    </div>
                    <div className="summary_item">
                        <span className="summary_label">Extra Hand Luggage (+ $15):</span>
                        <span className="summary_value">{bookingDetails.extraLuggageList[0]}</span>
                    </div>
                    <div className="summary_item">
                        <span className="summary_label">Extra Check-in Luggage (+ $25):</span>
                        <span className="summary_value">{bookingDetails.extraLuggageList[1]}</span>
                    </div>
                    <div className="summary_item">
                        <span className="summary_label">Extra Both Hand Luggage & Check-in Luggage (+ $30):</span>
                        <span className="summary_value">{bookingDetails.extraLuggageList[2]}</span>
                    </div>
                    <div className="summary_item">
                        <span className="summary_label">Total Price</span>
                        <span className="summary_value">{bookingDetails.totalPrice} $</span>
                    </div>
                    
             
                </div>
            </div>
            <button className='close_button' onClick={toggleSummaryModal}>Close</button>
        </div>
    </div>
  )
}

export default SummaryModal