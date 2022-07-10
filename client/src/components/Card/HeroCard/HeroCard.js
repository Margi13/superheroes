import { Link } from 'react-router-dom';
import '../Card.css';
import { useEffect, useState } from 'react';
import * as firebaseService from '../../../services/firebaseService';
const HeroCard = ({
	hero
}) => {
	const [imageUrl, setImageUrl] = useState();
	useEffect(() => {
		firebaseService.getImageFromFirebase(hero.imageUrl, 'heroes')
			.then(url => {
				setImageUrl(url);
			});
	}, [hero.imageUrl, setImageUrl])
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