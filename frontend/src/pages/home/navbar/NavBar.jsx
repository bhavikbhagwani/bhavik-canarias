import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import './NavBar.css'
import { Link } from 'react-router-dom';
import useLogOut from '../../../hooks/useLogOut';
import { lineSpinner } from 'ldrs'
import SideBar from './sidebar/SideBar';


lineSpinner.register()


const NavBar = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)


    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }

    const menuClicked = () => {
        toggleDrawer()
    }

  

  const {loading, logout} = useLogOut()


  const handleLogOutClicked = async () => {

    await logout()
  }







  return (
    <nav className='nav_container'>
        <div className='nav_inner'>
            <div className='logo_container'>
                <Link to={'/'} onClick={() => window.scrollTo(0, 0)}>
                  <img src="logo3.png" alt="logo" />
                </Link>
            </div>
            <div className='nav_links_container'>
                <Link to="/islands" className="nav_link">THE CANARY ISLANDS</Link>

                <Link to="/" className="nav_link">BOOK FLIGHTS</Link>

                <Link to="/mybookings" className="nav_link">MY BOOKINGS</Link>


                <Link to="/faqs" className="nav_link">FAQs</Link>

                <Link to="/contactus" className="nav_link">CONTACT US</Link>


                <Link className="nav_link"  onClick={handleLogOutClicked}>
                  {loading ? <span>
                          <l-line-spinner
                              size="30"
                              speed="0.9" 
                              color="#00509E" 
                          ></l-line-spinner>
                      </span> : "LOG OUT"}
                </Link>

            </div>

        </div>

        <div className='open_icon'>
            <GiHamburgerMenu size={30} color='#87CEEB' onClick={menuClicked}></GiHamburgerMenu>
        </div>

        <SideBar isDrawerOpen = {isDrawerOpen} toggleDrawer={toggleDrawer} handleLogOutClicked={handleLogOutClicked} loading={loading}></SideBar>
        
        
    </nav>
  )
}

export default NavBar