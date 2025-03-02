import React, { useEffect } from 'react'
import './UserBookings.css'
import NavBar from '../home/navbar/NavBar'
import useGetUserBookings from '../../hooks/useGetUserBookings';
import BookingCard from './BookingCard/BookingCard';
import { Link } from 'react-router-dom';
import { ScrollTop } from 'primereact/scrolltop';

const UserBookings = () => {

    useEffect(() => {
            window.scrollTo(0, 0);
          }, []);


    const { loading, bookings, getUserBookings } = useGetUserBookings();

    useEffect(() => {
        getUserBookings(); // Fetch bookings when component mounts
    }, []);

    useEffect(() => {
        console.log("Fetched Bookings:", bookings); // Log bookings when they update
    }, [bookings]); // Runs whenever bookings change



  return (
    <>
    
    <div className='user_bookings_page_container'>
        <NavBar></NavBar>

        <div className='user_bookings_page_content'>
            <div className='user_bookings_container'>
                <h1>My Bookings</h1>

                <div className='user_bookings'>
                {loading ? (
                    <span>
                        <l-line-spinner
                            size="100"
                            speed="0.9" 
                            color="#00509E" 
                        ></l-line-spinner>
                    </span>
                ) : bookings.length > 0 ? (

                    <>
                        {
                            bookings.map((booking) => (
                                <BookingCard key={booking._id} booking={booking}></BookingCard>
                            ))
                        }
                    </>


                ) : (
                    <>
                    <div className='no_bookings_found'>
                        <h3>No bookings found. You haven't booked any flights yet</h3>
                    </div>

                    <Link to={'/'} onClick={() => window.scrollTo(0, 0)}>
                        <button className='book_flights_button'>Book Flights</button>
                    </Link>
                    </>
                )}
                </div>

            </div>
            
        </div>

        

    </div>
    <ScrollTop />
    </>
  )
}

export default UserBookings