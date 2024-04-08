import { GoalContext } from '../context/GoalContext.js'
import { useContext } from 'react'

export const useGoalContext = () => {
  const context = useContext(GoalContext)

  if (!context) {
    throw Error('useGoalContext must be used inside an GoalContextProvider')
  }
  return context
}