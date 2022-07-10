import { Link } from 'react-router-dom';
import '../Card.css';
import { useEffect, useState } from 'react';
import * as firebaseService from '../../../services/firebaseService';
const ComicsCard = ({
	comics
}) => {
	const [imageUrl, setImageUrl] = useState();
	useEffect(() => {
		firebaseService.getImageFromFirebase(comics.coverPage, `comics/${comics._id}`)
			.then(url => {
				setImageUrl(url);
			});
	}, [comics.coverPage, comics._id, setImageUrl])
	return (
		<div className="comics-card card">
			<Link to={"/details/comics/" + comics._id} href="/details/comics" className="btn card-details-btn">
				<div className="card-image-wrap">
					<img src={imageUrl} alt="" />

					<div className="comics-info">
						<h3>{comics.title}</h3>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default ComicsCard;