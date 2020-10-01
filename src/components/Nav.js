import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getUser, logoutUser } from '../ducks/authReducer'
import { Link } from 'react-router-dom'



function Nav(props) {
    const [display, setDisplay] = useState(false)
    const handleDisplay = (e) => {
        // e.preventDefault()
        setDisplay(!display)
    }

    const handleLogout = (e) => {

        Axios.delete('/api/auth/logout').then(res => {
            props.logoutUser()
        })
    }

    useEffect(() => {
        Axios.get('/api/auth/user').then(res => {
            props.getUser(res.data)
        })
    }, [])
    return (
        <header className='navbar'>
            <h1>Father Figure</h1>
            <div className='nav-ui'>
                <img alt='User' />
                <Link style={{ textDecoration: 'none', color: 'black' }} to='/dashboard'>
                    <h3>{props.firstName}</h3>
                </Link>
                <div onClick={handleDisplay} className='hamburger'></div>
                <div className={display ? 'display' : 'noDisplay'}>
                    <div className='dropdown-ui'>
                        <Link className='ui-items' style={{ textDecoration: 'none', color: 'white' }} to='dadjokes'>Favorite Jokes</Link>
                        <Link className='ui-items' style={{ textDecoration: 'none', color: 'white' }} to='/settings'>Settings</Link>
                    </div>
                    <Link className='logout' style={{ textDecoration: 'none', color: 'white' }} onClick={handleLogout} to='/'>Logout</Link>
                </div>
            </div>
        </header>
    )
}
const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, { getUser, logoutUser })(Nav)