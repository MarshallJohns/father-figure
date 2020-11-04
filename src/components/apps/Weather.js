import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

function Weather(props) {
    const [weather, setWeather] = useState({

    })
    const [searchWeather, setSearchWeather] = useState({
        main: {},
        weather: {}
    })
    const [search, setSearch] = useState(false)
    const [loading, setLoading] = useState(true)
    const [fahrenheit, setFahrenheit] = useState(true)
    const [myWeather, setMyWeather] = useState(false)
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const apiKey = '1c4df6046da516c6860ef3c69f5acf67'

    useEffect(() => {

        axios.get(`/api/weather/current`).then(res => {
            setWeather(res.data)
            setLoading(false)
        })

    }, [])

    const handleSearchWeather = async () => {
        setLoading(true)
        await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city.toLocaleLowerCase()},${state.toLocaleLowerCase()},us&appid=${apiKey}`)
            .then(res => {
                setSearchWeather(res.data)
                setCity('')
                setState('')
                setSearch(true)
                setLoading(false)
            }).catch(err => console.log(err))
    }


    const kelvin = weather.temperature
    const searchKelvin = searchWeather.main.temp
    const toFahrenheit = (k) => Math.floor((k - 273.15) * 9 / 5 + 32)
    const toCelsius = (k) => Math.floor(k - 274.15)
    return (
        <div>
            {!loading ? <div className='weather-app'>
                {!myWeather ?
                    <div className='weather-container'>
                        <div className='search-input'>
                            <input value={city} onChange={(e) => setCity(e.target.value)} placeholder='exp... Salt Lake City' />
                            <input value={state} onChange={(e) => setState(e.target.value)} placeholder='exp... UT' />
                        </div>
                        <button onClick={() => handleSearchWeather()}>Search</button>
                        {search ?
                            <div className='weather'>

                                <h2>{searchWeather.name}</h2>
                                <h3>{searchWeather.weather[0].description}</h3>
                                <div className='weather-icon'>
                                    <img src={`http://openweathermap.org/img/wn/${searchWeather.weather[0].icon}@4x.png`} />
                                </div>
                                {fahrenheit ? <div className='temp'>{toFahrenheit(searchKelvin)}°</div> : <div className='temp'>{toCelsius(searchKelvin)}°</div>}
                                <div className='scale-btn'>
                                    <div className={!fahrenheit ? 'selected' : 'unselected'} onClick={() => setFahrenheit(false)}>°C </div>
                                    /
                                <div className={fahrenheit ? 'selected' : 'unselected'} onClick={() => setFahrenheit(true)}>°F </div>
                                </div>
                            </div>
                            :
                            null}
                        <button onClick={() => setMyWeather(true)}>My Weather</button>
                    </div>
                    :
                    <div>{props.zipcode ?
                        <div className='weather-container'>
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
                            </div>
                            <button onClick={() => setMyWeather(false)}>Search for other weather</button>
                        </div>
                        :
                        <div>please fill out zipcode</div>}
                    </div>
                }
            </div> : <div>loading</div>}
        </div>
    )
}
const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(Weather)