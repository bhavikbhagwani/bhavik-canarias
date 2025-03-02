import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from 'react-hot-toast'

const useLogIn = () => {


    const [loading, setLoading] = useState(false)
    const {authUser, setAuthUser} = useAuthContext()

    const login = async (email, password) => {
        
        const success = handleInputErrors(email, password)

        if (!success) return;

        setLoading(true)

        try{

            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
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
    return { loading, login}
}

export default useLogIn


function handleInputErrors(email, password){
    if(!email || !password){
        toast.error('Please fill in all fields')
        return false;
    }

    return true
}