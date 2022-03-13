require('dotenv').config()
require('colors')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')

/// ///////         importing routes           ////////////
const {
  AuthRoute,
  SecurityRoute,
  ProfileRoute
} = require('./routes')
/// ///////////////////////////////////////////////////////

/// /////// importing the DB connection module ////////////
const { DBConnection } = require('./database/connect')
/// ///////////////////////////////////////////////////////

/// ///////        connection to the DB        ////////////
DBConnection()
/// ///////////////////////////////////////////////////////

/// ///////         cros-origin config         ////////////
const whitelist = [`${process.env.CLIENT_URL}`]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT']
}
/// ///////////////////////////////////////////////////////

/// // init the server
const app = express()
/// //////////////////

/// //////         initial midleware           ////////////
app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/static', express.static(path.join(__dirname, '/public')))
/// /////////////////////////////////////////////////////////

/// //////                routing            //////////////
app.use('/api/auth/', AuthRoute)
app.use('/api/security', SecurityRoute)
app.use('/api/Profile/', ProfileRoute)
/// ///////////////////////////////////////////////////////

const port = process.env.PORT

/// /////           error handling            /////////////
app.use((req, res, next) => {
  const error = new Error('not found')
  error.status(404)
  next(error)
})
app.use((error, req, res, next) => {
  return res.status(error.status || 500).json({ error: error })
})
/// ///////////////////////////////////////////////////////

/// ///////////// server running  /////////////////////////
app.listen(port || 8080, '0.0.0.0', () => {
  console.log(`\t-API start and runing on port ${port || 8080} : ☑️`.cyan.bold)
})
/// ///////////////////////////////////////////////////////
