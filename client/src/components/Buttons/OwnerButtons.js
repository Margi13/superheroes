
import { buttonLabelsBG } from '../../common/labelsConstatnsBG';
import { Link } from 'react-router-dom';

const OwnerButtons = ({
    id,
    onDelete,
    urlFor
}) => {
    // Maybe add here logic for onDelete
    return (
        <div className="buttons">
            <Link to={`/edit/${urlFor}/${id}`} href="/edit/comics" className="button link-button">{buttonLabelsBG.Edit}</Link>
            <button className="button" onClick={onDelete}>{buttonLabelsBG.Delete}</button>
        </div>
    )
}

export default OwnerButtons;