import Axios from 'axios'
import React, { useState } from 'react'
import { loginUser } from '../../ducks/authReducer'
import { connect } from 'react-redux'

function Register(props) {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm: '',
        zipcode: '',
        profile_picture: ''
    })

    const handleInputs = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { firstName, lastName, email, password, confirm, zipcode, profile_picture } = form

        if (firstName, lastName, email, password, confirm) {
            Axios.post('/api/auth/register', { firstName, lastName, email, password, confirm, zipcode, profile_picture }).then(res => {
                props.loginUser(res.data)
                props.history.push('/dashboard')
            }).catch(err => alert(err.response.request.response))
        } else {
            alert('Please fill out all fields')
        }



    }

    return (
        <div className='register-container'>
            <div className='input'>
                <labe>First Name:</labe>
                <input name='firstName' type='text' onChange={handleInputs} />
            </div>
            <div className='input'>
                <label>Last Name:</label>
                <input name='lastName' type='text' onChange={handleInputs} />
            </div>
            <div className='input'>
                <label>Email:</label>
                <input name='email' type='email' onChange={handleInputs} />
            </div>
            <div className='input'>
                <label>Password:</label>
                <input name='password' type='password' onChange={handleInputs} />
            </div>
            <div className='input'>
                <label>Confirm Password:</label>
                <input name='confirm' type='password' onChange={handleInputs} />
            </div>
            <div className='input'>
                <label>Zipcode:</label>
                <input name='zipcode' type='text' onChange={handleInputs} />
            </div>
            <div className='input'>
                <label>Profile Picture:</label>
                <input name='profile_picture' type='text' onChange={handleInputs} />
            </div>

            <button onClick={handleSubmit} type='submit'>Submit</button>
        </div>
    )
}

export default connect(null, { loginUser })(Register)