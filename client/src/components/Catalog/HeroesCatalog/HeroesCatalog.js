import { useEffect, useState } from 'react';
import * as superheroService from '../../../services/superheroService';

import { titles, alertMessages } from '../../../common/messagesConstantsBG'
import HeroCard from '../../Card/HeroCard';
// import '../Catalog.css';
const HeroesCatalog = () => {
    const [superheroes, setSuperheroes] = useState([]);

    useEffect(() => {
        superheroService.getAll()
            .then(data => {
                setSuperheroes(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const noHeroesElement = (
        <div>
            <p className="no-articles">{alertMessages.NoSuperheroes}</p>
        </div>
    );

    return (
        <section>
            <h1 align="center">{titles.AllSuperheroes}</h1>
            <div className="card-rows">
                {superheroes.length > 0
                    ? superheroes.map(x => <HeroCard key={x._id} hero={x} />)
                    : noHeroesElement
                }
            </div>
        </section>
    );
}

export default HeroesCatalog;