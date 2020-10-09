import React, { useState, useEffect } from 'react'
import axios from 'axios'


function DadJokes(props) {
    const [favoriteJokes, setFavoriteJokes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('/api/jokes').then(res => {
            setFavoriteJokes(res.data)
            setLoading(false)
        }).catch(err => console.log(err.message))
    }, [])

    const mappedJokes = favoriteJokes.map((joke, index) => {
        return <p key={index} className='jokes'>{joke.joke_text}</p>
    })
    return (
        <div className='joke-app'>
            {!loading ? <div className='joke-box'>{mappedJokes}</div> : <div>loading</div>}
        </div>
    )
}

export default DadJokes