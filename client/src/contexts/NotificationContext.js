import { createContext, useCallback, useState, useContext } from 'react';

export const NotificationContext = createContext();

export const typesColor = {
    error: 'red',
    warning: 'warning',
    info: 'info',
    success: 'error',
}
export const NotificationProvider = ({
    children
}) => {
    const [notification, setNotification] = useState({ show: false, message: '', typeColor: typesColor.error });
    const addNotification = useCallback((message, typeColor = typesColor.error) => {
        setNotification({ show: true, message: message, typeColor });
    }, []);
    return (
        <NotificationContext.Provider value={{ notification }}>
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotificationContext = () => {
    const state = useContext(NotificationContext)
    return state
}