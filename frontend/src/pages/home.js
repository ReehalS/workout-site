import { useEffect } from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import {useAuthContext} from '../hooks/useAuthContext'


const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext();
    const {user} = useAuthContext()
  
    useEffect(() => {
      const fetchWorkouts = async () => {
        if(!user) {
          return
        }
  
        const response = await fetch('https://workout-site-backend.vercel.app/api/workouts', {
          headers:{
            'Authorization': `Bearer ${user.token}`
        }
      })
        const json = await response.json()
  
        if (response.ok) {
          dispatch({type: 'SET_WORKOUTS', payload: json})
        }
      }
  
      fetchWorkouts()
    }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
        {Array.isArray(workouts) ? (
          workouts.map(workout => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))
        ) : (
          <p>Workouts data unavailable</p>
        )}
      </div>
      <WorkoutForm className="form"/>
    </div>
  )
}

export default Home