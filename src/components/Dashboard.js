import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'
import Axios from 'axios'

function Dashboard(props) {
    const [dadJoke, setDadJoke] = useState({
        joke: '',
        saved: false
    })
    // const [weather, setWeather] = useState({})

    useEffect(() => {
        handleDadJoke()
    }, [])

    const handleDadJoke = () => {
        Axios.get('https://icanhazdadjoke.com/', { headers: { "User-Agent": "https://github.com/MarshallJohns/father-figure", "Accept": "application/json" } })
            .then(res => {
                setDadJoke({ joke: res.data.joke, saved: false })
            })
    }
    // const handleWeather = () => { }
    return (

        < div className='dashboard' >
            <div className='dad-joke'>
                <h2>Have a joke on us!</h2>
                <p>{dadJoke.joke}</p>
                {dadJoke.saved ?
                    <div>Want another joke?<button onClick={() => handleDadJoke()}>Click here!</button></div>
                    :
                    <div>Wanna save that to your aresenal?<button onClick={() => setDadJoke({ ...dadJoke, saved: true })}>Click Here!</button></div>
                }
            </div>
        </div >
    )
}

export default Dashboard