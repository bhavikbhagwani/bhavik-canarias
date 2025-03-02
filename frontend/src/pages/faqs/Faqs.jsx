import React, { useEffect } from 'react'
import './Faqs.css'
import NavBar from '../home/navbar/NavBar'
import Footer from '../../components/footer/Footer'
import FaqsAccordion from './faqsaccordion/FaqsAccordion'
import { faqs } from '../../utils/faqs'
import { ScrollTop } from 'primereact/scrolltop'

const Faqs = () => {

    useEffect(() => {
            window.scrollTo(0, 0);
          }, []);


  return (
    <>
    
    <div className='faqs_page_container'>
        <NavBar></NavBar>

        <div className='faqs_page_content'>
            <div className='faqs_container'>
                <h1>Frequently Asked Questions</h1>
                <div className='faqs_p_container'>
                    <p>
                    Welcome to our Frequently Asked Questions (FAQ) page! 
                    Here, you'll find answers to some of the most common questions
                    we receive. Whether you're looking for information about our services,
                    booking process, or anything else, this page is designed to provide clarity 
                    and help make your experience with us even easier. If you can't find what you're 
                    looking for, don't hesitate to reach out to us!"
                    </p>
                </div>



                <div className='faqs_list'>

                {
                    faqs.map((faq, index) => (
                    <FaqsAccordion 
                        key={index} 
                        question={faq.question} 
                        answer={faq.answer} 
                    />
                    ))
                }

                </div>
            </div>
            
        </div>

        
    </div>
    <Footer></Footer>
    <ScrollTop />
    </>
  )
}   

export default Faqs