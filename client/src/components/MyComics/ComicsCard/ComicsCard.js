import { Link } from 'react-router-dom';
import { buttonLabelsBG } from '../../../common/labelsConstatnsBG';
import { alertMessages } from '../../../common/messagesConstantsBG';
import { useEffect, useState } from 'react';
import * as imageService from '../../../services/imageService';

import './ComicsCard.css'

const ComicsCard = ({
    comics
}) => {
    const [imageUrl, setImageUrl] = useState();
    useEffect(() => {
        imageService.getImageFromFirebase(comics.imageUrl)
            .then(url => {
                setImageUrl(url);
            });
    }, [comics.imageUrl])
    const approvedMessage = (<span className="green">{alertMessages.Approved}</span>);
    const pendingMessage = (<span className="orange">{alertMessages.Pending}</span>);
    const declinedMessage = (<span className="red">{alertMessages.Declined}</span>);
    return (
        <div className="comics-container heroes-container">
            <div className="comics hero">
                <div className="comics-info hero-info">
                    <img src={imageUrl} alt="" />
                    {comics.status === 1
                        ? approvedMessage
                        : comics.status === 0
                            ? pendingMessage
                            : declinedMessage}
                    <h2>{comics.comicsName} ({comics.personName})</h2>
                    <Link to={"/details/" + comics._id} href="/details" className="details-button">{buttonLabelsBG.Details}</Link>
                </div>
            </div>
        </div>
    );
}

export default ComicsCard;