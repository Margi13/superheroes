import { useState, useEffect } from 'react';
import './Home.css'
import TopHeroCard from './TopHeroCard';

import * as superheroService from '../../services/superheroService';
import { titles, alertMessages } from '../../common/messagesConstantsBG';
const Home = () => {
    const [superheroes, setSuperheroes] = useState();

    useEffect(() => {
        superheroService.getTopThree()
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
                <div className="top-cards">
                    {superheroes
                        ? superheroes.map(x => <TopHeroCard key={x._id} hero={x} />)
                        : noHeroesElement
                    }
                </div>
            </div>

        </section>
    );
}

export default Home;