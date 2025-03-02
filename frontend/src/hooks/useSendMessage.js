import { useState } from "react"
import toast from 'react-hot-toast'

const useSendMessage = () => {


    const [loading, setLoading] = useState(false)

    const sendMessage = async (messageData) => {

        const isValid = handleInputErrors(messageData);
        if (!isValid) return;

        setLoading(true)

        try{

            const res = await fetch("/api/message/sendMessage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(messageData)
            });

            if (!res.ok) {
                throw new Error(`Failed to send message: ${res.statusText}`);
            }

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            toast.success("Message sent successfully!");

        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false)
        }

    }
    return { loading, sendMessage}
}

export default useSendMessage;


function handleInputErrors({ name, email, phoneNumber, message }) {
    if (!name || !email || !phoneNumber || !message) {
        toast.error("Please fill in all required fields");
        return false;
    }
    return true;
}
