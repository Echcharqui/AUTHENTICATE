/// ////////////////////////////////////// profile route //////////////////////////////////////////////////////
require('dotenv').config()
const router = require('express').Router()

/// /////////////// midlewares /////////////////////////
const { isAuthenticatedAsSimpleUser } = require('../../middlewares')
/// ////////////////////////////////////////////////////

/// /////////////// DB models /////////////////////////
// const { Profile } = require('../../models')
/// ////////////////////////////////////////////////////

// log out route
router.get('/my_profile', isAuthenticatedAsSimpleUser, async (req, res) => {
  return res.status(200).json({ message: 'this is your profile !' })
})

module.exports = router
