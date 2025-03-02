import React, { useContext, useEffect, useRef, useState } from 'react'
import './Flights.css'
import NavBar from '../home/navbar/NavBar'
import FlightCard from './FlightCard/FlightCard'
import { FlightsContext } from '../../context/FlightsContext'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { fareTypes } from '../../utils/fareTypes'
import { FlightSelectionContext } from '../../context/FlightSelectContext'
import { ScrollTop } from 'primereact/scrolltop'

const Flights = () => {



    const navigate = useNavigate();

    useEffect(() => {
        // Scroll to the top when the component mounts (i.e., on page refresh)
        window.scrollTo(0, 0);
        // // Clear flights and searchParams from localStorage
        // localStorage.removeItem('selectedFlight');
        // localStorage.removeItem('selectedFareType');
    }, []); // Empty dependency array ensures this runs once when the component mounts

    const { flights, searchParams } = useContext(FlightsContext);

    const { setSelectedFlight, setSelectedFareType } = useContext(FlightSelectionContext);

    
    const [selectedFlightId, setSelectedFlightId] = useState(null);
    const [selectedFlightType, setSelectedFlightTypeLocal] = useState(null);

    // Ref for the fare options container
    const fareOptionsRef = useRef(null);
    const continueButtonRef = useRef(null);

    const handleFlightSelect = (flightId) => {
        setSelectedFlightId(flightId); // Update selected flight
        setSelectedFlightTypeLocal(null); // Reset flight type selection
    };

    // Scroll to fare options when a flight is selected
    useEffect(() => {
        if (selectedFlightId && fareOptionsRef.current) {
            fareOptionsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [selectedFlightId]); // Only trigger when selectedFlight changes

    // Scroll to the continue button when a fare type is selected
    useEffect(() => {
        if (selectedFlightType && continueButtonRef.current) {
            continueButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [selectedFlightType]);

    const handleFlightTypeSelect = (type) => {
        setSelectedFlightTypeLocal(type); // Update selected flight type
    };

    const handleContinue = () => {
        // Collect selected flight and fare type data
        const selectedFlight = flights.find(flight => flight._id === selectedFlightId);
        setSelectedFlight(selectedFlight);
        setSelectedFareType(selectedFlightType);

        // Navigate to the booking page
        navigate('/booking');
    }   


  return (
    <>
    <div className='flights_container'>
        <NavBar></NavBar>

        <div className='flights_page_content'>

            <div className='flights_fetched_container'>
                <div className='flights_fetched_summary'>
                    <div>{searchParams.numPassengers === 0 ? '# - #' : `${searchParams.departureCode} - ${searchParams.destinationCode}`}</div>
                    <div>{searchParams.numPassengers === 0 ? '## - ## - ####' : searchParams.dateOfTravel}</div>
                    <div>{searchParams.numPassengers === 0 ? '#' : `${searchParams.numPassengers} passengers`}</div>
                </div>
                
                {
                searchParams.numPassengers === 0 ? (
                    <div className="search_expired">
                        <h3>Search expired. Please make a new search</h3>
                    </div>
                ) : flights && flights.length > 0 ? (
                    flights.map((flight) => (
                    <FlightCard key={flight._id} flight={flight}
                    isSelected={selectedFlightId === flight._id}
                    onSelect={handleFlightSelect}
                    ></FlightCard>
                    ))
                ) : (
                    <div className="no_flights_found">
                        <h3>No flights found. Please make a new search</h3>
                    </div>
                )}
                {selectedFlightId && (
                    <div className="flight_type_options" ref={fareOptionsRef}>
                        <h3 className='flight_type_heading'>Choose your fare</h3>
                        <div className="flight_type_cards">
                            {fareTypes.map((fare, index) => (
                                <div
                                    key={index}
                                    className={`flight_type_card ${
                                        selectedFlightType === fare.type ? 'selected' : ''
                                    }`}
                                    onClick={() => handleFlightTypeSelect(fare.type)}
                                >
                                    <div className="flight_type_card_content">
                                        <h3>{fare.type}</h3>
                                        <p className='fare_descr'>{fare.description}</p>
                                        <p className='fare_price'>$ {fare.price}</p>
                                    </div>
                                    <button className="select_button">
                                        {selectedFlightType === fare.type ? 'SELECTED' : 'SELECT'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {selectedFlightType && (
                    <button className="continue_button" ref={continueButtonRef} onClick={handleContinue} disabled={!selectedFlightType || !selectedFlightId}>
                        Continue
                    </button>
                )}

            <Link to={'/'} onClick={() => window.scrollTo(0, 0)}>
                <button className='new_search_button'>NEW SEARCH</button>
            </Link>

            </div>
        </div>
            
    
        
    </div>

    <ScrollTop />
    </>
  )
}

export default Flights