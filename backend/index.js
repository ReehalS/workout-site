require('dotenv').config()

const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const app = express()
app.use(express.json())
app.use(cors())

// const allowedOrigins = ['http://localhost:3000'];
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('The CORS policy for this site does not allow access from the specified origin.'), false);
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE']
// }));


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

// app.get('/', (req, res) => {
//   res.send("API for workout tracker app.")
// })