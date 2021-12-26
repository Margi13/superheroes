import { useParams } from 'react-router-dom';
import * as supereroService from '../../services/superheroService';
import useHeroState from '../../hooks/useHeroState';
import { useState } from 'react';
const Edit = () => {
    const { heroId } = useParams();
    const [errors, setErrors] = useState({ personName: null, heroName: null });
    const [superhero] = useHeroState(heroId);

    const heroEditSubmitHandler = (e) => {
        e.preventDefault();
        let heroData = Object.fromEntries(new FormData(e.currentTarget));

        supereroService.update(superhero._id, heroData)
    }

    const personNameChangeHandler = (e) => {
        console.log(e.target.value);
        let currentName = e.target.value;
        if (currentName.length < 3 || currentName.length > 20) {
            setErrors(state => ({ ...state, personName: 'Name should be between 3 and 10 characters long' }));
        }
        else {
            setErrors(state => ({ ...state, personName: null }));

        }
    }
    return (
        <section id="edit-page" className="auth">
            <form id="edit" method="POST" onSubmit={heroEditSubmitHandler}>
                <div className="container">
                    <h1>Edit Superheroe</h1>
                    <label htmlFor="personName">Name of person:</label>
                    <input type="text" id="person-name" name="personName" defaultValue={superhero.personName} onBlur={personNameChangeHandler} style={{ color: errors.personName ? 'red' : 'green' }} />
                    <span style={{ display: errors.personName ? 'inline' : 'hidden' }}>{errors.personName}</span>

                    <label htmlFor="heroName">Heroic name:</label>
                    <input type="text" id="hero-name" name="heroName" defaultValue={superhero.heroName} style={{ color: errors.heroName ? 'red' : 'green' }} />

                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" name="age" min="1" defaultValue={superhero.age} style={{ color: errors.age ? 'red' : 'green' }} />

                    <label htmlFor="imageUrl">Drawing:</label>
                    <input type="text" id="imageUrl" name="imageUrl" defaultValue={superhero.imageUrl} style={{ color: errors.imageUrl ? 'red' : 'green' }} />

                    <label htmlFor="story">Hero story:</label>
                    <textarea name="story" id="story" defaultValue={superhero.story} style={{ color: errors.story ? 'red' : 'green' }} />

                    <input className="btn submit" type="submit" value="Edit" />

                </div>
            </form>
        </section>
    );
}

export default Edit;