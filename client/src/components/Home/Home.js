import { useState, useEffect } from 'react';
import './Home.css'
import TopHeroCard from './TopHeroCard';

import * as superheroService from '../../services/superheroService';
import { titles, alertMessages } from '../../common/messagesConstantsBG';
import { typesColor, useNotificationContext } from '../../contexts/NotificationContext';
const Home = () => {
    const [superheroes, setSuperheroes] = useState();
    const { addNotification } = useNotificationContext();

    useEffect(() => {
        superheroService.getTopThree()
            .then(topHeroes => {
                
                setSuperheroes(topHeroes);
            })
            .catch(error => {
                addNotification(alertMessages.SomethingWentWrong, typesColor.error);
                console.log(error);
            });
    }, [addNotification]);
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