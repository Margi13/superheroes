import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as supereroService from '../../services/superheroService';
import useHeroState from '../../hooks/useHeroState';
import { formLabelsBG, buttonLabelsBG } from '../../common/labelsConstatnsBG';
import { titles, alertMessages } from '../../common/messagesConstantsBG';
import { typesColor, useNotificationContext } from '../../contexts/NotificationContext';
import { ChangeHandlers } from '../Common/ValidationHelper';

const initialErrorState = { personName: null, heroName: null, kind: null, age: null, image: null, story: null }

const Edit = () => {
    const { heroId } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState(initialErrorState);
    const [superhero] = useHeroState(heroId);
    const { addNotification } = useNotificationContext();
    const handlers = ChangeHandlers(setErrors);

    const heroEditSubmitHandler = (e) => {
        e.preventDefault();

        let heroData = Object.fromEntries(new FormData(e.currentTarget));
        if (errors.personName || errors.heroName || errors.kind || errors.age || errors.image || errors.story) {
            return;
        }

        supereroService.update(superhero._id, heroData)
            .then(() => {
                addNotification(alertMessages.EditSuccess, typesColor.success);
                navigate(`/details/${heroId}`)
            })
            .catch(error => {
                addNotification(alertMessages.EditDenied, typesColor.error);
                console.log(error);
            })
    }

    return (
        <section id="edit-page" className="auth">
            <form id="edit" method="POST" onSubmit={heroEditSubmitHandler}>
                <div className="container">
                    <h1>{titles.Edit}</h1>
                    <label htmlFor="personName">{formLabelsBG.PersonName}:</label>
                    <input type="text" id="person-name" name="personName" defaultValue={superhero.personName} onBlur={handlers.personNameChangeHandler} style={{ color: errors.personName ? 'red' : 'inherit' }} />
                    <span style={{ display: errors.personName ? 'inline' : 'hidden', color: errors.personName ? 'red' : 'inherit' }}>{errors.personName}</span>

                    <label htmlFor="heroName">{formLabelsBG.HeroicName}:</label>
                    <input type="text" id="hero-name" name="heroName" defaultValue={superhero.heroName} onBlur={handlers.heroNameChangeHandler} style={{ color: errors.heroName ? 'red' : 'inherit' }} />
                    <span style={{ display: errors.heroName ? 'inline' : 'hidden', color: errors.heroName ? 'red' : 'inherit' }}>{errors.heroName}</span>

                    <label htmlFor="kind">{formLabelsBG.Kind}:</label>
                    <input type="text" id="kind" name="kind" defaultValue={superhero.kind} onBlur={handlers.kindChangeHandler} style={{ color: errors.kind ? 'red' : 'inherit' }} />
                    <span style={{ display: errors.kind ? 'inline' : 'hidden', color: errors.kind ? 'red' : 'inherit' }}>{errors.kind}</span>

                    <label htmlFor="age">{formLabelsBG.Age}:</label>
                    <input type="number" id="age" name="age" min="1" defaultValue={superhero.age} onBlur={handlers.ageChangeHandler} style={{ color: errors.age ? 'red' : 'inherit' }} />
                    <span style={{ display: errors.age ? 'inline' : 'hidden', color: errors.age ? 'red' : 'inherit' }}>{errors.age}</span>

                    <label htmlFor="imageUrl">{formLabelsBG.Image}:</label>
                    <input type="text" id="imageUrl" name="imageUrl" defaultValue={superhero.imageUrl} onBlur={handlers.imageChangeHandler} style={{ color: errors.imageUrl ? 'red' : 'inherit' }} />
                    <span style={{ display: errors.image ? 'inline' : 'hidden', color: errors.image ? 'red' : 'inherit' }}>{errors.image}</span>

                    <label htmlFor="story">{formLabelsBG.Story}:</label>
                    <textarea name="story" id="story" defaultValue={superhero.story} onBlur={handlers.storyChangeHandler} style={{ color: errors.story ? 'red' : 'inherit' }} />
                    <span style={{ display: errors.story ? 'inline' : 'hidden', color: errors.story ? 'red' : 'inherit' }}>{errors.story}</span>

                    <input className="btn submit" type="submit" value={buttonLabelsBG.Edit} />

                </div>
            </form>
        </section>
    );
}

export default Edit;