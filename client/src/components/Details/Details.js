import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom';

import useHeroState from '../../hooks/useHeroState';
import { useAuthContext } from '../../contexts/AuthContext';
import { typesColor, useNotificationContext } from '../../contexts/NotificationContext';

import * as superheroService from '../../services/superheroService';
import * as likeService from '../../services/likeService';

import ConfirmDialog from '../Common/ConfirmDialog/ConfirmDialog';
import { buttonLabelsBG, formLabelsBG } from '../../common/labelsConstatnsBG';
import { alertMessages, titles } from '../../common/messagesConstantsBG';

import './Details.css';
const Details = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { heroId } = useParams();
  const [superhero, setSuperhero] = useHeroState(heroId);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { addNotification } = useNotificationContext();

  useEffect(() => {
    likeService.getHeroLikes(heroId)
      .then((likes) => {
        setSuperhero(state => ({ ...state, likes }))
      });
  }, [heroId, setSuperhero])

  const deleteHandler = (e) => {
    e.preventDefault();
    if (user._id !== superhero._ownerId) {
      return;
    }
    superheroService.remove(heroId)
      .then(res => {
        addNotification(alertMessages.DeleteSuccess, typesColor.success);
        navigate('/');
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
      return <Navigate to="/"/>
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
    likeService.like(heroId)
      .then(() => {
        setSuperhero(state => ({ ...state, likes: [...state.likes, user._id] }));
        addNotification(alertMessages.LikesSuccess, typesColor.success);
        e.target.disabled = true;
      })
      .catch(error=>{
        addNotification(alertMessages.LikesDenied, typesColor.success);
        console.log(error);
      });

  }

  const ownerButtons = (
    <div className="buttons">
      <Link to={`/edit/${superhero._id}`} href="/edit" className="button">{buttonLabelsBG.Edit}</Link>
      <button className="button" onClick={deleteClickHandler}>{buttonLabelsBG.Delete}</button>
    </div>
  )
  //disabled={superhero.likes.includes(user._id)}
  const userButtons = (
    <div className="buttons">
      <button className="button" onClick={likeButtonClick}>{buttonLabelsBG.Like}</button>
    </div>
  )
  return (
    <>
      <section className="hero-details">
        <h1>{titles.Details}</h1>
        <div className="info-section">

          <div className="hero-header">
            <img className="hero-img" src={superhero.imageUrl || '../images/avatar-grooth.png'} alt="" />
            {/* if names are equal => we write it only one time */}
            {superhero.heroName === superhero.personName
              ? <h1>{superhero.heroName}</h1>
              : <h1>{superhero.heroName} ({superhero.personName})</h1>
            }
            <span className="age">{superhero.age} {formLabelsBG.Age.toLocaleLowerCase()}</span>
            <span className="kind">{superhero.kind || 'Човек'}</span>
          </div>

          <p className="text">
            {superhero.story}
          </p>

          <div className="likes">
            {/* <img className="hearts" /> */}
            <span id="total-likes">{titles.Likes}: {superhero.likes?.length || 0}</span>
          </div>

          {user._id && (user._id === superhero._ownerId
            ? ownerButtons
            : userButtons
          )}

          <ConfirmDialog
            show={showDeleteDialog}
            onCancel={() => setShowDeleteDialog(false)}
            onSave={deleteHandler} />
        </div>
      </section>
    </>
  );
}

export default Details;