require('dotenv').config()
const router = require('express').Router()

// sign in route
router.get('/signIn', async (req, res) => {
  return res.status(200).json({ message: 'welcom to the sign in !' })
})

// sign up route
router.get('/signUp', async (req, res) => {
  return res.status(200).json({ message: 'welcom to the sign up !' })
})

// forgetPassword route
router.get('/forgetPassword', async (req, res) => {
  return res.status(200).json({ message: 'welcom to the forgetPassword !' })
})

// log out route
router.get('/logOut', async (req, res) => {
  return res.status(200).json({ message: 'welcom to the log out !' })
})

module.exports = router
