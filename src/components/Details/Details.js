import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'

import * as superheroService from '../../services/superheroService';
import './Details.css';
const Details = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [superhero, setSuperhero] = useState({});
  const { heroId } = useParams();

  useEffect(() => {
    superheroService.getOne(heroId)
    .then(res=>{
      setSuperhero(res);

    });

  }, [heroId]);

  const deleteHandler = (e) => {
    e.preventDefault();
    superheroService.remove(heroId, user.accessToken)
    .then(res=>{
      console.log(res)
      navigate('/');
    });
  }
  const editHandler = () => {

  }
  const ownerButtons = (
    <div className="buttons">
      <Link to={"/edit/" + superhero._id} href="/edit" className="button">Edit</Link>
      <a href="#" className="button" onClick={deleteHandler}>Delete</a>
    </div>
  )
  return (
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

        {/* <div className="details-comments">
          <h2>Comments:</h2>
          <ul>
            <li className="comment">
              <p>Content: I rate this one quite highly.</p>
            </li>
            <li className="comment">
              <p>Content: The best hero.</p>
            </li>
          </ul>
          <p className="no-comment">No comments.</p>
        </div> */}
        {user._id && (user._id === superhero._ownerId
          ? ownerButtons
          : (
            <article className="create-comment">
              <label>Add new comment:</label>
              <form className="form">
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input className="btn submit" type="submit" value="Add Comment" />
              </form>
            </article>
          ))
        }


      </div>



    </section>
  );
}

export default Details;