module.exports = {
    saveJoke: async (req, res) => {
        db = req.app.get('db')
        const { id } = req.session.user
        const { joke } = req.body

        await db.save_joke([id, joke])

        res.sendStatus(200)
    },
    getJokes: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.session.user

        const jokes = await db.get_jokes([id])
        res.status(200).send(jokes)

    }

}