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
        
        if (heroData.personName==='' || heroData.heroName==='' || heroData.kind==='' || heroData.age==='' || heroData.image==='' || heroData.story==='') {
            const errorMessage = `${alertMessages.CreateDenied} ${alertMessages.EnteredNoData}`;
            addNotification(errorMessage, typesColor.error);
            return;
        }
        if (errors.personName || errors.heroName || errors.kind || errors.age || errors.image || errors.story) {
            const errorMessage = `${alertMessages.CreateDenied} ${alertMessages.EnterInvalidData}`;
            addNotification(errorMessage, typesColor.error);
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
                    <input type="text" id="person-name" name="personName" placeholder={placeholdersBG.PersonName} onBlur={handlers.personNameChangeHandler} className={errors.personName ? 'error' : 'no-error'} />
                    <span className={ errors.personName ? 'show error' : 'hide no-error'}>{errors.personName}</span>

                    <label htmlFor="heroName">{formLabelsBG.HeroicName}:</label>
                    <input type="text" id="hero-name" name="heroName" placeholder={placeholdersBG.HeroicName} onBlur={handlers.heroNameChangeHandler} className={errors.heroName ? 'error' : 'no-error'} />
                    <span className={ errors.heroName ? 'show error' : 'hide no-error' }>{errors.heroName}</span>

                    <label htmlFor="kind">{formLabelsBG.Kind}:</label>
                    <input type="text" id="kind" name="kind" placeholder={placeholdersBG.Kind} onBlur={handlers.kindChangeHandler} className={errors.kind ? 'error' : 'no-error'} />
                    <span className={ errors.kind ? 'show error' : 'hide no-error' }>{errors.kind}</span>

                    <label htmlFor="age">{formLabelsBG.Age}:</label>
                    <input type="number" id="age" name="age" min="1" placeholder="20" onBlur={handlers.ageChangeHandler} className={errors.age ? 'error' : 'no-error'} />
                    <span className={ errors.age ? 'show error' : 'hide no-error'}>{errors.age}</span>

                    <label htmlFor="imageUrl">{formLabelsBG.Image}:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder={placeholdersBG.Image} onBlur={handlers.imageChangeHandler} className={errors.image ? 'error' : 'no-error'} />
                    <span className={ errors.image ? 'show error' : 'hide no-error'}>{errors.image}</span>

                    <label htmlFor="story">{formLabelsBG.Story}:</label>
                    <textarea name="story" id="story" placeholder={placeholdersBG.Story} onBlur={handlers.storyChangeHandler} className={errors.story ? 'error' : 'no-error'}/>
                    <span className={ errors.story ? 'show error' : 'hide no-error'}>{errors.story}</span>

                    <input className="btn submit" type="submit" value={buttonLabelsBG.Create} />
                </div>
            </form>
        </section>
    );
}

export default Create;