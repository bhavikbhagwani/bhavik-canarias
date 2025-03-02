import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './SearchBox.css'
import useSearchFlights from '../../../hooks/useSearchFlights';
import { FlightsContext } from '../../../context/FlightsContext';
import toast from 'react-hot-toast';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';


const SearchBox = () => {

    

    const islands = [
        "Lanzarote Airport - ACE",
        "Fuerteventura Airport - FUE",
        "Tenerife Sur Airport - TFS",
        "Tenerife North Airport - TFN",
        "Gran Canaria Airport - LPA",
        "La Palma Airport - SPC",
        "El Hierro Airport - VDE",
        "La Gomera Airport - GMZ",
    ]

    const { setFlights, setSearchParams } = useContext(FlightsContext);
    const navigate = useNavigate();
    const { loading, flights, searchFlights} = useSearchFlights()

    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [dateOfTravel, setDateOfTravel] = useState('');
    const [numPassengers, setNumPassengers] = useState(1);

    const [filteredDestinations, setFilteredDestinations] = useState(islands);


    const handleDepartureChange = (event) => {
        const selectedDeparture = event.target.value;
        setDeparture(selectedDeparture);
    
        setFilteredDestinations(
            islands.filter((island) => 
                island !== selectedDeparture &&
                !((selectedDeparture === "Tenerife Sur Airport - TFS" && island === "Tenerife North Airport - TFN") || 
                  (selectedDeparture === "Tenerife North Airport - TFN" && island === "Tenerife Sur Airport - TFS"))
            )
        );
    };    

    const handleDestinationChange = (event) => {
        setDestination(event.target.value);
    };

    const handleDateChange = (event) => {
        const selectedDate = event.value;
        
        
        setDateOfTravel(selectedDate);
    };
    

    const handleNumPassengersChange = (event) => {
        setNumPassengers(event.target.value);
    };

    useEffect(() => {
        console.log("Updated flights:", flights);
        setFlights(flights)
    }, [flights]);

    useEffect(() => {
    const recentSearch = localStorage.getItem('recentSearch');
    if (recentSearch) {
        const { departure, destination, dateOfTravel, numPassengers } = JSON.parse(recentSearch);
        setDeparture(departure || '');
        setDestination(destination || '');
        setDateOfTravel(dateOfTravel ? new Date(dateOfTravel) : null);
        setNumPassengers(numPassengers || 1);

        // Update filtered destinations based on saved departure
        if (departure) {
            setFilteredDestinations(
                islands.filter((island) => 
                    island !== departure &&
                    !((departure === "Tenerife Sur Airport - TFS" && island === "Tenerife North Airport - TFN") || 
                    (departure === "Tenerife North Airport - TFN" && island === "Tenerife Sur Airport - TFS"))
                )
            );
        }
    }
}, []);


    // Recalculate filtered destinations whenever the departure changes
    useEffect(() => {
        if (departure) {
            setFilteredDestinations(
                islands.filter((island) => 
                    island !== departure &&
                    !((departure === "Tenerife Sur Airport - TFS" && island === "Tenerife North Airport - TFN") || 
                    (departure === "Tenerife North Airport - TFN" && island === "Tenerife Sur Airport - TFS"))
                )
            );
        }
    }, [departure]);

    useEffect(() => {
        console.log("date of travel after change: ", dateOfTravel)
    }, [dateOfTravel])

    

    const handleSearchFlightsClicked = async () => {

        if (!departure || !destination || !dateOfTravel || !numPassengers){
            toast.error("Please fill in all the fields.");
            return; // Exit the function early if any field is missing
        }

        const formattedDate = new Date(dateOfTravel).toLocaleDateString('en-CA');
        setDateOfTravel(formattedDate); // Update state correctly

        const searchParamsToStore = { departure, destination, dateOfTravel: formattedDate, numPassengers }
        // Save searchParams to localStorage
        localStorage.setItem('recentSearch', JSON.stringify(searchParamsToStore));

        console.log("Departure Airport: " + departure)
        console.log("Destination Airport: " + destination)
        console.log("Date of Travel: " + formattedDate)
        console.log("Number of passengers: " + numPassengers)



        const departureCode = departure.split(" - ")[1];
        const destinationCode = destination.split(" - ")[1];
    
        await searchFlights(
            departureCode,
            destinationCode,
            formattedDate,
            numPassengers
        );
    
        

        setSearchParams({ departureCode, destinationCode, dateOfTravel: formattedDate, numPassengers });
        navigate('/flights');
    }   







  return (
    <div className='search_box_container'>
        <div className="input_group">
            <label htmlFor="departure">Departure Airport:</label>
            <Dropdown 
            value={departure} onChange={handleDepartureChange} 
            options={islands}
            placeholder="Departure Airport" 
            checkmark={true} highlightOnSelect={false} 
            invalid = {departure === ""}
            />
            {/* <select id="departure" name="departure" value={departure} onChange={handleDepartureChange}>
                <option value="">Select Departure</option>
                        {islands.map((island, index) => (
                            <option key={index} value={island}>
                                {island}
                            </option>
                        ))}
            </select> */}
        </div>

        <div className="input_group">
            <label htmlFor="destination">Destination Airport:</label>
            <Dropdown 
            value={destination} onChange={handleDestinationChange} 
            options={filteredDestinations}
            placeholder="Destination Airport" 
            checkmark={true} highlightOnSelect={false} 
            invalid = {destination === ""}
            />
            {/* <select id="destination" name="destination" value={destination} onChange={handleDestinationChange}> 
                <option value="">Select Destination</option>
                        {filteredDestinations.map((island, index) => (
                            <option key={index} value={island}>
                                {island}
                            </option>
                        ))}
            </select> */}
        </div>
        

        <div className="input_group">
            <label htmlFor="date">Date of Travel:</label>
            <Calendar 
                value={dateOfTravel ? new Date(dateOfTravel) : null} 
                onChange={handleDateChange} 
                dateFormat="dd/mm/yy" 
                minDate={new Date()} 
                maxDate={new Date(new Date().setMonth(new Date().getMonth() + 6))}
                showButtonBar
                invalid = {!dateOfTravel}
                placeholder='Select Date Of Travel'
            />

            {/* <input className='calendar' type="date" id="date" name="date" value={dateOfTravel} onChange={handleDateChange} min={new Date().toISOString().split("T")[0]}/> */}
        </div>

        <div className="input_group">
            <label htmlFor="passengers">Number of Passengers:</label>
            <Dropdown 
            value={numPassengers} onChange={handleNumPassengersChange} 
            options={[1, 2, 3, 4, 5, 6, 7, 8]}
            placeholder="Number of Passengers" 
            checkmark={true} highlightOnSelect={false} 
            />
            {/* <select id="passengers" name="passengers" value={numPassengers} onChange={handleNumPassengersChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
            </select> */}
        </div>

        <button type="submit" className="search_button" onClick={handleSearchFlightsClicked}
        disabled={!departure || !destination || !dateOfTravel || !numPassengers || loading}>
            {loading ? <span>
                        <l-line-spinner
                            size="30"
                            speed="0.9" 
                            color="#00509E" 
                        ></l-line-spinner>
                    </span> : "Search Flights"}
        </button>
    </div>
  )
}

export default SearchBox