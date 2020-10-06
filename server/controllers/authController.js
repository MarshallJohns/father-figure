const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const { firstName, lastName, email, password, confirm, zipcode, profile_picture } = req.body

        const [existingUser] = await db.get_user_by_email([email])
        if (existingUser) {
            return res.status(409).send('Email already in use')
        }
        if (password !== confirm) {
            return res.status(409).send('Passwords do not match')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const [newUser] = await db.register_user([firstName, lastName, email, hash])
        delete newUser.hash
        const [userInfo] = await db.create_user_info([profile_picture, zipcode, newUser.id])

        req.session.user = { user: newUser, userInfo: userInfo }
        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const { email, password } = req.body

        const [existingUser] = await db.get_user_by_email([email])
        if (!existingUser) {
            return res.status(404).send('User with that email does not exist')
        }

        const isAuthenticated = bcrypt.compareSync(password, existingUser.hash)
        if (!isAuthenticated) {
            return res.status(409).send('Email or Password incorrect')
        }

        delete existingUser.hash

        const [userInfo] = await db.get_user_info([existingUser.id])

        req.session.user = { user: existingUser, userInfo: userInfo }
        res.status(200).send(req.session.user)

    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: (req, res) => {
        if (!req.session.user) {
            return res.status(404).send('Please login')
        }

        res.status(200).send(req.session.user)
    },
    getUserInfo: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.session.user.user

        const [info] = await db.get_user_info([id])
        res.status(200).send(info)
    },
    editInfo: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.session.user.user
        const { zipcode, profile_picture } = req.body

        await db.update_user_info([id, profile_picture, zipcode])
        res.sendStatus(200)
    }
}