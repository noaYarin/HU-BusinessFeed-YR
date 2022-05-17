const express = require('express'),
    userRouter = express.Router(),
    chalk = require('chalk'),
    { signUp } = require('../controllers/userController')

userRouter.post('/signup', (req, res) => {
    let newUser = req.body
    signUp(newUser)
        .then(user => res.status(200).json(user))
        .catch(err => {
            console.log(chalk.red(err))
            res.status(400).json(err)
        })
})
module.exports = userRouter
