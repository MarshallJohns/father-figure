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
        main: {},
        weather: {}
    })
    const [loading, setLoading] = useState(true)
    const [fahrenheit, setFahrenheit] = useState(true)

    useEffect(() => {
        handleWeather()
        handleDadJoke()
    }, [])

    const handleDadJoke = async () => {
        await Axios.get('https://icanhazdadjoke.com/', { headers: { "User-Agent": "My Library (https://github.com/MarshallJohns/father-figure)", "Accept": "application/json" } })
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
    const handleWeather = async () => {
        const apiKey = '1c4df6046da516c6860ef3c69f5acf67'
        if (props.zipcode) {
            await Axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${props.zipcode},&appid=${apiKey}`)
                .then(res => {
                    setWeather(res.data)
                    setLoading(false)
                })
        }
    }

    const kelvin = weather.main.temp
    const toFahrenheit = (k) => Math.floor((k - 273.15) * 9 / 5 + 32)
    const toCelsius = (k) => Math.floor(k - 274.15)
    return (

        < div>
            {!loading ? <div className='dashboard'>
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
                    {!props.zipcode ?
                        <div>Please save your zipcode in settings to view your current weather.</div>
                        :
                        <div className='weather'>

                            <h2>{weather.name}</h2>
                            <h3>{weather.weather[0].description}</h3>
                            <div className='weather-icon'>
                                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} />
                            </div>
                            {fahrenheit ? <div className='temp'>{toFahrenheit(kelvin)}°</div> : <div className='temp'>{toCelsius(kelvin)}°</div>}
                            <div className='scale-btn'>
                                <div className={!fahrenheit ? 'selected' : 'unselected'} onClick={() => setFahrenheit(false)}>°C </div>
                                    /
                                <div className={fahrenheit ? 'selected' : 'unselected'} onClick={() => setFahrenheit(true)}>°F </div>
                            </div>
                        </div>}
                </div>
            </div> : <div>loading</div>}
        </div >
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Dashboard)