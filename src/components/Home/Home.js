import { useState, useEffect } from 'react';
import './Home.css'
import LatestHeroCard from './LatestHeroCard';

import * as superheroService from '../../services/superheroService';
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
            <p className="no-articles">No superheroes yet...</p>
        </div>
    );

    return (
        <section className="comics-world">

            <div className="comics-message">
                <h2>Welcome to</h2>
                <h3>Comics World</h3>
            </div>
            <img src="./images/avatar-grooth.png" alt="hero" />

            <div className="home-page">
                <h1>Latest Superheroes</h1>
                {/* <LatestHeroCard /> */}
                {superheroes
                    ? superheroes.map(x => <LatestHeroCard key={x._id} hero={x} />)
                    : noHeroesElement
                }
            </div>

        </section>
    );
}

export default Home;