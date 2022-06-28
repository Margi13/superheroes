import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useHeroState from '../../../hooks/useHeroState';
import { useAuthContext } from '../../../contexts/AuthContext';

import * as likeService from '../../../services/likeService';
import * as imageService from '../../../services/imageService';

import ConfirmDialog from '../../Common/ConfirmDialog/ConfirmDialog';
import { formLabelsBG } from '../../../common/labelsConstatnsBG';
import { titles } from '../../../common/messagesConstantsBG';
import { DetailsHelper } from '../DetailsHelper';
import '../Details.css';
import ImageBox from '../../Card/ImageBox';
import AdminButtons from '../../Buttons/AdminButtons';
const HeroDetails = () => {
	const { user } = useAuthContext();
	const { id } = useParams();
	const [superhero, setSuperhero] = useHeroState(id);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [imageUrl, setImageUrl] = useState('');
	const helper = DetailsHelper(user, superhero, setSuperhero, setShowDeleteDialog, 'heroes');

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
	const role = {
		isGuest: user._id ? user._id.length <= 0 : true,
		isOwner: user._id === superhero._ownerId ? true : false
	}

	return (
		<section className="hero-details">
			<h1>{titles.Details}</h1>
			<div className="info-section">

				<div className="hero-header">
					<ImageBox className="hero-img" imageUrl={imageUrl} />
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
				</div>

				<section className='buttons-container'>
					<UserButtons
						id={superhero._id}
						urlFor="heroes"
						hasDetailsButton={true}
						hasLikesButton={true}
						likesCount={superhero.likes?.length || 0}
						onLike={helper.likeButtonClick}
						onReport={helper.reportButtonClick}
					>
						{role.isOwner
							? <OwnerButtons id={superhero._id} urlFor="heroes" onDelete={helper.deleteClickHandler} />
							: role.isAdmin
								? <AdminButtons id={superhero._id} hasApproveButton={false} />
								: ''}
					</UserButtons>
				</section>

				<ConfirmDialog
					textMessage="DeleteConfirm"
					show={showDeleteDialog}
					onCancel={() => setShowDeleteDialog(false)}
					onSave={helper.deleteHandler} />

			</div>
		</section>
	);
}

export default HeroDetails;