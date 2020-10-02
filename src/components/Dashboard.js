import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Axios from 'axios'

function Dashboard(props) {
    const [dadJoke, setDadJoke] = useState({
        joke: '',
        saved: false
    })
    const [weather, setWeather] = useState({})

    useEffect(() => {
        handleDadJoke()
        handleWeather()
    }, [])

    const handleDadJoke = () => {
        Axios.get('https://icanhazdadjoke.com/', { headers: { "User-Agent": "https://github.com/MarshallJohns/father-figure", "Accept": "application/json" } })
            .then(res => {
                setDadJoke({ joke: res.data.joke, saved: false })
            })
    }
    const handleSave = (e) => {
        const { joke } = dadJoke
        Axios.post('/api/jokes', { joke }).then(res => {
            setDadJoke({ ...dadJoke, saved: true })
        })
    }
    const handleWeather = () => {
        const apiKey = '1c4df6046da516c6860ef3c69f5acf67'
        if (props.zipcode) {
            Axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${props.zipcode},&appid=${apiKey}`)
                .then(res => setWeather(res.data))
        }
    }


    // const fahrenheit = (main.temp − 273.15) × 9/5 + 32
    return (

        < div className='dashboard' >
            <div className='widget'>
                <div className='dad-joke'>
                    <h2>Have a joke on us!</h2>
                    <p>{dadJoke.joke}</p>
                    {dadJoke.saved ?
                        <div>Want another joke?<button onClick={() => handleDadJoke()}>Click here!</button></div>
                        :
                        <div>Wanna save that to your aresenal?<button onClick={() => handleSave()}>Click Here!</button></div>
                    }
                </div>
            </div>
            <div className='widget'>
                {!props.zipcode ?
                    <div>Please save your zipcode in settings to view your current weather.</div>
                    :
                    <div>
                        {console.log(weather.main)}

                    </div>}
            </div>
        </div >
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Dashboard)