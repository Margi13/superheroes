import { alertMessages } from '../../common/messagesConstantsBG';
import * as superheroService from '../../services/superheroService';
import * as comicsService from '../../services/comicsService';
import * as likeService from '../../services/likeService';
import * as imageService from '../../services/imageService';
import { useNotificationContext } from '../../contexts/NotificationContext';
import { useNavigate, Navigate } from 'react-router-dom';

import { typesColor } from '../../contexts/NotificationContext';

export const DetailsHelper = (user, data, setData, setShowDeleteDialog, type) => {
	const { addNotification } = useNotificationContext();
	const navigate = useNavigate();
	const service = type === 'comics' ? comicsService : superheroService;

	const deleteHandler = (e) => {
		e.preventDefault();
		if (user._id !== data._ownerId) {
			return;
		}
		service.remove(data._id)
			.then(res => {
				const imagePath = type === 'comcis' ? `comics/${data.title.split(' ').join('_')}` : 'heroes';
				const imageUrl = type === 'comics' ? data.coverPage : data.imageUrl;
				imageService.deleteImageFromFirebase(imageUrl, imagePath)
					.then(res => {
						addNotification(alertMessages.DeleteSuccess, typesColor.success);
						navigate('/');
					});
			})
			.catch(error => {
				addNotification(alertMessages.DeleteDenied, typesColor.error);
				console.log(error);
			});
		setShowDeleteDialog(false);

	}

	const deleteClickHandler = (e) => {
		if (user._id !== data._ownerId) {
			return <Navigate to="/" />
		}
		setShowDeleteDialog(true);
	}

	const likeButtonClick = (e) => {

		if (user._id === data._ownerId) {
			return;
		}
		if (data.likes.includes(user._id)) {
			addNotification(alertMessages.LikesDuplicate, typesColor.warning);
			e.target.disabled = true;
			return;
		}
		likeService.like(data._id, user._id)
			.then((result) => {
				if (!result.ok) {
					throw new Error('Cannot like this. Try again later.')
				}
				if (result.type === 'error') {
					throw new Error(result.message);
				}
				setData(state => ({ ...state, likes: [...state.likes, user._id] }));
				addNotification(alertMessages.LikesSuccess, typesColor.success);
				e.target.disabled = true;
			})
			.catch(error => {
				addNotification(alertMessages.LikesDenied, typesColor.success);
				console.log(error);
			});

	}
	return {
		deleteHandler,
		deleteClickHandler,
		likeButtonClick
	}
}