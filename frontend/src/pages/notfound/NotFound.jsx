import React from 'react'
import './NotFound.css'
import { useNavigate } from 'react-router-dom'
import { MdError } from "react-icons/md";


const NotFound = () => {

    const navigate = useNavigate()

    const navigateHomeClicked = () => {
        navigate('/')
    }

  return (
    <div className='not_found_page_container'>
    
        <div className='not_found_page_content'>

            <div className='not_found_container'>
                <h1>404 - Page Not Found</h1>

                <p>The page you are looking for does not exist.</p>

                <MdError color='#00509E' size={200} />
        

                <button className='go_home_button' onClick={navigateHomeClicked}>GO HOME</button>
            
            </div>

            
            
        </div>

        

    </div>
  )
}

export default NotFound