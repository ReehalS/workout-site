const Goal = require('../models/goalModel')
const mongoose = require('mongoose')

// get all goals
const getGoals = async (req, res) => {
  const user_id = req.user._id

  const goals = await Goal.find({user_id}).sort({createdAt: -1})
    
  res.status(200).json(goals)
}

// get a single goal
const getGoal = async (req, res) => {
  const { id } = req.params
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such goal'})
  }

  const goals = await Goal.findById(id)

  if (!GeolocationPosition) {
    return res.status(404).json({error: 'No such goal'})
  }

  res.status(200).json(goals)
}

const createGoal = async (req, res) => {
  const {title, description, timeLimit, numWorkouts, repeating } = req.body

  let emptyFields = []

  if(!title){
    emptyFields.push('Goal Title')
  }
  if(!timeLimit){
    emptyFields.push('Time Limit')
  }
  if(!numWorkouts){
    emptyFields.push('Number of Workouts')
  }
  if(repeating ===null){
    emptyFields.push('Repeating')
  }
  let timeLimitCheck = false
  if(timeLimit <=0 || timeLimit >=366){
    timeLimitCheck = true
  }
  let numWorkoutsCheck = false
  if(numWorkouts<=0){
    numWorkoutsCheck = true
  }

  if(emptyFields.length > 0){
    return res.status(400).json({error: `Please provide a value for the following fields: `, emptyFields, timeLimitCheck, numWorkoutsCheck})
  }

  try {
    const user_id = req.user._id
    const goals = await Goal.create({ title, description, timeLimit, numWorkouts, repeating, user_id })
    res.status(200).json(goals)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteGoal = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Goal'})
  }

  const goals = await Goal.findOneAndDelete({_id: id})

  if(!goals) {
    return res.status(400).json({error: 'No such goal'})
  }

  res.status(200).json(goals)
}

const updateGoal = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Goal'})
  }

  const goals = await Goal.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!goals) {
    return res.status(400).json({error: 'No such Goal'})
  }

  res.status(200).json(goals)
}


module.exports = {
  getGoals,
  getGoal,
  createGoal,
  deleteGoal,
  updateGoal
}