require('dotenv').config()

const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts.js')
const userRoutes = require('./routes/user.js')
const goalRoutes = require('./routes/goals.js')

const app = express()
app.use(express.json())
//app.use(cors())

//use for deployment
const allowedOrigins = ['http://localhost:3000', 'https://workoutbuddy-sr.vercel.app'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.some(allowedOrigin => origin.startsWith(allowedOrigin))) {
      callback(null, true);
    } else {
      callback(new Error('The CORS policy for this site does not allow access from the specified origin.'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));



app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
app.use('/api/goal', goalRoutes)


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
  res.send("API for workout tracker app.")
})

module.exports = app