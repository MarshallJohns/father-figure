import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Axios from 'axios'




function Dashboard(props) {
    const [dadJoke, setDadJoke] = useState({
        joke: '',
        saved: false
    })
    const [weather, setWeather] = useState({

    })
    const [zipcode, setZipcode] = useState(null)
    const [fahrenheit, setFahrenheit] = useState(true)

    useEffect(() => {
        Axios.get('/api/auth/info').then(res => {
            setZipcode(res.data.zipcode)

            handleDadJoke()
            handleWeather()
        })

    }, [])

    const handleDadJoke = async () => {
        await Axios.get('/api/jokes/random')
            .then(res => {
                setDadJoke({ ...dadJoke, joke: res.data })
            })
    }
    const handleSave = (e) => {
        const { joke } = dadJoke
        Axios.post('/api/jokes', { joke }).then(res => {
            setDadJoke({ ...dadJoke, saved: true })
        })
    }
    const handleWeather = async () => {
        await Axios.get('/api/weather/current')
            .then(res => {
                setWeather(res.data)
                // setLoading(false)
            })

    }

    const kelvin = weather.temperature
    const toFahrenheit = (k) => Math.floor((k - 273.15) * 9 / 5 + 32)
    const toCelsius = (k) => Math.floor(k - 274.15)
    return (

        < div>
            <div className='dashboard'>
                <div className='widget'>
                    <div className='dad-joke'>
                        <h2>Have a joke on us!</h2>
                        <p>{dadJoke.joke}</p>
                        {dadJoke.saved ?
                            <div><button onClick={() => handleDadJoke()}>Another One!</button></div>
                            :
                            <div>
                                <div>
                                    <button onClick={() => handleDadJoke()}>New Joke!</button>
                                    <button onClick={() => handleSave()}>Save Joke!</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className='widget'>
                    {!zipcode ?
                        <div>Please save your zipcode in settings to view your current weather.</div>
                        :
                        <div className='weather'>

                            <h2>{weather.name}</h2>
                            <h3>{weather.condition}</h3>
                            <div className='weather-icon'>
                                <img src={weather.icon} />
                            </div>
                            {fahrenheit ? <div className='temp'>{toFahrenheit(kelvin)}°</div> : <div className='temp'>{toCelsius(kelvin)}°</div>}
                            <div className='scale-btn'>
                                <div className={!fahrenheit ? 'selected' : 'unselected'} onClick={() => setFahrenheit(false)}>°C </div>
                                    /
                                <div className={fahrenheit ? 'selected' : 'unselected'} onClick={() => setFahrenheit(true)}>°F </div>
                            </div>
                        </div>}
                </div>
            </div>
        </div >
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Dashboard)