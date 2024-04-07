import {useState} from 'react';
import {useAuthContext} from './useAuthContext';
import axios from 'axios'; // import axios


export const useSignup = ()=>{
    
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(null);
    const {dispatch} = useAuthContext();

    axios.defaults.withCredentials = true;

    const signup = async (email, password)=>{
        setLoading(true);
        setError(null);
        try{
           const response = await axios.post('https://workout-site-backend.vercel.app/api/user/signup', {email, password});
            const json = await response.json();

            if(response.status !== 200){
                setLoading(false);
                setError(json.error);
            }
            if(response.status === 200){
                localStorage.setItem('user', JSON.stringify(json))

                dispatch({
                    type: 'LOGIN',
                })}
            } catch(error){
                setLoading(false);
                setError(error.message);
            }
        
    }
    return {signup, error, isLoading}
}