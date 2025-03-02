import React, { useState } from 'react'
import './FareModal.css'
import useCancelBooking from '../../../../hooks/useCancelBooking'

import { lineSpinner } from 'ldrs'
import useGetUserBookings from '../../../../hooks/useGetUserBookings'
import { useNavigate } from 'react-router-dom'
import useRemoveBooking from '../../../../hooks/useRemoveBooking'

lineSpinner.register()

const FareModal = ({setIsModalOpen, selectedFare, modalType, email, bookingReference}) => {

    const navigate = useNavigate();

    const { loading: cancelLoading, brError: cancelBrError, cancelBooking } = useCancelBooking();
    const { loading: removeLoading, brError: removeBrError, removeBooking } = useRemoveBooking();



    const [bookingReferenceInput, setBookingReferenceInput] = useState("")

    const { getUserBookings } = useGetUserBookings();
    

    const handleInputChange = (e) => {
        setBookingReferenceInput(e.target.value);
    };


    const cancelBookingClicked = async () => {

        const success = await cancelBooking(bookingReferenceInput);
    
        if (success) {
            setIsModalOpen(false); 
            navigate("/success", { state: { type: "cancellation", bookingReference: bookingReference } });
        }

        
    }
    
    const removeBookingClicked = async () => {

        const success = await removeBooking(bookingReferenceInput);
    
        if (success) {
            setIsModalOpen(false); 
            navigate("/success", { state: { type: "removal", bookingReference: bookingReference } });
        }

        
    }

    if (modalType === "fare"){
        return (
            <div className="modal_overlay" onClick={() => setIsModalOpen(false)}>
                <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                    <h2><span>{selectedFare.type}</span> Fare Details</h2>
                    <strong>{selectedFare.description}</strong>
                    <strong>Additional Price: {selectedFare.price}</strong>
                    <button className="close_button" onClick={() => setIsModalOpen(false)}>Close</button>
                </div>
            </div>
          )
    }
    if (modalType === "email"){
        return (
            <div className="modal_overlay" onClick={() => setIsModalOpen(false)}>
                <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                    <h2><span>Email</span> Information</h2>
                    <strong>"{email}"</strong>
                    <strong>We will send the booking confirmation to this email, once the booking is confirmed</strong>
                    <button className="close_button" onClick={() => setIsModalOpen(false)}>Close</button>
                </div>
            </div>
          )
    }
    if (modalType === "copy"){
        return (
            <div className="modal_overlay" onClick={() => setIsModalOpen(false)}>
                <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                    <h2><span>Booking Reference</span> copied to clipboard</h2>
                    <strong>{bookingReference}</strong>
                    <button className="close_button" onClick={() => setIsModalOpen(false)}>Close</button>
                </div>
            </div>
          )
    }
    if (modalType === "cancel"){
        return (
            <div className="modal_overlay" onClick={() => setIsModalOpen(false)}>
                <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                    <h2><span>Cancel</span> Booking</h2>
                    <strong>Enter booking reference in order to cancel this booking. You can copy it from your bookings</strong>
                    <input type="text" className='cancel_booking_input' value={bookingReferenceInput} onChange={handleInputChange}/>
                    <span className='br_input_error'>{cancelBrError}</span>
                    <button className="close_button" onClick={cancelBookingClicked} disabled= {cancelLoading}>
                        
                    {cancelLoading ? <span>
                        <l-line-spinner
                            size="25"
                            speed="0.9" 
                            color="#00509E"
                        ></l-line-spinner>
                    </span> : "Confirm Cancellation"}
                    
                    </button>
                    <button className="close_button remove" onClick={() => setIsModalOpen(false)}>Back</button>

                </div>
            </div>
          )
    }
    if (modalType === "remove"){
        return (
            <div className="modal_overlay" onClick={() => setIsModalOpen(false)}>
                <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                    <h2><span>Remove</span> Booking</h2>
                    <strong>Enter booking reference in order to remove this booking. You can copy it from your bookings</strong>
                    <input type="text" className='cancel_booking_input' value={bookingReferenceInput} onChange={handleInputChange}/>
                    <span className='br_input_error'>{removeBrError}</span>
                    <button className="close_button" onClick={removeBookingClicked} disabled= {removeLoading}>
                        
                    {removeLoading ? <span>
                        <l-line-spinner
                            size="25"
                            speed="0.9" 
                            color="#00509E"
                        ></l-line-spinner>
                    </span> : "Confirm Removal"}
                    
                    </button>
                    <button className="close_button remove" onClick={() => setIsModalOpen(false)}>Back</button>

                </div>
            </div>
          )
    }


  
}

export default FareModal