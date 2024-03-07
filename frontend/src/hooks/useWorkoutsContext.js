import {workoutContext} from '../context/workoutContext';
import {useContext} from 'react';

export const useWorkoutsContext = ()=>{
    const context =  useContext(workoutContext);

    if(!context){
        throw new Error('useWorkoutsContext must be used within a WorkoutsContextProvider');
    }

    return context;
}