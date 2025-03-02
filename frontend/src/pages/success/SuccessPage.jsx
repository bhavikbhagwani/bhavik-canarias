import React, { useState } from 'react'
import './SuccessPage.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { getFlightDuration, getTimeFromDate } from '../../utils/timeFunctions'
import SummaryModal from './summaryModal/SummaryModal'
import { GoCheckCircleFill } from "react-icons/go";
import { MdError } from "react-icons/md";
import { airportMappings } from '../../utils/airportMappings'


const SuccessPage = () => {

    const location = useLocation();
    const navigate = useNavigate();

    // Extract booking details
    const successDetails = location.state;

    const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false)

    const toggleSummaryModal = () => setIsSummaryModalOpen(!isSummaryModalOpen);


    const navigateHomeClicked = () => {
        localStorage.removeItem("flights");
        localStorage.removeItem("searchParams");
        localStorage.removeItem("selectedFareType");
        localStorage.removeItem("selectedFlight");
        navigate('/')
    }

    // If accessed directly, redirect to home
    if (!successDetails) {
        return (
            <div className='success_page_container'>

                <div className='success_page_content'>

                    <div className='success_container'>
                        <h1>Oops</h1>

                        <p>You cannot access this page directly.</p>

                        <MdError color='#00509E' size={200} />
                

                        <button className='view_summary_button' onClick={navigateHomeClicked}>GO HOME</button>
                    
                    </div>

                    
                    
                </div>

                

            </div>
        );
    }

    const renderSuccessMessage = () => {
        switch (successDetails.type) {
            case 'booking':
                return (
                    <div className='success_container'>
                        <h1>BOOKING SUCCESSFUL</h1>
                        <p>Your booking from <strong>{airportMappings[successDetails.flight.departureAirport]}</strong> to <strong>{airportMappings[successDetails.flight.destinationAirport]}</strong> has been successfully completed.</p>
                        <GoCheckCircleFill color='#00509E' size={200} />
                        <button className='view_summary_button' onClick={toggleSummaryModal}>VIEW BOOKING SUMMARY</button>
                        <button className='view_summary_button' onClick={navigateHomeClicked}>GO HOME</button>
                    </div>
                );

            case 'message':
                return (
                    <div className='success_container'>
                        <h1>MESSAGE SENT SUCCESSFULLY</h1>
                        <p>Your message has been sent successfully!</p>
                        <GoCheckCircleFill color='#00509E' size={200} />
                        <button className='view_summary_button' onClick={navigateHomeClicked}>GO HOME</button>
                    </div>
                );

            case 'cancellation':
                return (
                    <div className='success_container'>
                        <h1>BOOKING CANCELLED</h1>
                        <p>Your booking with reference <strong>{successDetails.bookingReference}</strong> has been successfully canceled.</p>
                        <GoCheckCircleFill color='#00509E' size={200} />
                        <button className='view_summary_button' onClick={navigateHomeClicked}>GO HOME</button>
                    </div>
                );
            case 'removal':
                return (
                    <div className='success_container'>
                        <h1>BOOKING REMOVED</h1>
                        <p>Your booking with reference <strong>{successDetails.bookingReference}</strong> has been successfully removed.</p>
                        <GoCheckCircleFill color='#00509E' size={200} />
                        <button className='view_summary_button' onClick={navigateHomeClicked}>GO HOME</button>
                    </div>
                );

            default:
                return (
                    <div className='success_container'>
                        <h1>SUCCESS</h1>
                        <GoCheckCircleFill color='#00509E' size={200} />
                        <button className='view_summary_button' onClick={navigateHomeClicked}>GO HOME</button>
                    </div>
                );
        }
    }


  return (
    <>
    
    <div className='success_page_container'>

        <div className='success_page_content'>

                {renderSuccessMessage()}

                {/* Modal for Booking Summary */}
                {isSummaryModalOpen && successDetails.type === 'booking' && (
                    <SummaryModal bookingDetails={successDetails} toggleSummaryModal={toggleSummaryModal}></SummaryModal>
                )}
                    
        </div>

        

    </div>
    
    </>
  )
}

export default SuccessPage