import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import axios from 'axios'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  axios.defaults.withCredentials = true;

  const handleClick = async () => {
    if (!user) {
      return
    }

    try {
      const response = await axios.delete('/api/workouts/' + workout._id, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = response.data

      if (response.status === 200) {
        dispatch({type: 'DELETE_WORKOUT', payload: json})
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails