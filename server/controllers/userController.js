const axios = require('axios')
require('dotenv').config()
const { WEATHER_API_KEY } = process.env

module.exports = {
    randomJoke: async (req, res) => {
        data = ''
        await axios.get('https://icanhazdadjoke.com/', { headers: { "User-Agent": "My Library (https://github.com/MarshallJohns/father-figure)", "Accept": "application/json" } })
            .then(res => {
                data = res.data.joke
            })
        res.status(200).send(data)
    },
    saveJoke: async (req, res) => {
        db = req.app.get('db')
        const { id } = req.session.user.user
        const { joke } = req.body

        await db.save_joke([id, joke])
        res.sendStatus(200)
    },
    getJokes: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.session.user.user

        const jokes = await db.get_jokes([id])
        res.status(200).send(jokes)
    },
    getCurrentWeather: async (req, res) => {
        const { zipcode } = req.session.user.userInfo
        let data = {}
        await axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},&appid=${WEATHER_API_KEY}`).then(res => {
            const { weather, main, name } = res.data
            data = {
                name: name,
                condition: weather[0].description,
                temperature: main.temp,
                icon: `http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`,

            }
        }).catch(err => {
            res.status(200).send('Oops')
        })
        res.status(200).send(data)
    }

}