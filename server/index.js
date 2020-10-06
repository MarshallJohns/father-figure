require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const app = express()
const authCtrl = require('./controllers/authController')
const userCtrl = require('./controllers/userController')

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookies: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}))

//* Auth end points
app.post('/api/auth/register', authCtrl.register)
app.post('/api/auth/login', authCtrl.login)
app.delete('/api/auth/logout', authCtrl.logout)
app.get('/api/auth/user', authCtrl.getUser)
app.get('/api/auth/info', authCtrl.getUserInfo)
app.put('/api/auth/edit', authCtrl.editInfo)

//* User endpoints
app.post('/api/jokes', userCtrl.saveJoke)
app.get('/api/jokes', userCtrl.getJokes)
// app.get('/api/weather/current', userCtrl.getCurrentWeather)


massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false,
    },
}).then((dbInstance) => {
    app.set("db", dbInstance);
    console.log("DB READY");
    app.listen(SERVER_PORT, () =>
        console.log(`Listening on port ${SERVER_PORT}`)
    );
});