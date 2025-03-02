import React from 'react'
import './Loading.css'
import { lineSpinner } from 'ldrs'

lineSpinner.register()

const Loading = () => {
  return (
    <div className='fade-in'>

        <div className="loading-container">
            
        <l-line-spinner
            size="100"
            speed="0.9" 
            color="#00509E" 
            ></l-line-spinner>

            <h2>Loading</h2>
        </div>

    </div>

  )
}

export default Loading