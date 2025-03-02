import React, { useState } from 'react'
import './FaqsAccordion.css'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";



const FaqsAccordion = ({question, answer}) => {

    const [accordionOpen, setAccordionOpen] = useState(false);


  return (
    <div className="accordion-container">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="accordion-header"
      >
        <span>{question}</span>
        <span className={`accordion-toggle-icon ${accordionOpen ? "open" : ""}`}>
          {accordionOpen ? <FaMinus color='#00509E'/> : <FaPlus color='#00509E'/>}
        </span>
      </button>
      <div className={`accordion-content ${accordionOpen ? "open" : ""}`}>
        <div className="accordion-answer">{answer}</div>
      </div>
    </div>
  )
}

export default FaqsAccordion