import { useNavigate } from 'react-router-dom';
import * as supereroService from '../../services/superheroService';

import { formLabelsBG, buttonLabelsBG, placeholdersBG } from '../../common/labelsConstatnsBG';
import { titles, alertMessages } from '../../common/messagesConstantsBG';
import { typesColor, useNotificationContext } from '../../contexts/NotificationContext';
const Create = () => {
    const { addNotification } = useNotificationContext();
    const navigate = useNavigate();
    const onHeroCreate = (e) => {
        e.preventDefault();

        let heroData = Object.fromEntries(new FormData(e.currentTarget));

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
                    <input type="text" id="person-name" name="personName" placeholder={placeholdersBG.PersonName} />

                    <label htmlFor="heroName">{formLabelsBG.HeroicName}:</label>
                    <input type="text" id="hero-name" name="heroName" placeholder={placeholdersBG.HeroicName} />

                    <label htmlFor="kind">{formLabelsBG.Kind}:</label>
                    <input type="text" id="kind" name="kind" placeholder={placeholdersBG.Kind} />

                    <label htmlFor="age">{formLabelsBG.Age}:</label>
                    <input type="number" id="age" name="age" min="1" placeholder="20" />

                    <label htmlFor="imageUrl">{formLabelsBG.Image}:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder={placeholdersBG.Image} />

                    <label htmlFor="story">{formLabelsBG.Story}:</label>
                    <textarea name="story" id="story" placeholder={placeholdersBG.Story}></textarea>
                    <input className="btn submit" type="submit" value={buttonLabelsBG.Create} />
                </div>
            </form>
        </section>
    );
}

export default Create;