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
        <div className='register-container'>
            { count === 1 ?
                <div>
                    <div className='input'>
                        <labe>First Name:</labe>
                        <input value={firstName} type='text' onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className='input'>
                        <label>Last Name:</label>
                        <input value={lastName} type='text' onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className='input'>
                        <label>Email:</label>
                        <input value={email} type='email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button onClick={() => setCount(count + 1)}>Next</button>
                </div>
                :
                null}
            {count === 2 ? <div>
                <div className='input'>
                    <label>Password:</label>
                    <input value={password} type='password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='input'>
                    <label>Confirm Password:</label>
                    <input value={confirm} type='password' onChange={(e) => setConfirm(e.target.value)} />
                </div>
                <button onClick={() => setCount(count - 1)}>Back</button>
                <button onClick={() => setCount(count + 1)}>Next</button>
            </div> :
                null}
            {count === 3 ? <div>
                <div className='input'>
                    <label>Zipcode:</label>
                    <input value={zipcode} type='text' onChange={(e) => setZipcode(e.target.value)} />
                </div>

                <div className='input'>
                    <label>Profile Picture:</label>
                    <input value={profile_picture} type='text' onChange={(e) => setProfile_picture(e.target.value)} />
                </div>
                <button onClick={() => setCount(count - 1)}>Back</button>
                <button onClick={() => handleSubmit()} type='submit'>Submit</button>
            </div> : null}

            <p>{`Step: ${count}/3`}</p>
        </div>
    )
}

export default connect(null, { loginUser })(Register)