import { useState, useEffect } from 'react';
import './Home.css'
import LatestHeroCard from './LatestHeroCard';

import * as superheroService from '../../services/superheroService';
import {titles, alertMessages} from '../../common/messagesConstantsBG';
const Home = () => {
    const [superheroes, setSuperheroes] = useState();

    useEffect(() => {
        superheroService.getLatest()
            .then(hero => {
                setSuperheroes(hero);
            });
    }, []);

    const noHeroesElement = (
        <div>
            <p className="no-articles">{alertMessages.NoSuperheroes}</p>
        </div>
    );

    return (
        <section className="comics-world">

            <div className="comics-message">
                <h2>{titles.Welcome}</h2>
            </div>
            <img src="./images/avatar-grooth.png" alt="hero" />

            <div className="home-page">
                <h1>{titles.TopHeroes}</h1>
                {superheroes
                    ? superheroes.map(x => <LatestHeroCard key={x._id} hero={x} />)
                    : noHeroesElement
                }
            </div>

        </section>
    );
}

export default Home;