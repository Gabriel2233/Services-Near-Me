const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const servicesRoutes = require('./Routes/services')
const PORT = 3333

require('dotenv/config')

//Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use('/services', servicesRoutes)

//Connect to DB

mongoose.connect(process.env.DATABASE_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('Connected'))

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))