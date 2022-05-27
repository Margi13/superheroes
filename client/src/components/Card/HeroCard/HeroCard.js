import { Link } from 'react-router-dom';
import '../Card.css';
import { buttonLabelsBG } from '../../../common/labelsConstatnsBG'
import { useEffect, useState } from 'react';
import * as imageService from '../../../services/imageService';

const HeroCard = ({
    hero
}) => {
    const [imageUrl, setImageUrl] = useState();
    useEffect(() => {
        imageService.getImageFromFirebase(hero.imageUrl)
            .then(url => {
                setImageUrl(url);
            });
    }, [hero.imageUrl, setImageUrl])
    return (
        <div className="heroes-card card">
            <h1>{hero.heroName}</h1>
            <div className="card-image-wrap">
                <img src={imageUrl} alt="" />
            </div>
            <h3>{hero.personName}</h3>
            <div className="card-data-buttons">
                <Link to={"/details/" + hero._id} href="/details" className="btn card-details-btn">{buttonLabelsBG.Details}</Link>
            </div>
        </div>
    );
}

export default HeroCard;