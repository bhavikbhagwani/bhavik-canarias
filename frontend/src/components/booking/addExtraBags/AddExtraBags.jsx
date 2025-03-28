import React, { useState } from 'react'
import './AddExtraBags.css'
import toast from 'react-hot-toast'

const AddExtraBags = ({onNext, onBack, handLuggageCount, setHandLuggageCount, checkInLuggageCount, setCheckInLuggageCount, bothLuggageCount, setBothLuggageCount}) => {



  // Price constants
  const handLuggagePrice = 15;
  const checkInLuggagePrice = 25;
  const bothLuggagePrice = 30;

  

  

  // Hand luggage increase/decrease functions
  const handleHandLuggageIncrease = () => {
    if (bothLuggageCount > 0) {
        toast.error("Cannot add hand luggage when 'Both' option is selected.");
        return;
    }
    if (handLuggageCount >= 2) {
    toast.error("You cannot have more than 2 hand luggage.");
    return;
    }
    setHandLuggageCount(handLuggageCount + 1);
  };

  const handleHandLuggageDecrease = () => {
    if (handLuggageCount > 0) {
        setHandLuggageCount(handLuggageCount - 1);
    }
  };

 // Check-in luggage increase/decrease functions
 const handleCheckInLuggageIncrease = () => {
    if (bothLuggageCount > 0) {
        toast.error("Cannot add check-in luggage when 'Both' option is selected.");
        return;
    }
    if (checkInLuggageCount >= 2) {
    toast.error("You cannot have more than 2 check-in luggage.");
    return;
    }
    setCheckInLuggageCount(checkInLuggageCount + 1);
  };

  const handleCheckInLuggageDecrease = () => {
    if (checkInLuggageCount > 0) {
        setCheckInLuggageCount(checkInLuggageCount - 1);
    }
  };

  // Combined luggage increase/decrease functions
  const handleBothLuggageIncrease = () => {
    if (bothLuggageCount >= 2) {
        toast.error("You cannot have more than 2 'Both' luggage.");
        return;
    }
    setBothLuggageCount(bothLuggageCount + 1);
    setHandLuggageCount(0);
    setCheckInLuggageCount(0);
  };

  const handleBothLuggageDecrease = () => {
    if (bothLuggageCount > 0) {
        setBothLuggageCount(bothLuggageCount - 1);
    }
  };

  // Continue button click handler
  const continueButtonClicked = () => {
    console.log('Hand Luggage: ', handLuggageCount);
    console.log('Check-in Luggage: ', checkInLuggageCount);
    console.log("Both Hand Luggage and Check-in Luggage: ", bothLuggageCount)
    // Add your logic for handling continue action here
    onNext();
  };

  return (
    <div className="add_extra_bags_container">
        <button className="back_button" onClick={onBack}>BACK</button>
        <div className="add_extra_bags_container_heading">
            <h1>Step 3: Add Extra Bags</h1>
            <p>Here you can add more bags/luggage for a little extra cost</p>
        </div>

        <div className="extra_bags_section">
            <div className='extra_bags_section_first_part'>
                    {/* Hand Luggage */}
                    <div className="extra_bag_item">
                        <h2>Add Extra Hand Luggage</h2>
                        <img src="handluggage.jpg" alt="Hand Luggage" className="luggage_image" />
                        <div className="bag_controls">
                            <button onClick={handleHandLuggageDecrease} className="btn">-</button>
                            <span className="bag_count">{handLuggageCount}</span>
                            <button onClick={handleHandLuggageIncrease} className="btn">+</button>
                        </div>
                        <div className="bag_price">+ ${handLuggagePrice}</div>
                    </div>

                        {/* Check-in Luggage */}
                        <div className="extra_bag_item">
                        <h2>Add Extra Check-in Luggage</h2>
                        <img src="checkinluggage.jpg" alt="Check-in Luggage" className="luggage_image" />
                        <div className="bag_controls">
                            <button onClick={handleCheckInLuggageDecrease} className="btn">-</button>
                            <span className="bag_count">{checkInLuggageCount}</span>
                            <button onClick={handleCheckInLuggageIncrease} className="btn">+</button>
                        </div>
                        <div className="bag_price">+ ${checkInLuggagePrice}</div>
                    </div>
            </div>

            <div className='extra_bags_section_second_part'>
                {/* Hand Luggage and Check-in Luggage */}
                <div className="extra_bag_item extra_bag_item_both">
                    <h2>Add Both Extra Hand Luggage and Check-in Luggage</h2>
                    <img src="hl&cil.jpg" alt="Hand Luggage and Check-in Luggage" className="luggage_image_both" />
                    <div className="bag_controls">
                        <button onClick={handleBothLuggageDecrease} className="btn">-</button>
                        <span className="bag_count">{bothLuggageCount}</span>
                        <button onClick={handleBothLuggageIncrease} className="btn">+</button>
                    </div>
                    <div className="bag_price">+ ${bothLuggagePrice}</div>
                </div>
            </div>
      </div>

    <div className='add_extra_bags_summary'>
        <h3>Extra Luggage Summary</h3>
        <div className="summary_card">
            <div className="summary_item">
                <span className="summary_label">Extra Hand Luggage (+$15):</span>
                <span className="summary_value">{handLuggageCount}</span>
            </div>
            <div className="summary_item">
                <span className="summary_label">Extra Check-in Luggage (+$25):</span>
                <span className="summary_value">{checkInLuggageCount}</span>
            </div>
            <div className="summary_item">
                <span className="summary_label">Extra Both Hand Luggage & Check-in Luggage (+$30):</span>
                <span className="summary_value">{bothLuggageCount}</span>
            </div>
        </div>
    </div>


        




        <button type="button" className="continue_button" onClick={continueButtonClicked}>
            Continue
        </button>
    </div>
  )
}

export default AddExtraBags