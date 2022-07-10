import { createContext } from 'react';
import { useContext } from 'react/cjs/react.development';
import useLocalStorage from '../hooks/useLocalStorage';

export const AuthContext = createContext();

const initialAuthState = {
    _id: '',
    email: '',
    accessToken: ''
}
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', initialAuthState)
    const login = (authData) => {
        setUser({ _id: authData._id, email: authData.email, accessToken: authData.accessToken });
    }

    const logout = () => {
        setUser(initialAuthState)
    }
    const isAuth = user?.accessToken ? true : false;
    
    const isAdmin = user?.email === 'admin@abv.bg' ? true : false;

    const isGuest = user?.accessToken ? true : false;
    return (
        <AuthContext.Provider value={{ user, login, logout, isAuth, isGuest, isAdmin }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuthContext = () => {
    const authState = useContext(AuthContext);

    return authState;
}