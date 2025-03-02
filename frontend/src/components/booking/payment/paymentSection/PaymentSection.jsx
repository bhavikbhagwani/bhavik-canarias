import React, { useState } from 'react'
import './PaymentSection.css'
import PaymentMethods from './paymentMethods/paymentMethods';
import PaymentCardForm from './paymentCardForm/PaymentCardForm';
import { fareTypes } from '../../../../utils/fareTypes';
import { lineSpinner } from 'ldrs'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

lineSpinner.register()

const PaymentSection = ({flight, fareType, passengerData, extraLuggageList, totalPrice, confirmAndCreateBooking, loading, navigateToSuccessPage}) => {

    
    
    const [paymentMethod, setPaymentMethod] = useState('');

    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolderName: '',
    });

    const extraHandLuggage = extraLuggageList[0]
    const extraCheckInLuggage = extraLuggageList[1]
    const extraBothLuggage = extraLuggageList[2]

    const extraHandLuggageCost = 15
    const extraCheckInLuggageCost = 25
    const extraBothLuggageCost = 30

    // Function to generate a random card number
    const generateRandomCard = () => {
        const randomCardNumber = '4000 1234 5678 ' + Math.floor(Math.random() * 9000 + 1000);
        const randomExpiryDate = `${Math.floor(Math.random() * 12 + 1).toString().padStart(2, '0')}/${Math.floor(Math.random() * 10 + 22)}`;
        const randomCVV = Math.floor(Math.random() * 900 + 100);
        const randomCardHolder = "Name Surname"

        setCardDetails({
        cardNumber: randomCardNumber,
        expiryDate: randomExpiryDate,
        cvv: randomCVV,
        cardHolderName: randomCardHolder,
        });
    };

    const selectedFare = fareTypes.find(fare => fare.type === fareType);

    console.log("Selected Fare: ", selectedFare)
    const getSeatCost = () => {
        // Define the first and last row numbers
        const firstRow = 1;
        const lastRow = 10;
    
        // Count the number of passengers sitting in the first or last row
        const eligiblePassengers = passengerData.filter(passenger => {
            const rowNumber = parseInt(passenger.seat.match(/\d+/)[0], 10);
            return rowNumber === firstRow || rowNumber === lastRow;
        }).length;
    
        // Calculate total cost
        return eligiblePassengers * 20;
    };

    const getFlightCost = () => {
        return flight.price * passengerData.length;
    }

    const getExtraLuggageCost = () => {
        return (
            extraHandLuggage * extraHandLuggageCost +
            extraCheckInLuggage * extraCheckInLuggageCost +
            extraBothLuggage * extraBothLuggageCost
        );
    }

    const payAndConfirmButtonClicked = async () => {
        confirmAndCreateBooking()
        navigateToSuccessPage()   
    }










  return (
        <div className="payment_section_container">
            <h3>Payment</h3>

            <PaymentMethods setPaymentMethod={setPaymentMethod}></PaymentMethods>

            {/* Conditional Rendering of Payment Forms */}
            <div className="payment_form_container">
                {paymentMethod === 'card' && (
                    <div className='payment_form'>
                        {/* <h4>Credit/Debit Card Payment</h4>
                        <PaymentCardForm cardDetails={cardDetails}></PaymentCardForm>
                        <button className='gen_button' onClick={generateRandomCard}>Generate Card</button> */}
                        <h4>Payment functionality is coming soon! For now, all bookings are completely free.</h4>
                    </div>
                    
                )}

                {paymentMethod === 'paypal' && (
                    <div className="payment_form">
                        {/* <h4>PayPal Payment</h4>
                        <button className="paypal_button">PayPal Payment Method Coming Soon</button> */}
                        <h4>Payment functionality is coming soon! For now, all bookings are completely free.</h4>
                    </div>
                )}
                {paymentMethod === 'soon' && (
                    <div className="payment_form">
                        {/* <h4>Payment Method Coming Soon. Please select another payment method for now</h4> */}
                        <h4>Payment functionality is coming soon! For now, all bookings are completely free.</h4>
                    </div>
                )}
            </div>

            {/* Summary of Charges */}
            <div className="payment_summary">
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
                    <span className='summary_label'>Total Price:</span>
                    <span className="summary_value">${totalPrice}</span>
                </div>
            </div>

            <button type="button" className="continue_button" onClick={payAndConfirmButtonClicked} disabled={loading}>
                {loading ? <span>
                        <l-line-spinner
                            size="30"
                            speed="0.9" 
                            color="#00509E" 
                        ></l-line-spinner>
                    </span> : "Pay and Confirm"}
            </button>
        </div>
    );
}

export default PaymentSection