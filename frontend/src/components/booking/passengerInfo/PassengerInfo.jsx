import React, { useEffect, useState } from 'react';
import './PassengerInfo.css';
import PassengerInfoCard from './passengerInfoCard/PassengerInfoCard';
import PassengerContactCard from './passengerContactCard/PassengerContactCard';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PassengerInfo = ({ onNext, numPassengers, passengerData, setPassengerData, contactDetails, setContactDetails }) => {


    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [])

    const navigate = useNavigate()

    const [contactErrors, setContactErrors] = useState({ email: "", phone: "" });

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone) => {
        return /^\+?\d{10,15}$/.test(phone.replace(/\s+/g, ''));
    };
    
    

    // Ensure the passengerData array has enough elements to avoid undefined errors
    const handleInputChange = (index, field, value) => {
        const newPassengerData = [...passengerData];

        if (!newPassengerData[index]) {
            // If passenger data for the given index is undefined, create a default entry
            newPassengerData[index] = { name: "" }; // or any other default structure you need
        }

        if (field === "firstName" || field === "lastName") {
            const [existingFirst, existingLast] = newPassengerData[index].name.split(" ");
            
            // Update either first or last name
            const newFirstName = field === "firstName" ? value : existingFirst || "";
            const newLastName = field === "lastName" ? value : existingLast || "";

            // Store the full name
            newPassengerData[index].name = `${newFirstName} ${newLastName}`.trim();
        }

        setPassengerData(newPassengerData);
    };

    const handleContinueClicked = () => {
        // Check if all passenger data is filled
        const allPassengersComplete = passengerData.every(passenger => 
            passenger.name && passenger.name.split(" ").length === 2); // Ensure both first and last name are provided
    
        // Check if contact details are complete (you can adjust the fields according to your needs)
        const contactComplete = contactDetails && contactDetails.email && contactDetails.phone;
    
        if (allPassengersComplete && contactComplete) {
            // check contact details now 
            const newErrors = {
                email: validateEmail(contactDetails.email) ? "" : "Please enter a valid email",
                phone: validatePhone(contactDetails.phone) ? "" : "Please enter a valid phone number",
            };
            
            setContactErrors(newErrors);

            // Proceed only if there are no errors
            if (!newErrors.email && !newErrors.phone) {

                onNext();
            }


            
        } else {
            // You can add some error handling, like showing a message
            toast.error('Please complete all fields.');
        }
    };

    
  
      

    const navigateBackToFlights = () => {
        window.scrollTo(0, 0);
        navigate("/flights")
    }
    

    return (
        <div className='passenger_info_container'>
            <button className="back_button" onClick={navigateBackToFlights}>BACK TO FLIGHTS</button>
            <div className='flight_info_heading'>
                <h1>Step 1: Passengers</h1>
                <p>Please enter names as they appear on passport or travel documentation</p>
            </div>
            <div className='passenger_cards_container'>
                {[...Array(parseInt(numPassengers, 10))].map((_, index) => (
                    <PassengerInfoCard
                        key={index}
                        passengerNumber={index + 1}
                        passengerData={{
                            firstName: passengerData[index]?.name.split(" ")[0] || "",
                            lastName: passengerData[index]?.name.split(" ")[1] || "",
                        }}
                        onInputChange={(field, value) => handleInputChange(index, field, value)}
                    />
                ))}
            </div>
            <PassengerContactCard contactDetails={contactDetails} setContactDetails={setContactDetails} contactErrors={contactErrors} setContactErrors={setContactErrors}></PassengerContactCard>
            <button type="button" className="continue_button" onClick={handleContinueClicked}>
                Continue
            </button>
        </div>
    );
};

export default PassengerInfo;
