import React from 'react';
import './PaymentMethods.css';

const PaymentMethods = ({setPaymentMethod}) => {
  return (
    <>
    <div className='payment_methods_heading'>
        <h4>Choose a Payment Method</h4>
    </div>
    <div className="radio-buttons-container">
        <div className="radio-button">
            <input name="radio-group" id="radio2" className="radio-button__input" type="radio" onChange={() => setPaymentMethod('card')}/>
            <label htmlFor="radio2" className="radio-button__label">
                <span className="radio-button__custom"></span>
                Credit or Debit Card
            </label>
        </div>
        <div className="radio-button">
            <input name="radio-group" id="radio1" className="radio-button__input" type="radio" onChange={() => setPaymentMethod('paypal')}/>
            <label htmlFor="radio1" className="radio-button__label">
                <span className="radio-button__custom"></span>
                PayPal
            </label>
        </div>
        <div className="radio-button">
            <input name="radio-group" id="radio3" className="radio-button__input" type="radio" onChange={() => setPaymentMethod('soon')}/>
            <label htmlFor="radio3" className="radio-button__label">
                <span className="radio-button__custom"></span>
                Coming Soon
            </label>
        </div>
    </div>
    </>
  );
}

export default PaymentMethods;
