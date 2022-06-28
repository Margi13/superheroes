
import { buttonLabelsBG } from '../../common/labelsConstatnsBG';
import { titles } from '../../common/messagesConstantsBG';
import { Link } from 'react-router-dom';

const UserButton = ({
    children,
    id,
    urlFor,
    hasDetailsButton,
    hasLikesButton,
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
            <button className="button" onClick={hasLikesButton ? onLike : () => { }}>
                {buttonLabelsBG.Like}
                <span id="total-likes" className="likes">{titles.Likes}: {likesCount || 0}</span>
            </button>
        </div>
    )
    const detailsButton = (
        <div className="buttons">
            <Link to={`/details/${urlFor}/${id}`} href="/details" className="button">{buttonLabelsBG.Details}</Link>
        </div>
    )
    const reportButton = (
        <div className="buttons like-container">
            <button className="button danger" onClick={onReport}>{buttonLabelsBG.Report}</button>
        </div>
    )

    return (
        <>
            {urlFor === "comics"
                ? readButton
                : hasLikesButton
                    ? likeButton
                    : <span id="total-likes" className="likes">{titles.Likes}: {likesCount || 0}</span>
            }

            {children}

            {hasDetailsButton ? detailsButton : ''}
            {hasReportButton ? reportButton : ''}
        </>
    )
}

export default UserButton;