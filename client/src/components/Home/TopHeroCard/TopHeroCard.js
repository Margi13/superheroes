import { Link } from 'react-router-dom';
import './TopHeroCard.css';
import { buttonLabelsBG } from '../../../common/labelsConstatnsBG'
import { useEffect, useState } from 'react';
import * as imageService from '../../../services/imageService';
const TopHeroCard = ({
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
        <div className="hero-card">
            <h3>{hero.heroName}</h3>
            <div className="image-wrap">
                <img src={imageUrl} alt="" />
            </div>
            <h3>{hero.personName}</h3>
            <div className="data-buttons">
                <Link to={"/details/" + hero._id} href="/details" className="btn details-btn">{buttonLabelsBG.Details}</Link>
            </div>
        </div>
    );
}

export default TopHeroCard;