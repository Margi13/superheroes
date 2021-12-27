import { Link } from 'react-router-dom';
import { buttonLabelsBG } from '../../../common/labelsConstatnsBG';

import './HeroCard.css'

const HeroCard = ({
    hero
}) => {
    return (
        <div className="heroes-container">
            <div className="hero">
                <div className="hero-info">
                    <img src={hero.imageUrl} alt="" />
                    <h6>{hero.personName}</h6>
                    <h2>{hero.heroName}</h2>
                    <Link to={"/details/" + hero._id} href="/details" className="details-button">{buttonLabelsBG.Details}</Link>
                </div>
            </div>
        </div>
    );
}

export default HeroCard;