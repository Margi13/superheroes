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
            <h3>{notification.message}</h3>
        </div>
    );
}

export default Notification;