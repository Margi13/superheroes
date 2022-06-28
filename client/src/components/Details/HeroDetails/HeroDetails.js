import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useHeroState from '../../../hooks/useHeroState';

import * as likeService from '../../../services/likeService';
import * as imageService from '../../../services/imageService';

import { formLabelsBG } from '../../../common/labelsConstatnsBG';
import { titles } from '../../../common/messagesConstantsBG';
import DetailsCard from '../../Card/DetailsCard';
import '../Details.css';
const HeroDetails = () => {
	const { id } = useParams();
	const [superhero, setSuperhero] = useHeroState(id);
	const [imageUrl, setImageUrl] = useState('');

	useEffect(() => {
		if (superhero.imageUrl) {
			imageService.getImageFromFirebase(superhero.imageUrl, 'heroes')
				.then(url => {
					setImageUrl(url);
				})
				.catch(error => {
					console.log(error);
				});
		}
		likeService.getHeroLikes(id)
			.then((likes) => {
				setSuperhero(state => ({ ...state, likes }))

			})
			.catch(error => {
				console.log(error);
			});
	}, [id, setSuperhero, superhero.imageUrl, setImageUrl])

	return (
		<section className="hero-details">
			<h1>{titles.Details}</h1>
			<DetailsCard
				type="heroes"
				image={imageUrl}
				data={superhero}
				setData={setSuperhero}
			>
				{/* if names are equal => we write it only one time */}
				<div className="info-contaner">
					{superhero.heroName === superhero.personName
						? <h1>{superhero.heroName}</h1>
						: <h1>{superhero.heroName} ({superhero.personName})</h1>
					}
					<span className="age">{superhero.age} {formLabelsBG.Age.toLocaleLowerCase()}</span>
					<span className="kind">{superhero.kind || 'Човек'}</span>

					<p className="description">
						{superhero.story}
					</p>
				</div>
			</DetailsCard>
		</section>
	);
}

export default HeroDetails;