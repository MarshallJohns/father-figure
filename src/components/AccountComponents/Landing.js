import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { loginUser } from '../../ducks/authReducer'
import { connect } from 'react-redux'



function Landing(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin() {
        if (email && password) {
            axios.post('/api/auth/login', { email, password }).then(res => {
                props.loginUser(res.data)
                props.history.push('/dashboard')
            }).catch(err => console.log(err.message))
        } else (alert('Please fill out both fields'))
    }

    return (
        <div className='Landing'>
            <div className='login-container'>
                <h1>Father Figure</h1>
                <p>Already a member? Login here!</p>
                <div className='login-inputs'>
                    <div>
                        Email:
                        <input value={email} type='email' onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        Password:
                        <input value={password} type='password' onChange={e => setPassword(e.target.value)} />
                    </div>
                </div>
                <button type='submit' onClick={() => handleLogin()}>Login</button>
                <div className='register-btn'>
                    <p>Not a member? Click here to register!</p>
                    <Link to='/register'>
                        <button>Click Me!</button>
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default connect(null, { loginUser })(Landing)