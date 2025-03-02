import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin, FaTiktok } from 'react-icons/fa';
import './Footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer_container'>
        <div className='footer_column'>
          <div className='footer_logo'>
            <img src='logo3.png' alt='Logo' />
          </div>
        </div>

        <div className='footer_column'>
          <div className='footer_info'>
            <h3>Contact Us</h3>
            <p><strong>Phone:</strong> +34 699 00 21 38</p>
            <p><strong>Email:</strong> bhavikbhagwani05@gmail.com</p>
          </div>
          <div className='footer_button_container'>
          <Link to={'/contactus'}>
                <button>CONTACT US</button>
            </Link>
          </div>

          <div className='footer_social'>
            <h3>Follow Us</h3>
            <div className='social_icons'>
              <a href='/' ><FaTiktok size={30} /></a>
              <a href='/' ><FaInstagram size={30} /></a>
            </div>
          </div>

          <div className='footer_copy_right'>
            <p>&copy; {new Date().getFullYear()} Bhavik Canarias. All rights reserved.</p>
          </div>

        </div>

        <div className='footer_column'>
          <div className='footer_faqs  '>
            <h3>Frequently Asked Questions</h3>
            <p>Find answers to common questions about booking, payments, and more in our FAQ section.</p>
          </div>
          <div className='footer_button_container'>
            <Link to={'/faqs'}>
                <button>FAQs</button>
            </Link>
          </div>
          <div className='footer_about_us'>
            <h3>About our islands</h3>
            <p>Discover the beauty and diversity of the Canary Islands, from volcanic landscapes to golden beaches, each with its own unique charm.</p>
          </div>
          <div className='footer_button_container'>
            <Link to={'/islands'}>
                <button style={{width: "300px"}}>ABOUT OUR ISLANDS</button>
            </Link>
          </div>
        </div>
      </div>
      <div className='author_container'>
        <p>Website Created by Bhavik Bhagwani</p>
        <p>@bhavikbhagwani</p>
      </div>
    </footer>
  )
}

export default Footer