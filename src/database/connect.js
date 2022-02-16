require('colors')
require('dotenv').config()
const mongoose = require('mongoose')

const DBConnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    console.log('\t-Connection to '.green.bold + `${connect.connection.db.databaseName.toUpperCase()}`.white.bold + ' DataBase was established successfully : ✅'.green.bold)
  } catch (error) {
    console.error(`Error: ${error.message}`.red)
    process.exit(1)
  }
}

module.exports = { DBConnection }
