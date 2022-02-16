require('dotenv').config()
require('colors')
const express = require('express')
const morgan = require("morgan")
const path = require('path')
const cors = require('cors')

//////////         importing routes           ////////////
const { AuthRoute } = require('./src/routes')
//////////////////////////////////////////////////////////


////////// importing the DB connection module ////////////
const { DBConnection } = require('./src/database/connect')
//////////////////////////////////////////////////////////

//////////        connection to the DB        ////////////
DBConnection()
//////////////////////////////////////////////////////////



//////////         cros-origin config         ////////////
let whitelist = [`${process.env.CLIENT_URL}`]
let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT']
}
//////////////////////////////////////////////////////////

///// init the server
const app = express()
/////////////////////

/////////         initial midleware           ////////////
app.use(morgan("dev"))
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/static', express.static(path.join(__dirname, '/public')))
////////////////////////////////////////////////////////////


/////////                routing            //////////////
app.use('/api/auth/', AuthRoute)
//////////////////////////////////////////////////////////


const port = process.env.PORT

app.use((req, res, next) => {
    const error = new Error("not found")
    error.status(404)
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json(error)
})

app.listen(port, "0.0.0.0", () => {
    console.log(`\t-API start and runing on port ${port} : ☑️`.cyan.bold)
});
