import { createContext, useReducer } from 'react'

export const GoalContext = createContext()

export const goalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GOALS': 
      return {
        goals: action.payload
      }
    case 'CREATE_GOAL':
      return {
        goals: [action.payload, ...state.goals]
      }
    case 'DELETE_GOAL':
      return {
        goals: state.goals.filter((g) => g._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const GoalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(goalReducer, {
    goals: null
  })

  return (
    <GoalContext.Provider value={{...state, dispatch}}>
      { children }
    </GoalContext.Provider>
  )
}