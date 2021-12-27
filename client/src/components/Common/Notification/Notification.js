import {useNotificationContext} from '../../../contexts/NotificationContext';
import './Notification.css';
const Notification = () => {
    const {notification} = useNotificationContext();
    if(!notification.show){
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