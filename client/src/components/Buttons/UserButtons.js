
import { buttonLabelsBG } from '../../common/labelsConstatnsBG';
import { Link } from 'react-router-dom';
import './Buttons.css';

const UserButton = ({
    children,
    id,
    urlFor,
    hasDetailsButton,
    hasLikesButton,
    canLike,
    hasReportButton,
    likesCount,
    onLike,
    onReport,
}) => {
    const readButton = (
        <div className="buttons">
            <Link to={`/read/comics/${id}`} href="/read/comics" className="button link-button">{buttonLabelsBG.Read}</Link>
        </div>
    )
    // To see this because the logic is more complex when there are no likes
    const likeButton = (
        <div className="buttons like-container">
            <span id="total-likes" className="likes">
                <i className={`fa fa-heart ${canLike ? 'like-button' : ''}`} onClick={canLike ? onLike : () => { }} />
                {likesCount || 0}
            </span>
        </div>
    )
    const detailsButton = (
        <div className="buttons">
            <Link to={`/details/${urlFor}/${id}`} href="/details" className="button link-button">{buttonLabelsBG.Details}</Link>
        </div>
    )
    const reportButton = (
        <div className="buttons like-container">
            <button className="button" onClick={onReport}>{buttonLabelsBG.Report}</button>
        </div>
    )

    return (
        <>
            {urlFor === "comics"
                ? readButton
                : hasLikesButton
                    ? likeButton
                    : ''
            }
            <div className="functional-buttons">
            {hasDetailsButton ? detailsButton : ''}

                {children}

                {hasReportButton ? reportButton : ''}
            </div>
        </>
    )
}

export default UserButton;