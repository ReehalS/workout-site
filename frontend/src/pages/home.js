import { useEffect } from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import {useAuthContext} from '../hooks/useAuthContext'
import axios from 'axios';

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext();
  const {user} = useAuthContext()

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchWorkouts = async () => {
      if(!user) {
        return
      }

      try {
        const response = await axios.get('https://workout-site-backend.vercel.app/api/workouts', {
          headers:{
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = response.data

        if (response.status === 200) {
          dispatch({type: 'SET_WORKOUTS', payload: json})
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchWorkouts()
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home