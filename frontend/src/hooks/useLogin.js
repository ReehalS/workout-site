import {useState} from 'react';
import {useAuthContext} from './useAuthContext';
import axios from 'axios'; 

export const useLogin = ()=>{

    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(null);
    const {dispatch} = useAuthContext();


    const login = async (email, password)=>{
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('https://workout-site-backend.vercel.app/api/user/login', {email, password});
            const json = response.data;

            if(response.status !== 200){
                setLoading(false);
                setError(json.error);
            }
            if(response.status === 200){
                localStorage.setItem('user', JSON.stringify(json))

                dispatch({
                    type: 'LOGIN'
                })
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    }
    return {login, error, isLoading}
}