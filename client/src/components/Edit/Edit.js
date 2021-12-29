import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import useHeroState from '../../hooks/useHeroState';
import { typesColor, useNotificationContext } from '../../contexts/NotificationContext';
import { useAuthContext } from '../../contexts/AuthContext';
import * as supereroService from '../../services/superheroService';
import { formLabelsBG, buttonLabelsBG } from '../../common/labelsConstatnsBG';
import { titles, alertMessages } from '../../common/messagesConstantsBG';
import { ChangeHandlers } from '../Common/Validation/HeroValidationHelper';

const initialErrorState = { personName: null, heroName: null, kind: null, age: null, image: null, story: null }

const Edit = () => {
    
    const navigate = useNavigate();
    const { heroId } = useParams();

    const [errors, setErrors] = useState(initialErrorState);
    const [superhero] = useHeroState(heroId);
    
    const { user } = useAuthContext();
    const { addNotification } = useNotificationContext();

    const handlers = ChangeHandlers(setErrors);
    
    if (user._id !== superhero._ownerId) {
        return <Navigate to="/"/>
    }
    const heroEditSubmitHandler = (e) => {
        e.preventDefault();

        let heroData = Object.fromEntries(new FormData(e.currentTarget));
        if (heroData.personName === '' || heroData.heroName === '' || heroData.kind === '' || heroData.age === '' || heroData.image === '' || heroData.story === '') {
            addNotification(alertMessages.EnteredNoData, typesColor.error);
            return;
        }
        if (errors.personName || errors.heroName || errors.kind || errors.age || errors.image || errors.story) {
            addNotification(alertMessages.EnteredInvalidData, typesColor.error);
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
                    <input type="text" id="person-name" name="personName"
                        defaultValue={superhero.personName}
                        onBlur={handlers.personNameChangeHandler}
                        className={errors.personName ? 'error' : 'no-error'} />
                    <span className={errors.personName ? 'show error' : 'hide no-error'}>{errors.personName}</span>

                    <label htmlFor="heroName">{formLabelsBG.HeroicName}:</label>
                    <input type="text" id="hero-name" name="heroName"
                        defaultValue={superhero.heroName}
                        onBlur={handlers.heroNameChangeHandler}
                        className={errors.heroName ? 'error' : 'no-error'} />
                    <span className={errors.heroName ? 'show error' : 'hide no-error'}>{errors.heroName}</span>

                    <label htmlFor="kind">{formLabelsBG.Kind}:</label>
                    <input type="text" id="kind" name="kind"
                        defaultValue={superhero.kind}
                        onBlur={handlers.kindChangeHandler}
                        className={errors.kind ? 'error' : 'no-error'} />
                    <span className={errors.kind ? 'show error' : 'hide no-error'}>{errors.kind}</span>

                    <label htmlFor="age">{formLabelsBG.Age}:</label>
                    <input type="number" id="age" name="age" min="1"
                        defaultValue={superhero.age}
                        onBlur={handlers.ageChangeHandler}
                        className={errors.age ? 'error' : 'no-error'} />
                    <span className={errors.age ? 'show error' : 'hide no-error'}>{errors.age}</span>

                    <label htmlFor="imageUrl">{formLabelsBG.Image}:</label>
                    <input type="text" id="imageUrl" name="imageUrl"
                        defaultValue={superhero.imageUrl}
                        onBlur={handlers.imageChangeHandler}
                        className={errors.imageUrl ? 'error' : 'no-error'} />
                    <span className={errors.image ? 'show error' : 'hide no-error'}>{errors.image}</span>

                    <label htmlFor="story">{formLabelsBG.Story}:</label>
                    <textarea name="story" id="story"
                        defaultValue={superhero.story}
                        onBlur={handlers.storyChangeHandler}
                        className={errors.story ? 'error' : 'no-error'} />
                    <span className={errors.story ? 'show error' : 'hide no-error'}>{errors.story}</span>

                    <input className="btn submit" type="submit" value={buttonLabelsBG.Edit} />

                </div>
            </form>
        </section>
    );
}

export default Edit;