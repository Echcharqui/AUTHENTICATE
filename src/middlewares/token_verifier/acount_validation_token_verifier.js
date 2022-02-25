require('dotenv').config()
const JWT = require('jsonwebtoken')
const { BlackListToken } = require('../../models')

const isTheAcountValidationTokenValid = (req, res, next) => {
    // extract the token from the header authorization field
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    // if the token dont exist send back a response with status 400
    if (!token) {
        return res.status(400).json({ message: 'An acount validation token is required in the process on this request !' })
    }

    JWT.verify(token, process.env.JWT_SECRET_ACOUNT_VAVALIDATION, async (error, user) => {
        // if the token is expired or invalid send back a response with status 401
        if (error) {
            return res.status(401).json({ message: 'The acount validation token is invalid or expired !', error })
        }

        // if the token is black listed send back a response with status 401
        const tokentBLackListed = await BlackListToken.findOne({ token: token })
        if (tokentBLackListed) {
            return res.status(401).json({ message: 'The acount validation token is invalid or expired !', error })
        }

        // if the token is not a validation acount token send back a response with status 401
        if (user.for !== "acount validation") {
            return res.status(401).json({ message: 'The acount validation token is invalid or expired !', error })
        }

        req.user = { ...user }

        next()
    })
}

module.exports = { isTheAcountValidationTokenValid }
