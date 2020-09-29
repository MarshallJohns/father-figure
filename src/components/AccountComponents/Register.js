import Axios from 'axios'
import React, { useState } from 'react'
import { loginUser } from '../../ducks/authReducer'
import { connect } from 'react-redux'

function Register(props) {
    const [form, setForm] = useState({
        first: '',
        last: '',
        email: '',
        password: '',
        confirm: ''
    })

    const handleInputs = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { first, last, email, password, confirm } = form

        if (first, last, email, password, confirm) {
            Axios.post('/api/auth/register', { first, last, email, password, confirm }).then(res => {
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
                <input name='first' type='text' onChange={handleInputs} />
            </div>
            <div className='input'>
                <label>Last Name:</label>
                <input name='last' type='text' onChange={handleInputs} />
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
            <button onClick={handleSubmit} type='submit'>Submit</button>
        </div>
    )
}

export default connect(null, { loginUser })(Register)