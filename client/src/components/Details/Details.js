import { useEffect, useState } from 'react';
import useHeroState from '../../hooks/useHeroState';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { typesColor, useNotificationContext } from '../../contexts/NotificationContext';

import * as superheroService from '../../services/superheroService';
import * as likeService from '../../services/likeService';
import ConfirmDialog from '../Common/ConfirmDialog/ConfirmDialog';
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
  }, [heroId])

  const deleteHandler = (e) => {
    e.preventDefault();
    superheroService.remove(heroId, user.accessToken)
      .then(res => {
        navigate('/');
      })
      .finally(() => {
        setShowDeleteDialog(false);

      });
  }

  const deleteClickHandler = (e) => {
    e.preventDefault();
    setShowDeleteDialog(true);
  }

  const ownerButtons = (
    <div className="buttons">
      <Link to={`/edit/${superhero._id}`} href="/edit" className="button">Edit</Link>
      <button className="button" onClick={deleteClickHandler}>Delete</button>
    </div>
  )
  const likeButtonClick = (e) => {
    
    console.log(e.target.disabled)
    if (user._id === superhero._ownerId) {
      return;
    }
    if (superhero.likes.includes(user._id)) {
      addNotification('You had already liked this hero!', typesColor.warning);
      e.target.disabled = true;
      return;
    }
    likeService.like(user._id, heroId)
      .then(() => {
        setSuperhero(state => ({ ...state, likes: [...state.likes, user._id] }));
        addNotification('Successfully liked this hero', typesColor.success);
        e.target.disabled = true;
      });

  }
  //disabled={superhero.likes.includes(user._id)}
  const userButtons = (
    <div className="buttons">
       <button className="button" onClick={likeButtonClick} >Like</button>
    </div>
  )
  return (
    <>
      <ConfirmDialog
        show={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        onSave={deleteHandler} />
      <section className="hero-details">
        <h1>Superhero Details</h1>
        <div className="info-section">

          <div className="hero-header">
            <img className="hero-img" src={superhero.imageUrl || '../images/avatar-grooth.png'} alt="" />
            {/* if names are equal => we write it only one time */}
            <h1>{superhero.heroName || 'Hero name'} ({superhero.personName || 'Real name'})</h1>
            <span className="age">{superhero.age || 5} години</span>
            {/* <p className="superpower">{superhero.superpower || 'Superpowers'}</p> */}
          </div>

          <p className="text">
            {superhero.story ||
              `Story of superhero! Set in a world where fantasy creatures live side by side with humans. A human cop is forced to work with an Orc to find a weapon everyone is prepared to kill for. Set in a world where fantasy creatures live side by side with humans. A human cop is forced
          to work with an Orc to find a weapon everyone is prepared to kill for.`
            }
          </p>


          {user._id && (user._id === superhero._ownerId
            ? ownerButtons
            : userButtons
          )}
          <div className="likes">
            {/* <img className="hearts" /> */}
            <span id="total-likes">Likes: {superhero.likes?.length || 0}</span>
          </div>

        </div>
      </section>
    </>
  );
}

export default Details;