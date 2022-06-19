
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
            <button className="button success" onClick={onApprove}>Yes</button>
            <button className="button danger" onClick={onDecline}>No</button>
        </div>
    )
    const likeButton = (
        <div className="buttons like-container">
            <button className="button" onClick={hasLikes ? onLike : () => { }}>
                {buttonLabelsBG.Like}
                {children}
            </button>
            <button className="button danger" onClick={onReport}>{buttonLabelsBG.Report}</button>
        </div>
    )
    const detailsButton = (
        <div className="buttons">
            <Link to={`/details/${urlFor}/${id}`} href="/details" className="button">{buttonLabelsBG.Details}</Link>
        </div>
    )

    return (
        <section className='buttons-container'>
            {hasLikes
                ? (role.isGuest
                    ? <>{children}</>
                    : likeButton
                )
                : ''
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
        </section>
    )
}

export default ButtonsBox;