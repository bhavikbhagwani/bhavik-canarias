import React, { useEffect, useState } from 'react'
import './ContactUs.css'
import NavBar from '../home/navbar/NavBar'
import Footer from '../../components/footer/Footer'
import useSendMessage from '../../hooks/useSendMessage'
import { useNavigate } from 'react-router-dom'

import { lineSpinner } from 'ldrs'
import { ScrollTop } from 'primereact/scrolltop'

lineSpinner.register()

const ContactUs = () => {

    useEffect(() => {
            window.scrollTo(0, 0);
          }, []);

    const navigate = useNavigate();

    const { loading, sendMessage } = useSendMessage()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: ''
    });


    const validateFields = () => {

        let newErrors = { name: '', email: '', phoneNumber: '', message: '' };
        let isValid = true;

        if (!name.trim()) {
            newErrors.name = 'Full Name is required';
            isValid = false;
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = 'Enter a valid email';
            isValid = false;
        }

        if (!phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
            isValid = false;
        } else if (!/^\+?[\d\s]{10,15}$/.test(phoneNumber)) {
            newErrors.phoneNumber = 'Enter a valid phone number';
            isValid = false;
        }

        if (!message.trim()) {
            newErrors.message = 'Message cannot be empty';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateFields()) {
            console.log('Form Submitted:', { name, email, phoneNumber, message });
            // Reset form after successful submission
            setName('');
            setEmail('');
            setPhoneNumber('');
            setMessage('');
            setErrors({ name: '', email: '', phoneNumber: '', message: '' });

            const messageData = {
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                message: message,
            }
            await sendMessage(messageData)

            // Navigate to the SuccessPage with message success details
            navigate("/success", { state: { type: "message"} });
        }
    };

    const handleChange = (field, value) => {
        // Ensure state updates correctly
        if (field === 'name') setName(value);
        if (field === 'email') setEmail(value);
        if (field === 'phoneNumber') setPhoneNumber(value);
        if (field === 'message') setMessage(value);
    
        // Validate as user types
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: value.trim() === '' ? `${field.charAt(0).toUpperCase() + field.slice(1)} is required` : ''
        }));
    };


  return (
    <>
    
    <div className='contact_us_page_container'>
        <NavBar></NavBar>

        <div className='contact_us_page_content'>
            <div className='contact_us_container'>
                <h1>Contact Us</h1>
                
                <div className='contact_us_text_container'>
                    <p>
                    Have questions or need assistance? We're here to help! 
                    Whether you need support with a booking, have inquiries 
                    about our services, or just want to reach out, feel free 
                    to contact us. Our team is available to ensure your travel 
                    experience is smooth and hassle-free
                    </p>
                </div>

                    <div className='form_contact'>
                        <form onSubmit={handleSubmit}>
                            <div className='form_group'>
                                <label htmlFor='name'>Name</label>
                                <input 
                                    className='input_field' 
                                    type='text' 
                                    id='name' 
                                    name='name' 
                                    placeholder='Enter your name'  
                                    value={name} 
                                    onChange={(e) => handleChange('name', e.target.value)} 
                                />
                                {errors.name && <span className="message_error">{errors.name}</span>}
                            </div>
    
                            <div className='form_group'>
                                <label htmlFor='email'>Email</label>
                                <input 
                                    className='input_field'
                                    id='email' 
                                    name='email' 
                                    placeholder='Enter your email' 
                                    value={email} 
                                    onChange={(e) => handleChange('email', e.target.value)} 
                                />
                                {errors.email && <span className="message_error">{errors.email}</span>}
                            </div>
    
                            <div className='form_group'>
                                <label htmlFor='phone'>Phone</label>
                                <input 
                                    className='input_field' 
                                    type='tel' 
                                    id='phone' 
                                    name='phone' 
                                    placeholder='Enter your phone number' 
                                    value={phoneNumber} 
                                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                />
                                {errors.phoneNumber && <span className="message_error">{errors.phoneNumber}</span>}
                            </div>
    
                            <div className='form_group'>
                                <label htmlFor='message'>Message</label>
                                <textarea 
                                    className='input_field'
                                    id='message' 
                                    name='message' 
                                    placeholder='Enter your message' 
                                    rows='5' 
                                    value={message} 
                                    onChange={(e) => handleChange('message', e.target.value)}
                                />
                                {errors.message && <span className="message_error">{errors.message}</span>}
                            </div>
    
                            <button type='submit' className='submit_button'>
                                {loading ? <span>
                                    <l-line-spinner
                                        size="30"
                                        speed="0.9" 
                                        color="#00509E" 
                                    ></l-line-spinner>
                                </span> : "Submit"}
                            </button>

                            
                        </form>
                    </div>
                

            </div>
            
        </div>

        
    </div>
    <Footer></Footer>
    <ScrollTop />
    </>
  )
}

export default ContactUs