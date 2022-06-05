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
		if(comics.coverPage){
			imageService.getImageFromFirebase(comics.coverPage)
			.then(url => {
				setImageUrl(url);
			})
			.catch(error => {
				console.log(error);
			});
		}
			
	}, [comics.coverPage, setImageUrl])

	const ownerButtons = (
		<div className="buttons">
			<Link to={`/edit/comics/${comics._id}`} href="/edit/comics" className="button">{buttonLabelsBG.Edit}</Link>
			<button className="button" onClick={helper.deleteClickHandler}>{buttonLabelsBG.Delete}</button>
		</div>
	)
	return (
		<section className="hero-details">
			<h1>{comics
				? comics.title
				: titles.Details}
			</h1>
			<div className="info-section">

				<div className="hero-header">
					<img className="hero-img" src={imageUrl || '../images/avatar-grooth.png'} alt="" />
					{/* if names are equal => we write it only one time */}
					<div className="info-container">
						<h1>{comics.title}</h1>
						<p className="text">
							{comics.description}
						</p>
					</div>
				</div>


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