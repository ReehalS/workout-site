const mongoose = require('mongoose')

const Schema = mongoose.Schema

const goalSchema = new Schema({
  title: {
    type:String,
    required: true
  },
  description:{
    type: String,
    required: false
  },
  timeLimit: {
    type: Number,
    required: true
  },
  numWorkouts:{
    type: Number,
    required: true,
  },
  repeating: {
    type: Boolean,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Goal', goalSchema)