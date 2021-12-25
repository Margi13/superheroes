import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as supereroService from '../../services/superheroService';

import { useAuthContext } from '../../contexts/AuthContext'
const Create = () => {

    const { user } = useContext(useAuthContext);
    const navigate = useNavigate();
    const onHeroCreate = (e) => {
        e.preventDefault();

        let heroData = Object.fromEntries(new FormData(e.currentTarget));

        supereroService.create(heroData, user.accessToken)
            .then((result) => {
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <section id="create-page" className="auth">
            <form id="create" method="POST" onSubmit={onHeroCreate}>
                <div className="container">

                    <h1>Create Superhero</h1>
                    <label htmlFor="personName">Name of person:</label>
                    <input type="text" id="person-name" name="personName" placeholder="Enter birth name..." />

                    <label htmlFor="heroName">Heroic name:</label>
                    <input type="text" id="hero-name" name="heroName" placeholder="Enter made-up name..." />

                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" name="age" min="1" placeholder="20" />

                    <label htmlFor="imageUrl">Drawing:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />

                    <label htmlFor="story">Hero story:</label>
                    <textarea name="story" id="story" placeholder="History, superpowers, family..."></textarea>
                    <input className="btn submit" type="submit" value="Create" />
                </div>
            </form>
        </section>
    );
}

export default Create;