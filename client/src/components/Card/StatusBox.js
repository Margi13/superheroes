import { alertMessages } from '../../common/messagesConstantsBG';

const StatusBox = ({
    status
}) => {
    const statusColor = status === 1 ? 'green' : status === 0 ? 'orange' : 'red';
    return (
        <div className={"status " + statusColor}>
            {status === 1
                ? <span>{alertMessages.Approved}</span>
                : status === 0
                    ? <span>{alertMessages.Pending}</span>
                    : <span>{alertMessages.Declined}</span>
            }
        </div>
    )
}

export default StatusBox;