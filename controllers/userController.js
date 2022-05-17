const User = require('../models/user')

let signUp = newUser => {
    return new Promise((resolve, reject) => {
        let user = new User(newUser)
        let { error } = user.validateUserFields(user._doc)
        if (error) {
            let err = error.details[0].message
            reject(err)
        } else {
            user.password = user.hashUserPassword(user.password)
            user.save()
                .then(user => resolve(user))
                .catch(err => {
                    err = err.keyPattern
                        ? 'Email already exists'
                        : 'DB error. Try again later'
                    reject(err)
                })
        }
    })
}

module.exports = {
    signUp,
}
