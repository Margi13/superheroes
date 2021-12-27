import { Link } from 'react-router-dom';
import './LatestHeroCard.css';
import {buttonLabelsBG} from '../../../common/labelsConstatnsBG'

const LatestHeroCard = ({
    hero
}) => {
    return (
        <div className="latest-cards">
            {/* <div className="hero-card">
                <h3>Baby Grooth</h3>
                <div className="image-wrap">
                    <img src="./images/avatar-grooth.png" alt="" />
                </div>
                <h3>Baby Grooth</h3>
                <div className="data-buttons">
                    <Link to="details/1" href="/details" className="btn details-btn">Details</Link>
                </div>
            </div> */}

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
        </div>
    );
}

export default LatestHeroCard;