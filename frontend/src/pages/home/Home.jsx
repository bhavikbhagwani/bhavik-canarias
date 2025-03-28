import React, { useContext, useEffect } from 'react'
import NavBar from './navbar/NavBar'
import './Home.css'
import SearchBox from './searchbox/SearchBox'
import Footer from '../../components/footer/Footer'
import { lineSpinner } from 'ldrs'
import { FlightsContext } from '../../context/FlightsContext'
import { useAuthContext } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { ScrollTop } from 'primereact/scrolltop'

lineSpinner.register()

const Home = () => {

  const { setFlights, setSearchParams } = useContext(FlightsContext);

  const navigate = useNavigate()

  // Use useEffect to clear localStorage on page load or navigation to the Home page
  useEffect(() => {

    window.scrollTo(0, 0)


    // Clear flights and searchParams from localStorage
    localStorage.removeItem('flights');
    localStorage.removeItem('searchParams');
    localStorage.removeItem("selectedFareType");
    localStorage.removeItem("selectedFlight");

    // Optionally reset context values to their initial state
    setFlights([]); // Reset flights
    setSearchParams({
      departureCode: '',
      destinationCode: '',
      dateOfTravel: '',
      numPassengers: 0,
    }); // Reset searchParams

  }, []); // Empty dependency array means this will run once on component mount

  
  const navigateToIslands = () => {
    navigate('/islands')
  }

  return (
    <>


    <div className='home_container_first_part'>
        <NavBar></NavBar>
        <div className='home_container_first_part_inner'>
          <div className='info_container'>
                <div className='slogan'>
                  <div>
                    <h1>Connecting Every Canary Island with Ease</h1>
                    <h2>Fly <span>Direct</span>, Fly <span>Fast</span>, Fly with <span>Zero Hassle</span></h2>
                  </div>
                  <div className='flight_notice'>
                    <h2>Flights for April <span>OUT NOW</span></h2>
                  </div>
                </div>
          </div>

            <SearchBox></SearchBox>
        </div>
       
    </div>

    <div className='home_container_second_part'>
          <div className='why_choose_us_container'>
            
              <div className='features_container'>
                <div className='feature'>
                  <img src="/travel-icon.png" alt="" />
                  <h3>Direct Flights Between Islands</h3>
                  <p>We offer direct and convenient flights connecting all the Canary Islands. No layovers, just seamless travel to your destination.</p>
                </div>
                <div className='feature'>
                  <img src="/price-tag-icon.png" alt="" />
                  <h3>Affordable Prices</h3>
                  <p>Enjoy competitive pricing with no hidden fees. Travel comfortably without breaking the bank.</p>
                </div>
                <div className='feature'>
                  <img src="/left-click-icon.png" alt="" />
                  <h3>Fast and Easy Booking</h3>
                  <p>Our user-friendly platform lets you book flights in just a few clicks. No stress, just simplicity.</p>
                </div>
              
                <div className='feature'>
                  <img src="/autumn-leaf-icon.png" alt="" />
                  <h3>Eco-Friendly Travel</h3>
                  <p>We're committed to sustainable aviation practices to protect the stunning Canary Islands for future generations.</p>
                </div>
                <div className='feature'>
                  <img src="/hand-shake-icon.png" alt="" />
                  <h3>Friendly Customer Support</h3>
                  <p>Our dedicated team is happy to assist you with any questions or concerns. You can message us <Link style={{color: '#00509E'}}  to={'/contactus'}>here</Link></p>
                </div>
                <div className='feature'>
                  <img src="/history-icon.png" alt="" />
                  <h3>Flexible Travel Times</h3>
                  <p>Enjoy the freedom to travel when it suits you best. With multiple daily flights between islands, we make planning your trip effortless and convenient.</p>
                </div>
              </div>


          </div>

          <div>
          </div>

    </div>

    <div className='home_container_third_part'>
      <div className="canary_islands_content">
        <h1>Discover the Beauty of the Canary Islands</h1>
        <p>
          Explore breathtaking landscapes, golden beaches, and vibrant culture. 
          The Canary Islands offer a perfect getaway for adventure seekers and 
          relaxation lovers alike.
        </p>
        <p>
          This incredible archipelago consists of seven unique islands, each with its own charm. 
          I was born and raised in Lanzarote, an island known for its volcanic beauty, stunning 
          beaches, and rich culture. I feel truly blessed to call it home. View more about these islands:
        </p>
        
        <Link to="/islands" className="view_islands_button">
          The Canary Islands
        </Link>
      </div>
    </div>

    <Footer></Footer>

    <ScrollTop />
    
    </>
  )
}

export default Home