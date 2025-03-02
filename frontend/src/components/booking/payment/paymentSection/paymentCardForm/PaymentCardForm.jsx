import React from 'react'
import './PaymentCardForm.css'

const PaymentCardForm = ({cardDetails}) => {




  return (
    <div className="card-form-container">
      
      <div className="form-column-card">
        <input
          className="input-field-card"
          type="text"
          name="cardNumber"
          id="cardNumber"
          placeholder="0000 0000 0000 0000"
          value={cardDetails.cardNumber}
        />
        <div className="form-row-card">
          <input
            className="input-field-card"
            type="text"
            name="expiryDate"
            id="expiryDate"
            placeholder="MM/AA"
            value={cardDetails.expiryDate}
          />
          <input
            className="input-field-card"
            type="text"
            name="cvv"
            id="cvv"
            placeholder="CVV"
            value={cardDetails.cvv}
          />
        </div>
      </div>
      <div className="form-row-card">
        <input
          className="input-field-card"
          type="text"
          name="cardName"
          id="cardName"
          placeholder="Card Holder Name"
          value={cardDetails.cardHolderName}
        />
      </div>
    </div>
  );
};

export default PaymentCardForm