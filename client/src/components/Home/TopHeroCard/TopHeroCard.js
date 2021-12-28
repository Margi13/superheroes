import { Link } from 'react-router-dom';
import './TopHeroCard.css';
import { buttonLabelsBG } from '../../../common/labelsConstatnsBG'

const LatestHeroCard = ({
    hero
}) => {
    return (
        <div className="hero-card">
            <h3>{hero.heroName}</h3>
            <div className="image-wrap">
                <img src={hero.imageUrl} alt="" />
            </div>
            <h3>{hero.personName}</h3>
            <div className="data-buttons">
                <Link to={"/details/" + hero._id} href="/details" className="btn details-btn">{buttonLabelsBG.Details}</Link>
            </div>
        </div>
    );
}

export default LatestHeroCard;