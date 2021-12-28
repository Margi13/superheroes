import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService'
import { useAuthContext } from '../../contexts/AuthContext';
const Logout = () => {
    const navigate = useNavigate();
    const {user, logout} = useAuthContext();
    useEffect(()=>{

        authService.logout(user.accessToken)
        .then(()=>{
            logout()
            navigate('/');
        })
        .catch(error=>{
            console.log(error);
        });
        
    },[user.accessToken, logout, navigate])
    //TODO: Modal box with info that is loading
    return null;
}

export default Logout;