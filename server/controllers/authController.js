const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const { firstName, lastName, email, password } = req.body

        const [existingUser] = await db.get_user_by_email([email])
        if (existingUser) {
            return res.status(409).send('Email already in use')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const [newUser] = await db.register_user([firstName, lastName, email, hash])
        req.session.user = newUser
        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const { email, password } = req.body

        const [existingUser] = await db.get_user_by_email([email])
        if (!existingUser) {
            return res.status(404).send('User doesnt exist')
        }

        const isAuthenticated = bcrypt.compareSync(password, existingUser.hash)
        if (!isAuthenticated) {
            return res.status(409).send('Email or Password incorrect')
        }

        delete existingUser.hash

        req.session.user = existingUser
        res.status(200).send(req.session.user)

    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: (req, res) => { }
}