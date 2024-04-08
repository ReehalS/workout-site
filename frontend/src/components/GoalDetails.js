import { useGoalContext } from '../hooks/useGoalContext'
import { useAuthContext } from '../hooks/useAuthContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const GoalDetails = ({ goal }) => {
  const { dispatch } = useGoalContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('https://workout-site-backend.vercel.app/api/goal/' + goal._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_GOAL', payload: json})
    }
  }
  //title, description, timeLimit, numWorkouts, repeating
  return (
    <div className="goal-details">
      <h4>{goal.title}</h4>
      <p>{goal.description}</p>
      <p><strong>Time Limit (days) : </strong>{goal.timeLimit}</p>
      <p><strong>Number of Workouts : </strong>{goal.numWorkouts}</p>
      <p><strong>Repeats? : </strong>{goal.repeating.toString()===true ? 'Yes' : 'No'}</p>
      <p>{formatDistanceToNow(new Date(goal.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default GoalDetails