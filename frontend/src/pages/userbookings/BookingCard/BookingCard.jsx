import React, { useEffect, useState } from 'react'
import './BookingCard.css'
import { getFlightDuration, getTimeFromDate } from '../../../utils/timeFunctions'
import { airportMappings } from '../../../utils/airportMappings'
import { IoMdInformationCircleOutline } from "react-icons/io";
import FareModal from '../../../components/booking/payment/fareModal/FareModal';
import { fareTypes } from '../../../utils/fareTypes';

import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";




const BookingCard = ({booking}) => {


    const [isExpanded, setIsExpanded] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [modalType, setModalType] = useState("")

    const selectedFare = fareTypes.find(fare => fare.type === booking.fareType);



    const getFlightCost = () => {
        return booking.flight.price * booking.passengers.length;
    }

    const getExtraLuggageCost = () => {
        return (
            booking.extraLuggage[0] * 15 +
            booking.extraLuggage[1] * 25 +
            booking.extraLuggage[2] * 30
        );
    }

    const getSeatCost = () => {
        // Define the first and last row numbers
        const firstRow = 1;
        const lastRow = 10;
    
        // Count the number of passengers sitting in the first or last row
        const eligiblePassengers = booking.passengers.filter(passenger => {
            const rowNumber = parseInt(passenger.seat.match(/\d+/)[0], 10);
            return rowNumber === firstRow || rowNumber === lastRow;
        }).length;
    
        // Calculate total cost
        return eligiblePassengers * 20;
    };

    const copyBookingRefernce = () => {
        navigator.clipboard.writeText(booking.bookingReference)
        setModalType("copy")
        setIsModalOpen(true);
    }

    const cancelBookingClicked = () => {
        setModalType("cancel")
        setIsModalOpen(true)
    }

    const removeBookingClicked = () => {
        setModalType("remove")
        setIsModalOpen(true)
    }

    useEffect(() => {
        if (isModalOpen && modalType === "copy") {
            const timer = setTimeout(() => setIsModalOpen(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isModalOpen, modalType]);
    
 

  return (

        <div className='booking_fetched'>
            <div className='booking_fetched_header'>
                <div className="booking_fetched_logo">
                    <img src="logo3.png" alt="" />
                </div>

                <div className='booking_fetched_route'>
                    <span>{airportMappings[booking.flight.departureAirport]} to {airportMappings[booking.flight.destinationAirport]}</span>
                    <span>  {booking.flight.flightNumber} </span>
                </div>

                <div className="booking_fetched_select">
                    <button className="booking_status_button">{booking.status}</button>
                </div>
            </div>

            <div className='booking_fetched_body'>
                <div className='booking_fetched_summary_container'>

                    <div className='booking_fetched_dropdown_text' onClick={() => setIsExpanded(!isExpanded)}>
                    {/* Title with dropdown button */}
                        <h3 >
                            Booking Summary
                        </h3>
                        <span className='dropdown_icon'>
                            {isExpanded ? <IoIosArrowDropup size={30} /> : <IoIosArrowDropdown size={30}/>}
                        </span>
                    </div>
                    

                    {
                        isExpanded && (
                            <>
                            <div className='summary_section'>
                                <h4>Booking Details</h4>
                                <div className="summary_card">
                                    <div className="summary_item" onClick={copyBookingRefernce} onTouchStart={copyBookingRefernce}>
                                        <span className="summary_label">Booking Reference: </span>
                                        <span onClick={copyBookingRefernce} style={{cursor: "pointer"}} className="summary_value">{booking.bookingReference}</span>
                                    </div>
                                    <div className="summary_item">
                                        <span className="summary_label">Booking Status: </span>
                                        <span style={{cursor: "pointer"}} className="summary_value">{booking.status}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='summary_section'>
                                <h4>Flight Details</h4>
                                <div className="summary_card">
                                    <div className="summary_item">
                                        <span className="summary_label">Flight Number:</span>
                                        <span className="summary_value">{booking.flight.flightNumber}</span>
                                    </div>
                                    <div className="summary_item">
                                        <span className="summary_label">Departure Airport:</span>
                                        <span className="summary_value">{airportMappings[booking.flight.departureAirport]} ({booking.flight.departureAirport})</span>
                                    </div>
                                    <div className="summary_item">
                                        <span className="summary_label">Destination Airport:</span>
                                        <span className="summary_value">{airportMappings[booking.flight.destinationAirport]} ({booking.flight.destinationAirport})</span>
                                    </div>
                                    <div className="summary_item">
                                        <span className="summary_label">Time:</span>
                                        <span className="summary_value">{getTimeFromDate(booking.flight.departureTime)} - {getTimeFromDate(booking.flight.arrivalTime)}</span>
                                    </div>
                                    <div className="summary_item">
                                        <span className="summary_label">Flight Duration:</span>
                                        <span className="summary_value">{getFlightDuration(booking.flight.departureTime, booking.flight.arrivalTime)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="summary_section">
                                <h4>Passenger Details</h4>
                                <div className="summary_card">
                                    {booking.passengers.map((passenger, index) => (
                                        <div className="summary_item" key={index}>
                                            <span className="summary_label">Passenger {index + 1}, Seat:</span>
                                            <span className="summary_value">{passenger.name}, {passenger.seat}</span>
                                        </div>
                                    ))}
                                    <div className="summary_item">
                                        <span className="summary_label">Contact Email:</span>
                                        <span className="summary_value">
                                            {booking.contactDetails.email} 
                                        </span>
                                    </div>
                                    <div className="summary_item">
                                        <span className="summary_label">Contact Phone:</span>
                                        <span className="summary_value">{booking.contactDetails.phone}</span>
                                    </div>
                                </div>
                            </div>
                
                            <div className="summary_section">
                                <h4>Fare and Extra Luggage</h4>
                                <div className="summary_card">
                                    <div className="summary_item">
                                        <span className="summary_label">Fare Selected:</span>
                                        <span className="summary_value">
                                            {booking.fareType} 
                                            <span className="info_icon" onClick={() => {
                                                setIsModalOpen(true);
                                                setModalType("fare");
                                            }}> 
                                                <IoMdInformationCircleOutline className='icon_'/>
                                            </span>
                                        </span>
                                    </div>
                                    <div className="summary_item">
                                        <span className="summary_label">Extra Hand Luggage (+ $15):</span>
                                        <span className="summary_value">{booking.extraLuggage[0]}</span>
                                    </div>
                                    <div className="summary_item">
                                        <span className="summary_label">Extra Check-in Luggage (+ $25):</span>
                                        <span className="summary_value">{booking.extraLuggage[1]}</span>
                                    </div>
                                    <div className="summary_item">
                                        <span className="summary_label">Extra Both Hand Luggage & Check-in Luggage (+ $30):</span>
                                        <span className="summary_value">{booking.extraLuggage[2]}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="summary_section price_section">
                                <h4>Summary of Charges</h4>
                                <div className="summary_item">
                                    <span className='summary_label'>Flight Cost (for all passengers):</span>
                                    <span className="summary_value">$ {getFlightCost()}</span>
                                </div>
                                <div className="summary_item">
                                    <span className='summary_label'>Fare Cost ({selectedFare.type}):</span>
                                    <span className="summary_value">$ {selectedFare.price}</span>
                                </div>
                                <div className="summary_item">
                                    <span className='summary_label'>Seat Cost:</span>
                                    <span className="summary_value">$ {getSeatCost()}</span>
                                </div>
                                <div className="summary_item">
                                    <span className='summary_label'>Extra Luggage Cost:</span>
                                    <span className="summary_value">$ {getExtraLuggageCost()}</span>
                                </div>
                                <div className="summary_item total_price">
                                    <span>Total Price:</span>
                                    <span className="summary_value">${booking.totalPrice}</span>
                                </div>
                            </div>

                             {/* Title with dropdown button */}
                            <h3 
                                onClick={() => setIsExpanded(!isExpanded)}
                                style={{cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "30px" }}>
                                <span></span>
                                <span></span>

                                <span>
                                    {isExpanded ? <IoIosArrowDropup size={30} color='00509E'/> : <IoIosArrowDropdown size={30} color='00509E'/>}
                                </span>
                            </h3>
                            </>
                        )
                        
                    }
                   
                    
                </div>
            </div>

            {
                booking.status === "Confirmed" ? (
                    <>
                    <div className='booking_fetched_footer'>
                        <span></span>
                        <span></span>
                        <button className="cancel_button" onClick={cancelBookingClicked}>CANCEL THIS BOOKING</button>
                    </div>
                    </>
                ) : <></>
            }
            {
                booking.status === "Cancelled" ? (
                    <>
                    <div className='booking_fetched_footer'>
                        <span></span>
                        <span></span>
                        <button className="cancel_button remove" onClick={removeBookingClicked}>REMOVE THIS BOOKING</button>
                    </div>
                    </>
                ) : <></>
            }

                    



            

            {/* Fare Details Modal */}
            {isModalOpen && selectedFare && (
                <FareModal setIsModalOpen={setIsModalOpen} selectedFare={selectedFare} modalType={modalType} email={booking.contactDetails.email}></FareModal>
            )}

            {/* Clipboard Modal */}
            {isModalOpen && (
                <FareModal setIsModalOpen={setIsModalOpen} modalType={modalType} bookingReference = {booking.bookingReference}></FareModal>
            )}

            {/* Cancellation or Removal Modal */}
            {isModalOpen && (
                <FareModal setIsModalOpen={setIsModalOpen} modalType={modalType} bookingReference = {booking.bookingReference}></FareModal>
            )}

          
        </div>
  )
}

export default BookingCard