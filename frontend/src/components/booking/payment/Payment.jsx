import React, { useEffect, useState } from 'react'
import './Payment.css'
import { getDateFormatFromDate, getFlightDuration, getTimeFromDate } from '../../../utils/timeFunctions';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { fareTypes } from '../../../utils/fareTypes';
import FareModal from './fareModal/FareModal';
import PaymentSection from './paymentSection/PaymentSection';
import useCreateBooking from '../../../hooks/useCreateBooking';
import { useNavigate } from 'react-router-dom';
import { airportMappings } from '../../../utils/airportMappings';


const Payment = ({onBack, flight, fareType, passengerData, contactDetails, extraLuggageList, totalPrice}) => {


    const navigate = useNavigate();

    const extraHandLuggage = extraLuggageList[0]
    const extraCheckInLuggage = extraLuggageList[1]
    const extraBothLuggage = extraLuggageList[2]


   

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [modalType, setModalType] = useState("")

    const {loading, createBooking} = useCreateBooking()

    // Add/remove class to disable scrolling when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        // Cleanup on component unmount
        return () => document.body.classList.remove('no-scroll');
    }, [isModalOpen]);

    // Find the selected fareType details
    const selectedFare = fareTypes.find(fare => fare.type === fareType);

    // Continue button click handler
    const continueButtonClicked = () => {
        console.log("Continue button clicked")
        console.log("Payment and Confirmation Happens Here")
        // Add your logic for handling continue action here
        // onNext();
    };

    const confirmAndCreateBooking = async () => {

        const bookingData = {
            flightNumber: flight.flightNumber,
            passengers: passengerData,
            contactDetails: contactDetails,
            totalPrice: totalPrice,
            fareType: fareType,
            extraLuggage: extraLuggageList, 
            status: "Confirmed"
        }
        await createBooking(bookingData)
    }

    const navigateToSuccessPage = () => {
        // Redirect to success page with booking details
        navigate('/success', {
            state: {
                type: 'booking',
                flight,
                fareType,
                passengerData,
                contactDetails,
                extraLuggageList,
                totalPrice
            }
        });
    }


  return (
    <div className="payment_page_container">
        <button className="back_button" onClick={onBack}>BACK</button>
        <div className="payment_page_container_heading">
            <h1>Step 4: Payment and Booking Confirmation</h1>
            <p>Please review your booking summary and proceed with the payment</p>
        </div>

        <div className='booking_summary_container'>
            <h3>Booking Summary</h3>

            <div className='summary_section'>
                <h4>Flight Details</h4>
                <div className="summary_card">
                    <div className="summary_item">
                        <span className="summary_label">Flight Number</span>
                        <span className="summary_value">{flight.flightNumber}</span>
                    </div>
                    <div className="summary_item">
                        <span className="summary_label">Departure Airport</span>
                        <span className="summary_value">{airportMappings[flight.departureAirport]} ({flight.departureAirport})</span>
                    </div>
                    <div className="summary_item">
                        <span className="summary_label">Destination Airport</span>
                        <span className="summary_value">{airportMappings[flight.destinationAirport]} ({flight.destinationAirport})</span>
                    </div>
                    <div className="summary_item">
                        <span className="summary_label">Date</span>
                        <span className="summary_value">{getDateFormatFromDate(flight.departureTime)}</span>
                    </div>
                    <div className="summary_item">
                        <span className="summary_label">Time</span>
                        <span className="summary_value">{getTimeFromDate(flight.departureTime)} - {getTimeFromDate(flight.arrivalTime)}</span>
                    </div>
                    <div className="summary_item">
                        <span className="summary_label">Flight Duration</span>
                        <span className="summary_value">{getFlightDuration(flight.departureTime, flight.arrivalTime)}</span>
                    </div>
                </div>
            </div>
            <div className="summary_section">
                <h4>Passenger Details</h4>
                <div className="summary_card">
                    {passengerData.map((passenger, index) => (
                        <div className="summary_item" key={index}>
                            <span className="summary_label">Passenger {index + 1}, Seat</span>
                            <span className="summary_value">{passenger.name}, {passenger.seat}</span>
                        </div>
                    ))}
                    <div className="summary_item">
                        <span className="summary_label">Contact Email</span>
                        <span className="summary_value">
                            {contactDetails.email} 
                            <span className="info_icon" onClick={() => {
                                setIsModalOpen(true);
                                setModalType("email");
                            }}> 
                                <IoMdInformationCircleOutline className='icon_'/>
                            </span>
                        </span>
                    </div>
                    <div className="summary_item">
                        <span className="summary_label">Contact Phone</span>
                        <span className="summary_value">{contactDetails.phone}</span>
                    </div>
                </div>
            </div>

            {/* Fare and Extra Luggage Section */}
            <div className="summary_section">
                <h4>Fare and Extra Luggage</h4>
                <div className="summary_card">
                    <div className="summary_item">
                        <span className="summary_label">Fare Selected</span>
                        <span className="summary_value">
                            {fareType} 
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
                        <span className="summary_value">{extraHandLuggage}</span>
                    </div>
                    <div className="summary_item">
                        <span className="summary_label">Extra Check-in Luggage (+ $25):</span>
                        <span className="summary_value">{extraCheckInLuggage}</span>
                    </div>
                    <div className="summary_item">
                        <span className="summary_label">Extra Both Hand Luggage & Check-in Luggage (+ $30):</span>
                        <span className="summary_value">{extraBothLuggage}</span>
                    </div>
                </div>
            </div>

            {/* Total Price Section */}
            <div className="summary_section price_section">
                <h4>Total Price</h4>
                <div className="summary_card">
                    <div className="summary_item">
                        <span className="summary_label">Total Price</span>
                        <span className="summary_value">{totalPrice} $</span>
                    </div>
                </div>
            </div>
        </div>


        {/* Fare Details Modal */}
        {isModalOpen && selectedFare && (
            <FareModal setIsModalOpen={setIsModalOpen} selectedFare={selectedFare} modalType={modalType} email={contactDetails.email}></FareModal>
        )}

        <PaymentSection flight={flight} fareType={fareType} passengerData={passengerData} extraLuggageList={extraLuggageList} totalPrice={totalPrice} confirmAndCreateBooking={confirmAndCreateBooking} loading={loading} navigateToSuccessPage={navigateToSuccessPage}></PaymentSection>
    </div>
  )
}

export default Payment