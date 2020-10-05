const axios = require('axios')
require('dotenv').config()
const { WEATHER_API_KEY } = process.env

module.exports = {
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
    }

}