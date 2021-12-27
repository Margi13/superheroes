import { useEffect } from 'react';
import { useNotificationContext } from '../../../contexts/NotificationContext';
import './Notification.css';
const Notification = () => {
    const { notification, hideNotification } = useNotificationContext();

    useEffect(()=>{
        hideNotification();
    })
    if (!notification.show) {
        return null;
    }
    return (
        <div className={`notification ${notification.typeColor}`}>
            <h1>Notification box</h1>
            <p>{notification.message}</p>
        </div>
    );
}

export default Notification;