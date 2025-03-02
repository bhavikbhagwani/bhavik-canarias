import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Signup.css'
import useSignUp from '../../hooks/useSignUp'

const Signup = () => {

    const [inputs, setInputs] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const {loading, signup} = useSignUp()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs)
        await signup(inputs)
    }


  return (
    <div className='container-signup'>
        <form className='form_container_signup' onSubmit={handleSubmit}>
            <div className='heading-signup'>
                <h1>Sign Up</h1><h1 className='heading_name'>Bhavik Canarias</h1>
            </div>

            <div className='input_fields-signup'>
                <div className="input-box-signup">
                    <label className="input-label-signup">Full Name</label>
                    <input placeholder="your full name here" className="input-signup" name="fullName" type="text"
                    value={inputs.fullName} onChange={(e) => setInputs({...inputs, fullName: e.target.value})}></input>
                    <span className="input-helper">enter your real name</span>
                </div>
                <div className="input-box">
                    <label className="input-label-signup">Email</label>
                    <input placeholder="example@mail.com" className="input-signup" name="email" type="email"
                    value={inputs.email} onChange={(e) => setInputs({...inputs, email: e.target.value})}></input>
                    <span className="input-helper">enter a valid email</span>
                </div>
                <div className="input-box">
                    <label className="input-label-signup">Password</label>
                    <input placeholder="my password" className="input-signup" name="password" type="password"
                    value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})}></input>
                    <span className="input-helper">enter your password</span>
                </div>
                <div className="input-box">
                    <label className="input-label-signup">Confirm Password</label>
                    <input placeholder="my password repeated" className="input-signup" name="password" type="password"
                    value={inputs.confirmPassword} onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}></input>
                    <span className="input-helper">confirm your password</span>
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
                    </span> : "Sign Up"}
                </button>
            </div>
                
            <hr className='divider_line'/>

            <div className="signup_text">
                <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
            </div>

            

        </form>
    </div>
  )
}

export default Signup