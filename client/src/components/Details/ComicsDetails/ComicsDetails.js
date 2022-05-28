import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import useComicsState from '../../../hooks/useComicsState';
import { useAuthContext } from '../../../contexts/AuthContext';

import * as imageService from '../../../services/imageService';

import ConfirmDialog from '../../Common/ConfirmDialog/ConfirmDialog';
import { buttonLabelsBG, } from '../../../common/labelsConstatnsBG';
import { titles } from '../../../common/messagesConstantsBG';
import { DetailsHelper } from '../DetailsHelper';
import '../Details.css';
const ComicsDetails = () => {
	const { user } = useAuthContext();
	const { id } = useParams();
	const [comics, setComics] = useComicsState(id);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [imageUrl, setImageUrl] = useState('');
	const helper = DetailsHelper(user, comics, setComics, setShowDeleteDialog);

	useEffect(() => {
		imageService.getImageFromFirebase(comics.imagesUrl[0])
			.then(url => {
				setImageUrl(url);
			})
			.catch(error => {
				console.log(error);
			});
	}, [id, comics.imagesUrl, setImageUrl])

	const ownerButtons = (
		<div className="buttons">
			<Link to={`/edit/hero/${comics._id}`} href="/edit/hero" className="button">{buttonLabelsBG.Edit}</Link>
			<button className="button" onClick={helper.deleteClickHandler}>{buttonLabelsBG.Delete}</button>
		</div>
	)
	return (
		<section className="hero-details">
			<h1>{comics
				? <h1>{comics.title}</h1>
				: titles.Details}
			</h1>
			<div className="info-section">

				<div className="hero-header">
					<img className="hero-img" src={imageUrl || '../images/avatar-grooth.png'} alt="" />
					{/* if names are equal => we write it only one time */}

					<h1>{comics.title}</h1>
				</div>

				<p className="text">
					{comics.description}
				</p>

				{user._id && (user._id === comics._ownerId
					? ownerButtons
					: ''
				)}
				<ConfirmDialog
					textMessage="DeleteConfirm"
					show={showDeleteDialog}
					onCancel={() => setShowDeleteDialog(false)}
					onSave={helper.deleteHandler} />

			</div>
		</section>
	);
}

export default ComicsDetails;