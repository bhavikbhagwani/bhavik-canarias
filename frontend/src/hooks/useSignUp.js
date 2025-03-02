import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {

    const [loading, setLoading] = useState(false)
    const {authUser, setAuthUser} = useAuthContext()

    const signup = async({fullName, email, password, confirmPassword}) => {
        const success = handleInputErrors({fullName, email, password, confirmPassword})

        if (!success) return;

        try{

            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({fullName, email, password, confirmPassword})
            })

            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }

            // localstorage
            localStorage.setItem("flight-app-user", JSON.stringify(data))
            // context
            setAuthUser(data)


        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false)
        }
    }
    return { loading, signup}

}

export default useSignUp


function handleInputErrors({fullName, email, password, confirmPassword}){
    if(!fullName || !email || !password || !confirmPassword){
        toast.error('Please fill in all fields')
        return false;
    }

    if (password !== confirmPassword){
        toast.error('Passwords do not match')
        return false
    }

    if (password.length < 6){
        toast.error('Password must be at least 6 characters')
        return false
    }   

    return true
}