const express = require('express')
const {
    getGoals,
    getGoal,
    createGoal,
    deleteGoal,
    updateGoal
} = require('../controllers/goalController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET all goals
router.get('/', getGoals)

// GET a single goal
router.get('/:id', getGoal)

router.post('/', createGoal)

router.delete('/:id', deleteGoal)

router.patch('/:id', updateGoal)

module.exports = router