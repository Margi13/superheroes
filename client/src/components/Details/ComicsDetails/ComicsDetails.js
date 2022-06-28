import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useComicsState from '../../../hooks/useComicsState';
import { useAuthContext } from '../../../contexts/AuthContext';

import * as imageService from '../../../services/imageService';

import ConfirmDialog from '../../Common/ConfirmDialog/ConfirmDialog';
import { titles } from '../../../common/messagesConstantsBG';
import { DetailsHelper } from '../DetailsHelper';
import '../Details.css';
import ImageBox from '../../Card/ImageBox';

const ComicsDetails = () => {
	const { user } = useAuthContext();
	const { id } = useParams();
	const [comics, setComics] = useComicsState(id);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [imageUrl, setImageUrl] = useState('');
	const helper = DetailsHelper(user, comics, setComics, setShowDeleteDialog, 'comics');

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

	const role = {
		isGuest: user._id ? user._id.length <= 0 : true,
		isOwner: user._id && (user._id === comics._ownerId) ? true : false
	};
	return (
		<section className="hero-details">
			<h1>{titles.Details}</h1>
			<div className="info-section">

				<div className="hero-header">
					<ImageBox className="hero-img" imageUrl={imageUrl} />

					<div className="info-contaner">
						<h1>{comics.title}</h1>
						<p className="description">
							{comics.description}
						</p>
					</div>
				</div>

				<UserButtons
					id={comics._id}
					urlFor="comics"
					hasDetailsButton={true}
					hasReportButton={true}
					onReport={helper.reportButtonClick}
				>
					{role.isOwner
						? <OwnerButtons id={comics._id} urlFor="comics" onDelete={helper.deleteClickHandler} />
						: role.isAdmin
							? <AdminButtons id={comics._id} hasApproveButton={false} />
							: ''}
				</UserButtons>

				<ConfirmDialog
					textMessage="DeleteConfirm"
					show={showDeleteDialog}
					onCancel={() => setShowDeleteDialog(false)}
					onOk={helper.deleteHandler} />

			</div>
		</section>
	);
}

export default ComicsDetails;