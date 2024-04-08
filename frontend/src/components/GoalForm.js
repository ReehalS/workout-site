import React, { useState } from "react"
import { useGoalContext } from "../hooks/useGoalContext"
import { useAuthContext } from '../hooks/useAuthContext'

const GoalForm = () => {
  const { dispatch } = useGoalContext()
  const { user } = useAuthContext()

    //title, description, timeLimit, numWorkouts, repeating
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [timeLimit, setTimeLimit] = useState(0)
  const [numWorkouts, setNumWorkouts] = useState(0)
  const [repeating, setRepeating] = useState(false)
  const [checkBox, setCheckbox] = useState(false)
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const [timeLimitCheck, setTimeLimitCheck] = useState(false)
  const [numWorkoutsCheck, setNumWorkoutsCheck] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    if(checkBox=="on"){
      setRepeating(true)
    } else{
      setRepeating(false)
    }

    const goal = {title, description, timeLimit, numWorkouts, repeating}

    const response = await fetch('https://workout-site-backend.vercel.app/api/goal', {
      method: 'POST',
      body: JSON.stringify(goal),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
      setTimeLimitCheck(json.timeLimitCheck)
      setNumWorkoutsCheck(json.numWorkoutsCheck)
    }
    if (response.ok) {
      setTitle('')
      setDescription('')
      setTimeLimit(0)
      setNumWorkouts(0)
      setRepeating(false)
      setCheckbox(false)  
      setError(null)
      setEmptyFields([])
      setTimeLimit(false)
      setNumWorkoutsCheck(false)
      dispatch({type: 'CREATE_GOAL', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Goal</h3>

      <label>Goal Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('Goal Title') ? 'error' : ''}
      />

      <label>Description:</label>
      <input 
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <label>Time Limit (in Days): </label>
      <input
        type="number"
        onChange={(e)=> setTimeLimit(e.target.value)}
        value={timeLimit}
        className={timeLimitCheck ? 'error': ''}
      />
      <label>Number of Workouts: </label>
      <input
        type="number"
        onChange={(e)=>setNumWorkouts(e.target.value)}
        value={numWorkouts}
        className={(emptyFields.includes('Number of Workouts' ) || numWorkoutsCheck) ? 'error':''}
          />

      <div className="checkbox-container">
        <label>Repeats?</label>
        <input 
          type="checkbox" 
          checked={checkBox}
          onChange={(e) => setCheckbox(e.target.checked)} 
          className={emptyFields.includes('Repeating') ? 'error' : ''}
        />
      </div>



      <button>Add Goal</button>
      {error && (
        <div className="error">
          <ul>
          <li>{error}
            {emptyFields.map((field, index) => (
              <React.Fragment key={field}>
                {field} 
                {index !== emptyFields.length - 1 && ', '}
              </React.Fragment>
            ))}. </li>
            <li>{timeLimitCheck && (<p>Time limit must be greater than 0 days and less than 366 days.</p>)}</li>
            <li>{numWorkoutsCheck && (<p>Number of Workouts must be greater than 0.</p>)}</li>
          </ul>
          </div>
        )}
    </form>
  )
}

export default GoalForm