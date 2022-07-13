import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useOneHeroWithPicState } from '../../../hooks/useHeroState';
import { useAuthContext } from '../../../contexts/AuthContext';

import ConfirmDialog from '../../Common/ConfirmDialog/ConfirmDialog';
import { formLabelsBG } from '../../../common/labelsConstatnsBG';
import { titles } from '../../../common/messagesConstantsBG';
import { DetailsHelper } from '../DetailsHelper';
import '../Details.css';
import ButtonsBox from '../../Card/ButtonsBox';
import ImageBox from '../../Card/ImageBox';
const HeroDetails = () => {
	const { user } = useAuthContext();
	const { id } = useParams();
	const [superhero, setSuperhero, imageUrl] = useOneHeroWithPicState(id);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const helper = DetailsHelper(user, superhero, setSuperhero, setShowDeleteDialog, 'heroes');

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

						<p className="description" align="justify">
							{superhero.story}
						</p>
					</div>
				</div>

				<ButtonsBox
					id={superhero._id}
					role={role}
					urlFor="heroes"
					hasLikes={true}
					hasDetails={false}
					hasFunctionalButtons={true}
					onDelete={helper.deleteClickHandler}
					onLike={helper.likeButtonClick}
					onReport={helper.reportButtonClick}
				>
					<span id="total-likes" className="likes">{!user._id ? titles.Likes : ''} {superhero.likes?.length || 0}</span>
				</ButtonsBox>

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