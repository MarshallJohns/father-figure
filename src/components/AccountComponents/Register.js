import Axios from 'axios'
import React, { useState } from 'react'
import { loginUser } from '../../ducks/authReducer'
import { connect } from 'react-redux'

function Register(props) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [profile_picture, setProfile_picture] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [count, setCount] = useState(1)


    const handleSubmit = () => {

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
        <div className='register'>
            <div className='register-container'>
                <h1>Father Figure</h1>
                {count === 1 ?
                    <div>
                        <div className='input'>
                            <div>First Name:</div>
                            <input value={firstName} type='text' onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className='input'>
                            <div>Last Name:</div>
                            <input value={lastName} type='text' onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className='input'>
                            <div>Email:</div>
                            <input value={email} type='email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <button onClick={() => props.history.push('/')}>Cancel</button>
                        <button onClick={() => setCount(count + 1)}>Next</button>
                    </div>
                    :
                    null}
                {count === 2 ? <div>
                    <div className='input'>
                        <div>Password:</div>
                        <input value={password} type='password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='input'>
                        <div>Confirm Password:</div>
                        <input value={confirm} type='password' onChange={(e) => setConfirm(e.target.value)} />
                    </div>
                    <div className='btn-container'>
                        <button onClick={() => setCount(count - 1)}>Back</button>
                        <button onClick={() => setCount(count + 1)}>Next</button>
                    </div>
                </div> :
                    null}
                {count === 3 ? <div>
                    <div className='input'>
                        <div>Zipcode:</div>
                        <input value={zipcode} type='text' onChange={(e) => setZipcode(e.target.value)} />
                    </div>

                    <div className='input'>
                        <div>Profile Picture:</div>
                        <input value={profile_picture} type='text' onChange={(e) => setProfile_picture(e.target.value)} />
                    </div>
                    <button onClick={() => setCount(count - 1)}>Back</button>
                    <button onClick={() => handleSubmit()} type='submit'>Submit</button>
                </div> : null}

                <h3>{`Step: ${count}/3`}</h3>
            </div>
        </div>
    )
}

export default connect(null, { loginUser })(Register)