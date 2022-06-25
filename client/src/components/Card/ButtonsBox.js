
import { buttonLabelsBG } from '../../common/labelsConstatnsBG';
import { Link } from 'react-router-dom';

const ButtonsBox = ({
    children,
    id,
    hasDetails,
    hasLikes,
    hasFunctionalButtons,
    role,
    isDocument,
    onDelete,
    onLike,
    onApprove,
    onDecline,
    urlFor,
    onReport
}) => {
    const ownerButtons = (
        <div className="buttons">
            <Link to={`/edit/${urlFor}/${id}`} href="/edit/comics" className="button link-button">{buttonLabelsBG.Edit}</Link>
            <button className="button" onClick={onDelete}>{buttonLabelsBG.Delete}</button>
        </div>
    )
    const approveButtons = (
        <div className="buttons">
            <button className="button success" onClick={onApprove}>Одобри</button>
            <button className="button danger" onClick={onDecline}>Откажи</button>
        </div>
    )
    const readButtons = (
        <div className="buttons">
            <Link to={`/read/comics/${id}`} href="/read/comics" className="button link-button">{buttonLabelsBG.Read}</Link>
        </div>
    )
    const likeButton = (
        <div className="buttons like-container">
            <button className="button" onClick={hasLikes ? onLike : () => { }}>
                {buttonLabelsBG.Like}
                {children}
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
        <section className='buttons-container'>
            {hasLikes
                ? (role.isGuest || role.isOwner
                    ? <>
                        <i className="fa fa-regular fa-heart"></i>
                        {children}
                    </>
                    : likeButton
                )
                : ''
            }
            {urlFor === "comics"
                ? readButtons
                : <></>
            }
            {hasFunctionalButtons
                ? isDocument
                    ? (role.isOwner
                        ? ownerButtons
                        : approveButtons
                    )
                    : role.isAdmin
                        ? approveButtons
                        : (role.isOwner
                            ? ownerButtons
                            : <></>
                        )
                : ''
            }
            {hasDetails
                ? detailsButton
                : <></>
            }
            {!hasLikes && !role.isGuest && !role.isOwner
                ? reportButton
                : ''
            }
        </section>
    )
}

export default ButtonsBox;