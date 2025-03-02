import React, { useState } from 'react'
import './Login.css'
import useLogIn from '../../hooks/useLogIn'
import { lineSpinner } from 'ldrs'
import { Link } from 'react-router-dom'

lineSpinner.register()

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {loading, login} = useLogIn()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(username, password)

    }


  return (
    <div className='container'>
        <form className='form_container' onSubmit={handleSubmit}>
            <div className='heading'>
                <h1>Log In</h1><h1 className='heading_name'>Bhavik Canarias</h1>
            </div>

            <div className='input_fields'>
                <div className="input-box">
                    <label className="input-label">Email</label>
                    <input placeholder="example@mail.com" className="input" name="email" type="email" 
                    value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    <span className="input-helper">enter a valid email</span>
                </div>
                <div className="input-box">
                    <label className="input-label">Password</label>
                    <input placeholder="mypassword" className="input" name="password" type="password"
                    value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <span className="input-helper">enter your password</span>
                </div>
            </div>

            <div className='button_container'>
                <button type='submit' disabled = {loading}>
                    {loading ? <span>
                        <l-line-spinner
                            size="30"
                            speed="0.9" 
                            color="#00509E" 
                        ></l-line-spinner>
                    </span> : "Login"}
                </button>
            </div>
                
            <hr className='divider_line'/>

            <div className="signup_text">
                <p>Don't have an account? <Link to={'/signup'}>Sign up</Link></p>
            </div>

            

        </form>
    </div>
  )
}

export default Login