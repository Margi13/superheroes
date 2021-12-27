import { createContext, useCallback, useState, useContext } from 'react';

export const NotificationContext = createContext();

export const typesColor = {
    error: 'danger',
    warning: 'warning',
    info: 'info',
    success: 'success',
}
const initialState = { show: false, message: '', typeColor: typesColor.error }
export const NotificationProvider = ({
    children
}) => {
    const [notification, setNotification] = useState(initialState);
    const addNotification = useCallback((message, typeColor = typesColor.error) => {
        setNotification({ show: true, message: message, typeColor });
    }, []);
    const hideNotification = useCallback(() => {
        setTimeout(() => {
            setNotification(initialState);
        }, 5000);
    }, [])
    return (
        <NotificationContext.Provider value={{ notification, addNotification, hideNotification }}>
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotificationContext = () => {
    const state = useContext(NotificationContext)
    return state
}