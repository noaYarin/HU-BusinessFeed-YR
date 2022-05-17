const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    port = process.env.PORT || 3000,
    host = process.env.HOST || 'localhost',
    dbHost = process.env.DBHOST
// app.get("/", (req, res) => {
//   return res.json({ hello: "world" })
// })

mongoose
    .connect(`${dbHost}businessFeed`)
    .then(() => {
        app.listen(port, () => {
            console.info(`start server start listening on port ${host}:${port}`)
        })
    })
    .catch(err => console.error(err))
