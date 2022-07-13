import { alertMessages } from '../../common/messagesConstantsBG';
import * as superheroService from '../../services/superheroService';
import * as comicsService from '../../services/comicsService';
import * as likeService from '../../services/likeService';
import * as firebaseService from '../../services/firebaseService';
import * as reportService from '../../services/reportService';
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
				const imagePath = type === 'comics' ? `comics/${data._id}` : 'heroes';
				const imageUrl = type === 'comics' ? data.coverPage : data.imageUrl;
				firebaseService.deleteImageFromFirebase(imageUrl, imagePath)
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
			addNotification(`${type === 'comics' ? alertMessages.LikeOwnComicsDenied : alertMessages.LikeOwnHeroDenied}`, typesColor.warning);
			return;
		}
		if (data.likes.includes(user._id)) {
			addNotification(alertMessages.LikesDuplicate, typesColor.warning);
			e.target.disabled = true;
			return;
		}
		likeService.like(data._id, user._id)
			.then((result) => {
				if (!result) {
					throw new Error('Cannot like this. Try again later.')
				}
				if (result.type === 'error') {
					throw new Error(result.message);
				}
				const service = type === 'comics' ? comicsService : superheroService;
				service.update(data._id, {"data": { ...data, likes: [...data.likes, user._id] }, status: 1})
					.then((result) => {
						if (result.type === 'error') {
							throw new Error(result.message);
						}
						setData(state => ({ ...state, likes: [...state.likes, user._id] }));
						addNotification(alertMessages.LikesSuccess, typesColor.success);
						e.target.disabled = true;
					})
					.catch((error) => {
						addNotification(alertMessages.EditDenied, typesColor.error);
						console.log(error);
					})
			})
			.catch(error => {
				addNotification(alertMessages.LikesDenied, typesColor.error);
				console.log(error);
			});

	}
	const reportButtonClick = (e) => {
		if (user._id === data._ownerId) {
			addNotification(`${type === 'comics' ? alertMessages.LikeOwnComicsDenied : alertMessages.LikeOwnHeroDenied}`, typesColor.warning);
			return;
		}
		const reportMessage = "I want to report it!"
		reportService.report(reportMessage, data._id, user._id)
			.then((result) => {
				if (!result) {
					throw new Error('Cannot report this. Try again later.')
				}
				if (result.type === 'error') {
					throw new Error(result.message);
				}
				const service = type === 'comics' ? comicsService : superheroService;
				service.update(data._id, { "data": { ...data, reports: [...data.reports, result._id] }, status: 1 })
					.then((result) => {
						if (result.type === 'error') {
							throw new Error(result.message);
						}
						setData(state => ({ ...state, reports: [...state.reports, result._id] }));
						addNotification(alertMessages.ReportsSuccess, typesColor.success);
						e.target.disabled = true;
					})
					.catch((error) => {
						addNotification(alertMessages.EditDenied, typesColor.error);
						console.log(error);
					});
			})
			.catch(error => {
				addNotification(alertMessages.ReportsDenied, typesColor.error);
				console.log(error);
			});

	}
	return {
		deleteHandler,
		deleteClickHandler,
		likeButtonClick,
		reportButtonClick
	}
}