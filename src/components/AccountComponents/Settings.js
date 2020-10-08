import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/authReducer'

function Settings(props) {
    const [editing, setEditing] = useState(false)
    const [zipcode, setZipcode] = useState(props.zipcode)
    const [profile_picture, setProfile_picture] = useState(props.profile_picture)

    // useEffect(() => {
    //     Axios.get('/api/auth/info').then(res => {
    //         console.log(res.data)
    //         const { zipcode, profile_pic } = res.data
    //         setInputs({
    //             zipcode: zipcode,
    //             profile_picture: profile_pic
    //         })
    //     })
    // }, [])


    // console.log(props)

    const handleSubmit = () => {
        // const { zipcode, profile_picture } = inputs
        Axios.put('/api/auth/edit', { zipcode, profile_picture }).then(res => {
            Axios.get('/api/auth/user').then(res => {
                props.getUser(res.data)
            })
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
                        <input onChange={(e) => setZipcode(e.target.value)} name='zipcode' type='text' value={zipcode} />

                    </div>
                    <div>
                        <label>Profile Picture:</label>
                        <input onChange={(e) => setProfile_picture(e.target.value)} name='profile_picture' type='text' value={profile_picture} />
                    </div>
                    <button type='submit' onClick={() => handleSubmit()}>Submit Changes</button>
                </div>}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, { getUser })(Settings)