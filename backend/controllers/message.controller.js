import Message from "../models/message.model.js";

import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);  // Use API key from environment

export const sendMessage = async (req, res) => {
    try {
        
        const { name, email, phoneNumber, message } = req.body;

        // Validate request body
        if (!name || !email || !phoneNumber || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new message document
        const newMessage = new Message({
            name,
            email,
            phoneNumber,
            message
        });

        const emailSendingMessageObject = {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            message
        }


        // Send email confirmation
        try {
            await sendEmailConfirmationForMessage(emailSendingMessageObject);
        } catch (emailError) {
            console.error('Error sending email:', emailError.message);
            return res.status(500).json({ error: 'Failed to send email confirmation' });
        }

        // Save to database
        await newMessage.save();

        res.status(201).json({ message: 'Message sent successfully' });

    } catch (error) {
        console.error("Error in addMessage controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const sendEmailConfirmationForMessage = async (emailSendingMessageObject) => {

    const { name, email, phoneNumber, message } = emailSendingMessageObject;
    
    const msg = {
        to: email,
        from: {
            name: 'Bhavik Canarias',
            email: process.env.FROM_EMAIL
        },
        subject: 'Message Sent Confirmation',
        templateId: process.env.TEMPLATE_ID_MESSAGE,
        dynamicTemplateData:{
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            message: message,
        }
    };
    
    try {
        await sgMail.send(msg);
        console.log('Email sent to ', email);
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Email sending failed');
    }

}