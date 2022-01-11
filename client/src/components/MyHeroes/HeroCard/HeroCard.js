import { Link } from 'react-router-dom';
import { buttonLabelsBG } from '../../../common/labelsConstatnsBG';
import { alertMessages } from '../../../common/messagesConstantsBG';
import { useEffect, useState } from 'react';
import * as imageService from '../../../services/imageService';

import './HeroCard.css'

const HeroCard = ({
    hero
}) => {
    const [imageUrl, setImageUrl] = useState();
    useEffect(() => {
        imageService.getImageFromFirebase(hero.imageUrl)
            .then(url => {
                setImageUrl(url);
            });
    }, [hero.imageUrl])
    const approvedMessage = (<span className="green">{alertMessages.Approved}</span>);
    const pendingMessage = (<span className="orange">{alertMessages.Pending}</span>);
    const declinedMessage = (<span className="red">{alertMessages.Declined}</span>);
    return (
        <div className="heroes-container">
            <div className="hero">
                <div className="hero-info">
                    <img src={imageUrl} alt="" />
                    {hero.status === 1
                        ? approvedMessage
                        : hero.status === 0
                            ? pendingMessage
                            : declinedMessage}
                    <h2>{hero.heroName} ({hero.personName})</h2>
                    <Link to={"/details/" + hero._id} href="/details" className="details-button">{buttonLabelsBG.Details}</Link>
                </div>
            </div>
        </div>
    );
}

export default HeroCard;