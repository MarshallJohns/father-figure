import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

function Weather(props) {
    const [weather, setWeather] = useState({
        main: {},
        weather: {}
    })
    const [searchWeather, setSearchWeather] = useState({
        main: {},
        weather: {}
    })
    const [loading, setLoading] = useState(true)
    const [fahrenheit, setFahrenheit] = useState(true)
    const [myWeather, setMyWeather] = useState(false)
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const apiKey = '1c4df6046da516c6860ef3c69f5acf67'

    useEffect(() => {
        if (props.zipcode) {
            axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${props.zipcode}&appid=${apiKey}`).then(res => {
                setWeather(res.data)
                setLoading(false)
            })
        }
    }, [])

    const handleSearchWeather = async () => {
        await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${state},us&appid=${apiKey}`)
            .then(res => {
                console.log(res.data)
            }).catch(err => console.log(err))
    }


    const kelvin = weather.main.temp
    const toFahrenheit = (k) => Math.floor((k - 273.15) * 9 / 5 + 32)
    const toCelsius = (k) => Math.floor(k - 274.15)
    return (
        <div>
            {!loading ? <div className='weather-app'>
                {!myWeather ?
                    <div>
                        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder='exp... Salt Lake City' />
                        <input value={state} onChange={(e) => setState(e.target.value)} placeholder='exp... UT' />
                        <button onClick={() => handleSearchWeather()}>Search</button>
                        <button onClick={() => setMyWeather(true)}>my weather</button>
                    </div>
                    :
                    <div>{props.zipcode ?
                        <div className='weather'>
                            {fahrenheit ? <div>{toFahrenheit(kelvin)}</div> : <div>{toCelsius(kelvin)}</div>}
                            <div className='scale-btn'>
                                <div onClick={() => setFahrenheit(false)}>°C </div>
        /
        <div onClick={() => setFahrenheit(true)}>°F </div>
                            </div>
                        </div>
                        :
                        <div>please fill out zipcode</div>}
                        <button onClick={() => setMyWeather(false)}>Search for other weather</button>
                    </div>
                }
            </div> : <div>loading</div>}
        </div>
    )
}
const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(Weather)