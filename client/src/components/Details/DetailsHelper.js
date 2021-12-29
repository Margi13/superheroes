import { alertMessages } from '../../common/messagesConstantsBG';
import * as superheroService from '../../services/superheroService';
import * as likeService from '../../services/likeService';
import * as imageService from '../../services/imageService';
import { useNotificationContext } from '../../contexts/NotificationContext';
import { useNavigate, Navigate } from 'react-router-dom';

import { typesColor } from '../../contexts/NotificationContext';

export const DetailsHelper = (user, superhero,setSuperhero,setShowDeleteDialog)=>{
  const { addNotification } = useNotificationContext();
  const navigate = useNavigate();
    
  const deleteHandler = (e) => {
    e.preventDefault();
    if (user._id !== superhero._ownerId) {
      return;
    }
    superheroService.remove(superhero._id)
      .then(res => {
        imageService.deleteImageFromFirebase(superhero.imageUrl)
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
    e.preventDefault();
    if (user._id !== superhero._ownerId) {
      return <Navigate to="/" />
    }
    setShowDeleteDialog(true);
  }

  const likeButtonClick = (e) => {

    if (user._id === superhero._ownerId) {
      return;
    }
    if (superhero.likes.includes(user._id)) {
      addNotification(alertMessages.LikesDuplicate, typesColor.warning);
      e.target.disabled = true;
      return;
    }
    likeService.like(superhero._id)
      .then(() => {
        setSuperhero(state => ({ ...state, likes: [...state.likes, user._id] }));
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