import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
    return (
        <div className='Landing'>
            <p className='site-info'>Welcome to Father Figure! <br />The only site for dads. <br />Only things you need, Nothing you dont!
            </p>
            <div className='login-container'>
                <p>Already a member? Login here!</p>
                <label>Email: <input type='email' /></label>
                <label>Password: <input type='password' /></label>
            </div>
        </div>
    )
}

export default Landing