import { useEffect } from "react"
import GoalDetails from "../components/GoalDetails"
import GoalForm from "../components/GoalForm"
import {useGoalContext} from '../hooks/useGoalContext'
import {useAuthContext} from '../hooks/useAuthContext'


const Goal = () => {
    const {goals, dispatch} = useGoalContext();
    const {user} = useAuthContext()
  
    useEffect(() => {
      const fetchGoal = async () => {
        if(!user) {
          return
        }
  
        const response = await fetch('https://workout-site-backend.vercel.app/api/goal', {
          headers:{
            'Authorization': `Bearer ${user.token}`
        }
      })
        const json = await response.json()
  
        if (response.ok) {
          dispatch({type: 'SET_GOALS', payload: json})
        }
      }
  
      fetchGoal()
    }, [dispatch, user])

    if(!goals || !Array.isArray(goals)){
      return <div><p>Loading...</p></div>
    }

  return (
    <div className="home">
      <div className="workouts">
        {Array.isArray(goals) ? (
          goals.map(goal => (
            <GoalDetails goal={goal} key={goal._id} />
          ))
        ) : (
          <p>Goal data unavailable</p>
        )}
        
      </div>
      <GoalForm  className="form"/>  
    </div>
  );
}

export default Goal