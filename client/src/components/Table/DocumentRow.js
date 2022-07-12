
import { Link } from 'react-router-dom';
import { typesColor, useNotificationContext } from '../../contexts/NotificationContext';
import { alertMessages } from '../../common/messagesConstantsBG';
import '../Reports/Reports.css';
import { useOneComicsState } from '../../hooks/useComicsState';
import { useOneHeroState } from '../../hooks/useHeroState';
import { useDownloadDocumentState } from '../../hooks/useDocumentState';

const DocumentRow = ({
    data
}) => {
    const [comics] = useOneComicsState(data.dataId);
    const [hero] = useOneHeroState(data.dataId);
    const [documentUrl] = useDownloadDocumentState(data._id)

    const { addNotification } = useNotificationContext();
    const downloadDocument = () => {
        if (documentUrl) {
            window.location = documentUrl
        } else {
            addNotification(alertMessages.DownloadDocumentDenied, typesColor.error);
        }
    }
    return (
        <tr>
            <td className="date-cell">{(new Date(data._createdOn)).toLocaleDateString('bg-BG')}</td>
            <td className="date-cell">{data._updatedOn ? (new Date(data._updatedOn)).toLocaleDateString('bg-BG') : 'Не е публикуван'}</td>
            <td className="data-cell">Документ за авторство</td>
            <td className="data-cell">{data.dataType === 'comics' ? 'Комикс' : 'Герой'}</td>
            {
                data.dataType === 'comcis'
                    ? <td className="link-cell"><Link to={`/details/comics/${comics._id}`}>{comics.title}</Link> </td>
                    : <td className="link-cell"><Link to={`/details/heroes/${hero._id}`}>{hero.heroName}</Link> </td>
            }

            <td align="right">
                <button onClick={downloadDocument} className="button-cell" download><i className="fa fa-solid fa-download"></i></button>
            </td>
        </tr>
    )
}
export default DocumentRow;