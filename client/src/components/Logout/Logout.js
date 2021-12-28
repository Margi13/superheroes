import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService'
import { useAuthContext } from '../../contexts/AuthContext';
import { typesColor, useNotificationContext } from '../../contexts/NotificationContext';
import {alertMessages} from '../../common/messagesConstantsBG'

const Logout = () => {
    const navigate = useNavigate();
    const {user, logout} = useAuthContext();
    const {addNotification} = useNotificationContext();
    useEffect(()=>{

        authService.logout(user.accessToken)
        .then(()=>{
            logout()
            addNotification(alertMessages.LogoutSuccess, typesColor.success)

            navigate('/');
        })
        .catch(error=>{
            addNotification(alertMessages.LogoutDenied, typesColor.error)
            console.log(error);
        });
        
    },[user.accessToken, logout, navigate])
    //TODO: Modal box with info that is loading
    return null;
}

export default Logout;