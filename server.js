require('dotenv').config()
const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    port = process.env.PORT || 3000,
    host = process.env.HOST || 'localhost',
    dbHost = process.env.DBHOST,
    userRouter = require('./routes/userRouter')

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use('/user', userRouter)
mongoose
    .connect(`${dbHost}/businessFeed`)
    .then(() => {
        app.listen(port, () => {
            console.info(`start server start listening on port ${host}:${port}`)
        })
    })
    .catch(err => console.error(err))
