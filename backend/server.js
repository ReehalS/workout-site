require('dotenv').config()

const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const app = express()

let corsOptions = { 
  origin : ['http://localhost:3000', 'https://workoutbuddy-sr.vercel.app'] 
} 
app.use(cors(corsOptions))


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 

app.get('/', (req, res) => {
  res.json("API for workout tracker app.")
})