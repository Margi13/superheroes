import { Link } from 'react-router-dom';
import '../Card.css';
import { useImageState } from '../../../hooks/useFirebaseState';
const HeroCard = ({
	hero
}) => {
	const [imageUrl] = useImageState(hero._id, hero.imageUrl, 'heroes');

	return (
		<div className="heroes-card card">
			<Link to={"/details/heroes/" + hero._id} href="/details/heroes" className="btn card-details-btn">
				<div className="card-image-wrap">
					<img src={imageUrl} alt="" />

					<div className="hero-info">
						<h3>{hero.heroName}</h3>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default HeroCard;