import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as supereroService from '../../services/superheroService';

import { formLabelsBG, buttonLabelsBG, placeholdersBG } from '../../common/labelsConstatnsBG';
import { titles, alertMessages } from '../../common/messagesConstantsBG';
import { typesColor, useNotificationContext } from '../../contexts/NotificationContext';
import { ChangeHandlers } from '../Common/ValidationHelper';
const initialErrorState = { personName: null, heroName: null, kind: null, age: null, image: null, story: null }

const Create = () => {
    const { addNotification } = useNotificationContext();
    const navigate = useNavigate();
    const [errors, setErrors] = useState(initialErrorState);
    const handlers = ChangeHandlers(setErrors);

    const onHeroCreate = (e) => {
        e.preventDefault();

        let heroData = Object.fromEntries(new FormData(e.currentTarget));
        if (errors.personName || errors.heroName || errors.kind || errors.age || errors.image || errors.story) {
            addNotification(alertMessages.CreateDenied, typesColor.error);
            return;
        }
        supereroService.create(heroData)
            .then(() => {
                addNotification(alertMessages.CreateSuccess, typesColor.success);
                navigate('/');
            })
            .catch(error => {
                addNotification(alertMessages.CreateDenied, typesColor.error);
                console.log(error);
            });
    }
    return (
        <section id="create-page" className="auth">
            <form id="create" method="POST" onSubmit={onHeroCreate}>
                <div className="container">

                    <h1>{titles.Create}</h1>
                    <label htmlFor="personName">{formLabelsBG.PersonName}:</label>
                    <input type="text" id="person-name" name="personName" placeholder={placeholdersBG.PersonName} onBlur={handlers.personNameChangeHandler} style={{ color: errors.personName ? 'red' : 'inherit' }} />
                    <span style={{ display: errors.personName ? 'inline' : 'hidden', color: errors.personName ? 'red' : 'inherit' }}>{errors.personName}</span>

                    <label htmlFor="heroName">{formLabelsBG.HeroicName}:</label>
                    <input type="text" id="hero-name" name="heroName" placeholder={placeholdersBG.HeroicName} onBlur={handlers.heroNameChangeHandler} style={{ color: errors.heroName ? 'red' : 'inherit' }} />
                    <span style={{ display: errors.heroName ? 'inline' : 'hidden', color: errors.heroName ? 'red' : 'inherit' }}>{errors.heroName}</span>

                    <label htmlFor="kind">{formLabelsBG.Kind}:</label>
                    <input type="text" id="kind" name="kind" placeholder={placeholdersBG.Kind} onBlur={handlers.kindChangeHandler} style={{ color: errors.kind ? 'red' : 'inherit' }} />
                    <span style={{ display: errors.kind ? 'inline' : 'hidden', color: errors.kind ? 'red' : 'inherit' }}>{errors.kind}</span>

                    <label htmlFor="age">{formLabelsBG.Age}:</label>
                    <input type="number" id="age" name="age" min="1" placeholder="20" onBlur={handlers.ageChangeHandler} style={{ color: errors.age ? 'red' : 'inherit' }} />
                    <span style={{ display: errors.age ? 'inline' : 'hidden', color: errors.age ? 'red' : 'inherit' }}>{errors.age}</span>

                    <label htmlFor="imageUrl">{formLabelsBG.Image}:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder={placeholdersBG.Image} onBlur={handlers.imageChangeHandler} style={{ color: errors.imageUrl ? 'red' : 'inherit' }} />
                    <span style={{ display: errors.image ? 'inline' : 'hidden', color: errors.image ? 'red' : 'inherit' }}>{errors.image}</span>

                    <label htmlFor="story">{formLabelsBG.Story}:</label>
                    <textarea name="story" id="story" placeholder={placeholdersBG.Story} onBlur={handlers.storyChangeHandler} style={{ color: errors.story ? 'red' : 'inherit' }} />
                    <span style={{ display: errors.story ? 'inline' : 'hidden', color: errors.story ? 'red' : 'inherit' }}>{errors.story}</span>

                    <input className="btn submit" type="submit" value={buttonLabelsBG.Create} />
                </div>
            </form>
        </section>
    );
}

export default Create;