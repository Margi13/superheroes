import { Link } from 'react-router-dom';
import { buttonLabelsBG } from '../../../common/labelsConstatnsBG';
import { useEffect, useState } from 'react';
import * as imageService from '../../../services/imageService';

import './HeroCard.css'

const HeroCard = ({
    hero
}) => {
    const [imageUrl, setImageUrl ] = useState();
    useEffect(()=>{
        imageService.getImageFromFirebase(hero.imageUrl)
        .then(url=>{
            setImageUrl(url);
        });
    },[hero.imageUrl])
    return (
        <div className="heroes-container">
            <div className="hero">
                <div className="hero-info">
                    <img src={imageUrl} alt="" />
                    <h6>{hero.personName}</h6>
                    <h2>{hero.heroName}</h2>
                    <Link to={"/details/" + hero._id} href="/details" className="details-button">{buttonLabelsBG.Details}</Link>
                </div>
            </div>
        </div>
    );
}

export default HeroCard;