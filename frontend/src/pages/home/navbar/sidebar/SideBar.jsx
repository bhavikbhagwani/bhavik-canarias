import React from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import "./SideBar.css";

const SideBar = ({ isDrawerOpen, toggleDrawer, handleLogOutClicked, loading }) => {
  return (
    <div className={`sidebar ${isDrawerOpen ? "open" : "closed"}`}>
      <div className="sidebar_content">
        {/* Close button */}
        <div className="close_btn" onClick={toggleDrawer}>
          <IoMdClose size={28} color="#87CEEB" />
        </div>

        {/* Logo */}
        <div className="sidebar_logo">
          <Link to="/" onClick={toggleDrawer}>
            <img src="logo3.png" alt="logo" />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar_links">
          <Link className="nav_link_sidebar" to="/islands" onClick={toggleDrawer}>THE CANARY ISLANDS</Link>
          <Link className="nav_link_sidebar" to="/" onClick={toggleDrawer}>BOOK FLIGHTS</Link>
          <Link className="nav_link_sidebar" to="/mybookings" onClick={toggleDrawer}>MY BOOKINGS</Link>
          <Link className="nav_link_sidebar" to="/faqs" onClick={toggleDrawer}>FAQs</Link>
          <Link className="nav_link_sidebar" to="/contactus" onClick={toggleDrawer}>CONTACT US</Link>
          <Link className="nav_link_sidebar" onClick={handleLogOutClicked}>
            {loading ? <span>
                      <l-line-spinner
                          size="30"
                          speed="0.9" 
                          color="#00509E" 
                      ></l-line-spinner>
                  </span> : "LOG OUT"}
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
