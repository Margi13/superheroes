import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useComicsState from '../../../hooks/useComicsState';

import * as imageService from '../../../services/imageService';

import { formLabelsBG } from '../../../common/labelsConstatnsBG';
import { titles } from '../../../common/messagesConstantsBG';
import DetailsCard from '../../Card/DetailsCard';
import '../Details.css';

const ComicsDetails = () => {
	const { id } = useParams();
	const [comics, setComics] = useComicsState(id);
	const [imageUrl, setImageUrl] = useState('');

	useEffect(() => {
		if (comics.coverPage) {
			imageService.getImageFromFirebase(comics.coverPage, `comics/${comics._id}`)
				.then(url => {
					setImageUrl(url);
				})
				.catch(error => {
					console.log(error);
				});
		}

	}, [comics.coverPage, comics._id, setImageUrl])

	return (
		<section className="hero-details">
			<h1>{titles.Details}</h1>
			<DetailsCard
				type="comics"
				image={imageUrl}
				data={comics}
				setData={setComics}
			>
				<div className="info-contaner">
					<h1>{comics.title}</h1>
					<span className="age"> {formLabelsBG.Genre}: {comics.genre}</span>
					<p className="description">
						{comics.description}
					</p>
				</div>
			</DetailsCard>
		</section>
	);
}

export default ComicsDetails;