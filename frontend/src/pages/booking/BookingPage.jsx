import React, { useContext, useEffect, useState } from 'react'
import './BookingPage.css'
import { FlightSelectionContext } from '../../context/FlightSelectContext';
import NavBar from '../home/navbar/NavBar';
import FlightCard from '../flights/FlightCard/FlightCard';
import PassengerInfo from '../../components/booking/passengerInfo/PassengerInfo';
import { FlightsContext } from '../../context/FlightsContext';
import { Link, useNavigate } from 'react-router-dom';
import SeatSelection from '../../components/booking/seatSelection/SeatSelection';
import AddExtraBags from '../../components/booking/addExtraBags/addExtraBags';
import Payment from '../../components/booking/payment/Payment';
import { MdError } from "react-icons/md";
import { ScrollTop } from 'primereact/scrolltop';

import { Steps } from 'primereact/steps';


const BookingPage = () => {

    const { selectedFlight, selectedFareType } = useContext(FlightSelectionContext);
    const { flights, searchParams } = useContext(FlightsContext);
    const navigate = useNavigate();

    console.log("selectedFlight: ", selectedFlight)


    const navigateHomeClicked = () => {
        navigate('/')
    }

    const bookingSteps = [
        {label: "Passenger Info"},
        {label: "Seat Selection"},
        {label: "Extra Bags"},
        {label: "Payment and Confirmation"}
    ]

    // If accessed directly, redirect to home
    if (!selectedFlight || !selectedFareType || !localStorage.getItem('selectedFlight')) {
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

    const [passengerData, setPassengerData] = useState(
        Array.from({ length: parseInt(searchParams.numPassengers, 10) || 0 }, () => ({
            name: '',  // Full name format "First Last"
            seat: ''   // Seat starts empty
        }))
    );

    const [contactDetails, setContactDetails] = useState({
        email: "",
        phone: "",
    });

    const [handLuggageCount, setHandLuggageCount] = useState(0); // Hand luggage counter
    const [checkInLuggageCount, setCheckInLuggageCount] = useState(0); // Check-in luggage counter
    const [bothLuggageCount, setBothLuggageCount] = useState(0) //Both Luggage counter

    
    
    const extraLuggageList = [handLuggageCount, checkInLuggageCount, bothLuggageCount]
    

    // console.log(selectedFlight)
    // console.log(selectedFareType)


    const [price, setPrice] = useState(0);


    const calculatePrice = () => {
        if (!selectedFlight || !selectedFareType || !searchParams.numPassengers) {
            return 0; // If data is incomplete, return 0 price
        }

        // Get the number of passengers and the price per person
        const numPassengers = searchParams.numPassengers;
        const pricePerPerson = selectedFlight.price;

        // Start with the base price (price per person * number of passengers)
        let totalPrice = pricePerPerson * numPassengers;

        // Adjust the price based on the fare type
        switch (selectedFareType) {
            case 'Regular':
                totalPrice += 20 * numPassengers; // Add 20 for each passenger
                break;
            case 'Plus':
                totalPrice += 40 * numPassengers; // Add 40 for each passenger
                break;
            case 'Bhav':
                totalPrice += 50 * numPassengers; // Add 50 for each passenger
                break;
            default:
                // No additional charge for "Basic" fare type
                break;
        }

        // Check if passengerData is populated correctly before calculating seats
        if (passengerData && passengerData.length > 0) {
            passengerData.forEach(passenger => {
                // Ensure seat is valid before using it
                if (passenger.seat) {
                    const seatRow = parseInt(passenger.seat[0], 10); // Extract the row number from the seat (e.g., '1A' -> 1)
                    if (seatRow === 1 || seatRow === 10) {
                        totalPrice += 20; // Add 20 for each passenger in the first or last row
                    }
                }
            });
        }

        // Add extra luggage costs
        if (handLuggageCount > 0) {
            totalPrice += handLuggageCount * 15; // Add $15 for one hand luggage
        }

        if (checkInLuggageCount > 0) {
            totalPrice += checkInLuggageCount * 25; // Add $25 for each check-in luggage (max 2)
        }

        if (bothLuggageCount === 1) {
            totalPrice += 30
        }

        // Set the final price
        setPrice(totalPrice);
    };

    // Calculate price when relevant context data changes
    useEffect(() => {
        calculatePrice();
    }, [selectedFlight, selectedFareType, searchParams.numPassengers, passengerData, handLuggageCount, checkInLuggageCount, bothLuggageCount]);


    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { component: <PassengerInfo 
            onNext={() => {
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                setCurrentStep(1)
            }}
            numPassengers={searchParams.numPassengers} passengerData={passengerData} setPassengerData={setPassengerData} contactDetails={contactDetails} setContactDetails={setContactDetails}/> },

        { component: <SeatSelection 
            onNext={() => {
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                setCurrentStep(2)
            }} 
            onBack={() => {
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                setCurrentStep(0)
            }} numPassengers={searchParams.numPassengers} passengerData={passengerData} setPassengerData={setPassengerData} bookedSeats={selectedFlight.bookedSeats}/> },

        { component: <AddExtraBags 
            onNext={() => {
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                setCurrentStep(3)
            }}
            onBack={() => {
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                setCurrentStep(1)
            }}
            handLuggageCount={handLuggageCount} setHandLuggageCount={setHandLuggageCount} checkInLuggageCount={checkInLuggageCount} setCheckInLuggageCount={setCheckInLuggageCount} bothLuggageCount={bothLuggageCount} setBothLuggageCount={setBothLuggageCount}/> },

        { component: <Payment 
            onBack={() => {
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                setCurrentStep(2)
            }}
            flight={selectedFlight} fareType={selectedFareType} passengerData={passengerData} contactDetails={contactDetails} extraLuggageList={extraLuggageList} totalPrice={price}/> },
    ];

    
  return (

    
    <>
    
    <div className='booking_page_container'>
        <NavBar></NavBar>

        <div className='booking_page_content'>
            <div className='booking_stage_container'>
                <h1>Your Selected Flight</h1>
                <FlightCard flight={selectedFlight} isSelected={true} onSelect={() => {}}></FlightCard>
                <div className='current_total_price'>
                    <h3>Total Price: {price.toFixed(2)}$</h3>
                </div>
                <div className='booking_steps_card'>
                    <Steps readOnly model={bookingSteps} activeIndex={currentStep} />
                </div>

                <div className="booking_step_container">
                    {steps[currentStep].component}
                </div>

            </div>
            
        </div>

        

    </div>

    <ScrollTop />
    
    </>
    
  )
}

export default BookingPage
