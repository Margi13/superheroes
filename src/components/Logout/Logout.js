import {useContext, useEffect} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService'
import { AuthContext } from '../../contexts/AuthContext';
const Logout = () => {
    const navigate = useNavigate();
    const {user, logout} = useContext(AuthContext);
    useEffect(()=>{

        authService.logout(user.accessToken)
        .then(()=>{
            logout()
            navigate('/');
        });
        
    },[])
    //TODO: Modal box with info that is loading
    return null;
}

export default Logout;