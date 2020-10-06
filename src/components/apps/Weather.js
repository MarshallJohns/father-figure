import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

function Weather(props) {
    const [weather, setWeather] = useState([])

    useEffect(() => {
        const apiKey = '1c4df6046da516c6860ef3c69f5acf67'
        if (props.zipcode) {
            axios.get(`http://api.openweathermap.org/data/2.5/forecast?zip=${props.zipcode}&appid=${apiKey}`).then(res => {
                console.log(res.data)
            })
        }
    })

    return (
        <div>weather</div>
    )
}
const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(Weather)