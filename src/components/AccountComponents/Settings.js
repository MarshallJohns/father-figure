import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

function Settings(props) {
    const [editing, setEditing] = useState(false)
    const [inputs, setInputs] = useState({
        zipcode: null,
        profile_picture: ''
    })

    useEffect(() => {
        Axios.get('/api/auth/info').then(res => {
            console.log(res.data)
            const { zipcode, profile_pic } = res.data
            setInputs({
                zipcode: zipcode,
                profile_picture: profile_pic
            })
        })
    }, [])

    const handleInputs = (e) => {
        setInputs({ [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        const { zipcode, profile_picture } = inputs
        Axios.put('/api/auth/edit', { zipcode, profile_picture }).then(res => {
            setEditing(false)
        }).catch(err => console.log(err.message))
    }

    return (
        <div className='settings'>
            {!editing ?
                <div>
                    <div>First Name: {props.firstName}</div>
                    <div>Last Name: {props.lastName}</div>
                    <div>Email: {props.email}</div>
                    <div>Zipcode: {props.zipcode}</div>
                    <div>Profile Picture: <img src={props.profile_picture} /></div>
                    <button onClick={() => setEditing(true)}>Edit Profile Picture or Zipcode</button>
                </div>
                :
                <div>
                    <div>
                        <label>Zipcode:</label>
                        <input onChange={(e) => handleInputs(e)} name='zipcode' type='text' value={inputs.zipcode} />
                        {console.log(inputs.zipcode)}
                    </div>
                    <div>
                        <label>Profile Picture:</label>
                        <input onChange={(e) => handleInputs(e)} name='profile_picture' type='text' value={inputs.profile_picture} />
                    </div>
                    <button type='submit' onClick={() => handleSubmit()}>Submit Changes</button>
                </div>}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(Settings)