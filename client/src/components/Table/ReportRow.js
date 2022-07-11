
import { Link } from 'react-router-dom';
import { useOneComicsState } from '../../hooks/useComicsState';
import * as reportService from '../../services/reportService';
import { typesColor, useNotificationContext } from '../../contexts/NotificationContext';
import { alertMessages } from '../../common/messagesConstantsBG';
import '../Reports/Reports.css';

const ReportRow = ({
    data,
    toReload
}) => {
    const [comics] = useOneComicsState(data._dataId);
    const { addNotification } = useNotificationContext();
    const ignoreReport = () => {
        reportService.ignoreReport(data._id)
            .then(result => {
                addNotification(alertMessages.DeleteReportSuccess, typesColor.success);
                toReload(true);
            })
            .catch(error => {
                addNotification(alertMessages.DeleteReportDenied, typesColor.error);
                console.log(error);
            });;
    }
    return (
        <tr>
            <td className="date-cell">{(new Date(data._createdOn)).toLocaleDateString('bg-BG')}</td>
            <td className="message-cell">{data.reportMessage}</td>
            <td className="link-cell"><Link to={`/details/comics/${comics._id}`}>{comics.title}</Link> </td>
            <td align="right">
                <button className="button-cell" onClick={ignoreReport}>X</button>
            </td>
        </tr>
    )
}
export default ReportRow;