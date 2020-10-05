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
                    // setLoading(false)
                })
        }
    }

    const kelvin = weather.main.temp
    const toFahrenheit = (k) => Math.floor((k - 273.15) * 9 / 5 + 32)
    const toCelsius = (k) => Math.floor(k - 274.15)
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
                    <div className='weather'>
                        {fahrenheit ? <div>{toFahrenheit(kelvin)}</div> : <div>{toCelsius(kelvin)}</div>}
                        <div className='scale-btn'>
                            <div onClick={() => setFahrenheit(false)}>°C </div>
                            /
                            <div onClick={() => setFahrenheit(true)}>°F </div>
                        </div>
                    </div>}
            </div>
        </div >
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Dashboard)